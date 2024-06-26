import { useCallback } from 'react';
import type { FileUploadResponse } from '@epam/uui-core';
import {
    PlateEditor,
    getPlugin,
    KEY_INSERT_DATA,
    deleteBackward,
    insertEmptyElement,
    insertNodes,
} from '@udecode/plate-common';
import { Selection } from 'slate';
import { ATTACHMENT_TYPE } from '../attachmentPlugin/constants';
import { IMAGE_TYPE } from '../imagePlugin/constants';
import { IFRAME_TYPE } from '../iframePlugin/constants';
import { TImageElement } from '../imagePlugin/types';
import { TIframeElement } from '../iframePlugin/types';
import { TAttachmentElement } from '../attachmentPlugin/types';

export type UploadType = keyof typeof UPLOAD_BLOCKS;

export interface UploadFileOptions {
    uploadFile?: UploadFile;
}

type UploadFile = (
    file: File,
    onProgress?: (progress: number) => any
) => Promise<FileUploadResponse>;

const UPLOAD_BLOCKS = {
    attachment: (file: FileUploadResponse): TAttachmentElement => ({
        type: ATTACHMENT_TYPE,
        data: {
            ...file,
            fileName: file.name,
        },
        children: [{ text: '' }],
    }),
    image: (file: FileUploadResponse): TImageElement => ({
        type: IMAGE_TYPE,
        url: file.path!,
        data: file,
        width: 'fit-content' as unknown as number, // intial image size before resize
        children: [{ text: '' }],
    }),
    iframe: (file: FileUploadResponse): TIframeElement => ({
        type: IFRAME_TYPE,
        url: file.path!,
        data: file,
        children: [{ text: '' }],
    }),
};

const upload = async (
    files: File[],
    invokeUpload: UploadFile,
): Promise<FileUploadResponse[]> => {
    const filesData: Array<FileUploadResponse> = [];

    try {
        for (const file of files) {
            const response = await invokeUpload(file);
            filesData.push(response);
        }
    } catch (e) {
        // TODO: add error handling
        throw new Error(e);
    }

    return filesData;
};

const isValidFileType = (fileType?: string) => {
    return fileType && Object.keys(UPLOAD_BLOCKS).includes(fileType);
};

const buildFragments = (
    files: FileUploadResponse[],
    overriddenAction?: UploadType,
) => {
    return files.map((file: FileUploadResponse) => {
        const fileType = file.type;
        const uploadType = (
            isValidFileType(fileType) ? fileType : ATTACHMENT_TYPE
        ) as UploadType;

        return UPLOAD_BLOCKS[overriddenAction || uploadType](file);
    });
};

export const createFileUploader = (options?: UploadFileOptions) =>
    async (
        editor: PlateEditor,
        files: File[],
        overriddenAction?: UploadType,
    ) => {
        const uploadFile = options?.uploadFile;
        if (!uploadFile) return;

        // show loader
        insertEmptyElement(editor, 'loader');
        const currentSelection = { ...editor.selection } as Selection;
        const prevSelection = { ...editor.prevSelection } as Selection;

        // upload files
        const responses = await upload(files, uploadFile);

        // build fragments
        const fileFragments = buildFragments(responses, overriddenAction);

        // remove loader
        editor.selection = currentSelection;
        editor.prevSelection = prevSelection;
        deleteBackward(editor, { unit: 'block' });

        // insert blocks
        insertNodes(editor, fileFragments);
    };

export const useFilesUploader = (editor: PlateEditor) => {
    return useCallback(
        (files: File[], overriddenAction?: UploadType): Promise<void> => {
            const callback = getPlugin(editor, KEY_INSERT_DATA)?.options?.uploadFiles;
            if (callback) {
                return callback(
                    editor,
                    files,
                    overriddenAction,
                );
            }

            console.error('Upload function was not provided for upload plugin.');
            return Promise.reject();
        },
        [editor],
    );
};
