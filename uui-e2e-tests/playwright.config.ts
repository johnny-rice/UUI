import path from 'node:path';
import { defineConfig, devices, type TraceMode } from '@playwright/test';
import { SHARED_DEVICE_CFG } from './framework/constants';
import { readEnvFile } from './scripts/envFileUtils';
import { readUuiSpecificEnvVariables } from './scripts/envParamUtils';

const { isCi, isDocker, UUI_TEST_PARAM_PROJECT } = readUuiSpecificEnvVariables();
const { UUI_APP_BASE_URL, UUI_APP_BASE_URL_CI } = readEnvFile();

const testTimeout = isCi ? 10000 : 50000;
export const timeoutForFixture = isCi ? 20000 : 80000;
const expectTimeout = 10000;

// The "expect" timeout for slow tests. It should not exceed "testTimeout".
export const slowTestExpectTimeout = Math.min(expectTimeout * 3, testTimeout);
const maxFailures = isCi ? 10 : undefined;
const retries = isCi ? 1 : 0;
export const screenshotSizeLimitKb = 130;
/**
 * The fastest option (for both CI and Local) is to use default (undefined) amount of workers (which is 50% of CPU cores).
 */
const workers = isCi ? undefined : undefined;
const forbidOnly = isCi;
const trace = (isCi ? 'retry-with-trace' : 'retain-on-failure') as TraceMode;
const server = isCi ? {
    command: 'yarn start-server',
    url: UUI_APP_BASE_URL_CI,
} : {
    command: `yarn print-error "Server is not available ${UUI_APP_BASE_URL}"`,
    url: UUI_APP_BASE_URL,
};
//
const parentDir = '';
export const screenshotsDirAbsPath = path.resolve(process.cwd(), 'tests/__screenshots__');
const testMatch = `${parentDir}tests/*.e2e.ts`;
const outputDir = `${parentDir}tests/.report/results`;
const outputFolder = `${parentDir}tests/.report/report`;
export const outputJsonFile = `${parentDir}tests/.report/report.json`;
const snapshotPathTemplate = '{testFileDir}/__screenshots__/{platform}/{projectName}/{arg}{ext}';
export const stylePath = `${parentDir}framework/fixtures/screenshot.css`;

export default defineConfig({
    // = 1 hour (it should be sufficient to run all our tests)
    globalTimeout: 3_600_000,
    timeout: testTimeout,
    maxFailures,
    testMatch,
    fullyParallel: true,
    forbidOnly,
    retries,
    workers,
    outputDir,
    snapshotPathTemplate,
    reporter: [
        ['html', { outputFolder, open: (isDocker || isCi) ? 'never' : 'on-failure' }],
        ['json', { outputFile: outputJsonFile }],
    ],
    use: {
        bypassCSP: true,
        baseURL: server.url,
        trace,
        ...SHARED_DEVICE_CFG.DEFAULT,
    },
    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
            },
        },
        {
            name: 'webkit',
            use: {
                ...devices['Desktop Safari'],
            },
        },
    ].filter(({ name }) => {
        if (UUI_TEST_PARAM_PROJECT) {
            return name === UUI_TEST_PARAM_PROJECT;
        }
        return true;
    }),
    webServer: {
        ...server,
        reuseExistingServer: true,
    },
    expect: {
        timeout: expectTimeout,
        toHaveScreenshot: {
            animations: 'disabled',
            caret: 'hide',
            /**
             * Threshold is an acceptable perceived color difference between two pixels
             * The default value 0.2 is not strict enough, so we are changing it to lower value.
             */
            threshold: 0.03,
        },
    },
});
