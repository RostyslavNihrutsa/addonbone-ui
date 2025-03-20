import React, {FC, memo, ReactNode, ReactElement} from "react";
import classnames from "classnames";
import {
    Description,
    Provider,
    Root,
    Title,
    ToastProps as ToastRootProps,
    ToastProviderProps,
    Viewport
} from '@radix-ui/react-toast';

import {IconButton, IconButtonProps} from "../IconButton";
import {cloneOrCreateElement} from "../../utils";
import {useDefaultProps} from "../../theme";

import styles from "./toast.module.scss";

export enum ToastSide {
    TopLeft = 'top-left',
    TopRight = 'top-right',
    BottomRight = 'bottom-right',
    BottomLeft = 'bottom-left',
}

export interface ToastProps extends Omit<ToastRootProps, 'title'>, Omit<ToastProviderProps, 'children'> {
    side?: ToastSide;
    title?: ReactNode;
    action?: ReactNode;
    description?: ReactNode;
    closeIcon?: ReactElement;
    closeProps?: IconButtonProps;
    titleClassName?: string,
    actionClassName?: string,
    viewportClassName?: string,
    descriptionClassName?: string,
    onClose?: () => void;
}

const Toast: FC<ToastProps> = (props) => {
    const defaultProps = useDefaultProps('toast');
    const mergedProps = {...defaultProps, ...props};
    const {
        label,
        duration,
        swipeDirection,
        swipeThreshold,

        side = ToastSide.BottomRight,
        title,
        action,
        description,

        closeIcon = '✖',
        closeProps,
        className,
        titleClassName,
        actionClassName,
        viewportClassName,
        descriptionClassName,
        children,
        onClose,
        ...other
    } = mergedProps;

    const {className: closeClassName, ...otherCloseProps} = closeProps || {};
    return (
        <Provider
            label={label}
            duration={duration}
            swipeDirection={swipeDirection}
            swipeThreshold={swipeThreshold}
        >
            {children}
            <Root
                className={classnames(styles["toast"],
                    {[styles[`toast--${side}`]]: side},
                    className)}
                {...other}
            >
                {title && (
                    <Title className={classnames(styles["toast__title"], titleClassName)}>
                        {title}
                    </Title>
                )}

                {description && (
                    <Description className={classnames(styles["toast__description"], descriptionClassName)}>
                        {description}
                    </Description>
                )}

                {cloneOrCreateElement(action, {className: classnames(styles["toast__action"], actionClassName)})}

                {onClose && (
                    <IconButton
                        aria-label="Close"
                        onClick={onClose}
                        className={classnames(styles["toast__close"], closeClassName)}
                        {...otherCloseProps}
                    >
                        {closeIcon}
                    </IconButton>
                )}
            </Root>

            <Viewport className={classnames(styles["toast__viewport"], viewportClassName)}/>
        </Provider>
    )
}

export default memo(Toast);
