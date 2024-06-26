import * as React from 'react';
import cx from 'classnames';
import css from './ColorPicker.module.scss';
import { IEditable } from '@epam/uui-core';
import { Button, Tooltip } from '@epam/uui';

interface Color {
    value: string;
    hex?: string;
}

interface ColorPickerProps extends IEditable<string> {
    colors: Color[];
}

export function ColorPicker(props: ColorPickerProps) {
    const { colors, onValueChange, value } = props;

    const renderColor = (color: Color) => {
        const isSelectedColor = value === color.value;
        const isUnknownColor = typeof color.hex === 'undefined' || color.hex === '';
        const renderUnknownColor = () => {
            return (
                <Button
                    fill={ isSelectedColor ? 'solid' : 'outline' }
                    size="18"
                    cx={ css.colorItemUnknown }
                    caption={ color.value }
                    onClick={ () => onValueChange(color.value) }
                />
            );
        };
        const renderKnownColor = () => {
            const style: React.CSSProperties = {
                backgroundColor: color.hex,
            };
            if (isSelectedColor) {
                style.boxShadow = '0 0 0 1px var(--uui-info-50)';
            } else {
                style.borderColor = (color.value === 'white' || color.hex === 'var(--uui-neutral-0)') ? 'var(--uui-neutral-20)' : color.hex;
            }
            return (
                <div
                    className={ cx(css.colorItem, css.colorItemSelected, `uui-color-${color.value}`) }
                    onClick={ () => onValueChange(color.value) }
                    style={ style }
                />
            );
        };

        return (
            <Tooltip
                key={ color.value }
                content={ color.value }
            >
                {
                    isUnknownColor ? renderUnknownColor() : renderKnownColor()
                }
            </Tooltip>
        );
    };

    return (
        <div className={ css.container }>
            {colors.map(renderColor)}
        </div>
    );
}
