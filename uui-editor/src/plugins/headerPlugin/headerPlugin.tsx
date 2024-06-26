import React from 'react';

import { Dropdown } from '@epam/uui-components';
import { useIsPluginActive } from '../../helpers';

import { ToolbarButton } from '../../implementation/ToolbarButton';
import { HeaderBar } from '../../implementation/HeaderBar';

import { ReactComponent as HeadlinePickerIcon } from '../../icons/heading.svg';
import {
    ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_H4, ELEMENT_H5, ELEMENT_H6, createHeadingPlugin,
} from '@udecode/plate-heading';
import { PlateEditor, PlatePlugin } from '@udecode/plate-common';
import { WithToolbarButton } from '../../implementation/Toolbars';
import { HEADER_PLUGIN_KEY, HEADER_TYPE_H1, HEADER_TYPE_H2, HEADER_TYPE_H3, HEADER_TYPE_H4, HEADER_TYPE_H5, HEADER_TYPE_H6 } from './constants';

export const headerPlugin = (): PlatePlugin => createHeadingPlugin<WithToolbarButton>({
    overrideByKey: {
        [ELEMENT_H1]: { type: HEADER_TYPE_H1 },
        [ELEMENT_H2]: { type: HEADER_TYPE_H2 },
        [ELEMENT_H3]: { type: HEADER_TYPE_H3 },
        [ELEMENT_H4]: { type: HEADER_TYPE_H4 },
        [ELEMENT_H5]: { type: HEADER_TYPE_H5 },
        [ELEMENT_H6]: { type: HEADER_TYPE_H6 },
    },
    options: {
        bottomBarButton: HeaderButton,
    },
});

interface IToolbarButton {
    editor: PlateEditor;
}

export function HeaderButton({ editor }: IToolbarButton): any {
    if (!useIsPluginActive(HEADER_PLUGIN_KEY)) return null;

    return (
        <Dropdown
            renderTarget={ (props) => (
                <ToolbarButton
                    icon={ HeadlinePickerIcon }
                    { ...props }
                />
            ) }
            renderBody={ (props) => <HeaderBar editor={ editor } { ...props } /> }
            placement="top-start"
            modifiers={ [{
                name: 'offset',
                options: { offset: [0, 3] },
            }] }
        />
    );
}
