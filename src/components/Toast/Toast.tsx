import React, {FC, memo, ReactElement, ReactNode} from "react";
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
import {useComponentProps} from "../../providers";

import styles from "./toast.module.scss";

export enum ToastSide {
    TopCenter = 'top-center',
    TopLeft = 'top-left',
    TopRight = 'top-right',
    BottomRight = 'bottom-right',
    BottomLeft = 'bottom-left',
    BottomCenter = 'bottom-center',
}

export enum ToastRadius {
    None = "none",
    Small = "small",
    Medium = "medium",
    Large = "large",
}

export enum ToastColor {
    Error = "error",
    Success = "success",
}


const toastSideBySwipeDirectionMap = {
    [ToastSide.TopLeft]: 'left',
    [ToastSide.TopCenter]: 'up',
    [ToastSide.TopRight]: 'right',
    [ToastSide.BottomRight]: 'right',
    [ToastSide.BottomCenter]: 'down',
    [ToastSide.BottomLeft]: 'left',
} as Record<ToastSide, ToastProviderProps['swipeDirection']>

export interface ToastProps extends Omit<ToastRootProps, 'title'>, Omit<ToastProviderProps, 'children'> {
    side?: ToastSide;
    color?: ToastColor;
    radius?: ToastRadius;
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
    fullWidth?: boolean;
    sticky?: boolean;
}

const Toast: FC<ToastProps> = (props) => {
    const defaultProps = useComponentProps('toast');
    const mergedProps = {...defaultProps, ...props};
    const {
        side = ToastSide.BottomRight,
        color,
        radius,
        title,
        action,
        description,
        fullWidth,
        sticky,
        closeIcon = '✖',
        closeProps,

        label,
        duration,
        swipeDirection = toastSideBySwipeDirectionMap[side],
        swipeThreshold = ['up', 'down'].includes(swipeDirection || '') ? 15 : 50,

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
                    {
                        [styles[`toast--${side}`]]: side,
                        [styles[`toast--${color}-color`]]: color,
                        [styles[`toast--${radius}-radius`]]: radius,
                        [styles['toast--sticky']]: sticky,
                        [styles['toast--full-width']]: fullWidth,
                    },
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
