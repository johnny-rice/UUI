import * as React from 'react';
import cx from 'classnames';
import { IHasChildren, IHasCX, Icon, IHasRawProps } from '@epam/uui-core';
import { IconContainer } from '@epam/uui-components';
import { IconButton, LinkButton, LinkButtonProps } from '../buttons';
import { ReactComponent as SuccessIcon } from '@epam/assets/icons/notification-check-fill.svg';
import { ReactComponent as WarningIcon } from '@epam/assets/icons/notification-warning-fill.svg';
import { ReactComponent as ErrorIcon } from '@epam/assets/icons/notification-error-fill.svg';
import { ReactComponent as HintIcon } from '@epam/assets/icons/notification-info-fill.svg';
import { ReactComponent as CrossIcon } from '@epam/assets/icons/navigation-close-outline.svg';
import { settings } from '../../settings';

import css from './Alert.module.scss';

interface AlertNotificationAction {
    /*
    * Defines notification action name.
    */
    name: string;
    /*
    * Called when action is clicked
    */
    action: () => void;
}

interface AlertMods {
    /** Alert color */
    color: 'info' | 'success' | 'warning' | 'error';
}

export interface AlertCoreProps extends IHasChildren, IHasCX, IHasRawProps<React.HTMLAttributes<HTMLDivElement>> {
    /** List of actions to display in the alert. Each action has name and 'action' callback */
    actions?: AlertNotificationAction[];
    /** When specified, a close icon is rendered. onClose callback will be called on clicking the close icon */
    onClose?(): void;
    /** An optional icon to show on the left of the alert */
    icon?: Icon;
    /**
     * Component size. If omitted, 48 size will be used.
     * @default '48'
     */
    size?: '36' | '48';
}

/** Represents the properties of the Alert component. */
export interface AlertProps extends AlertCoreProps, AlertMods {}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
    <div
        role="alert"
        ref={ ref }
        className={
            cx(
                'uui-alert',
                css.root,
                props.color && `uui-color-${props.color}`,
                props.cx,
                `uui-size-${props.size || settings.sizes.defaults.alert}`,
            )
        }
        { ...props.rawProps }
    >
        <div className={ css.mainPath }>
            <div className={ css.contentWrapper }>
                {props.icon && (
                    <div className={ css.iconWrapper }>
                        <IconContainer icon={ props.icon } cx={ css.icon } />
                    </div>
                )}
                <div className={ css.content }>
                    {props.children}
                    {props.actions && (
                        <div className={ css.actionWrapper }>
                            {props.actions.map((action) => (
                                <LinkButton caption={ action.name } onClick={ action.action } key={ action.name } cx={ css.actionLink } size={ settings.sizes.alert.action[props.size || settings.sizes.defaults.alert] as LinkButtonProps['size'] } />
                            ))}
                        </div>
                    )}
                </div>
            </div>
            {props.onClose && <IconButton icon={ CrossIcon } color="neutral" onClick={ props.onClose } cx={ css.closeIcon } />}
        </div>
    </div>
));

export const WarningAlert = React.forwardRef<HTMLDivElement, Omit<AlertProps, 'color'>>((props, ref) => <Alert icon={ WarningIcon } color="warning" ref={ ref } { ...props } />);

export const SuccessAlert = React.forwardRef<HTMLDivElement, Omit<AlertProps, 'color'>>((props, ref) => <Alert icon={ SuccessIcon } color="success" ref={ ref } { ...props } />);

export const HintAlert = React.forwardRef<HTMLDivElement, Omit<AlertProps, 'color'>>((props, ref) => <Alert icon={ HintIcon } color="info" ref={ ref } { ...props } />);

export const ErrorAlert = React.forwardRef<HTMLDivElement, Omit<AlertProps, 'color'>>((props, ref) => <Alert icon={ ErrorIcon } color="error" ref={ ref } { ...props } />);
