import React, {FC, memo, ReactElement, useCallback} from "react";
import classnames from "classnames";
import {
    Content,
    Description,
    DialogContentProps,
    DialogPortalProps,
    DialogProps as DialogRootProps,
    Overlay,
    Portal,
    Root,
    Title,
} from '@radix-ui/react-dialog';
import {VisuallyHidden} from "radix-ui";

import {useDefaultProps} from "../../theme";
import {cloneOrCreateElement} from "../../utils";

import {IconButton, IconButtonProps} from "../IconButton";

import styles from "./dialog.module.scss"

export enum DialogRadius {
    None = "none",
    Small = "small",
    Medium = "medium",
    Large = "large",
}

export interface DialogProps extends DialogRootProps, DialogPortalProps, DialogContentProps {
    radius?: DialogRadius;
    description?: string;
    fullscreen?: boolean;
    closeIcon?: ReactElement;
    closeIconProps?: IconButtonProps;
    showCloseIcon?: boolean;
    onClose?: () => void;
    className?: string;
    overlayClassName?: string;
    childrenClassName?: string;
}

const Dialog: FC<DialogProps> = (props) => {
    const defaultProps = useDefaultProps('dialog');
    const mergedProps = {...defaultProps, ...props};
    const {
        open,
        defaultOpen,
        onOpenChange,
        modal,
        children,
        container,
        radius,
        title,
        description,
        fullscreen = true,
        closeIcon = '✖',
        showCloseIcon = true,
        closeIconProps,
        onClose,
        className,
        overlayClassName,
        childrenClassName,
        ...other
    } = mergedProps;

    const {className: closeClassName, ...otherCloseProps} = closeIconProps || {};

    const handleClose = useCallback(()=>{
        onClose && onClose();
        onOpenChange && onOpenChange(false);
    }, [onClose, onOpenChange])

    return (
        <Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange} modal={modal}>
            <Portal container={container}>
                <Overlay className={classnames(styles["dialog-overlay"], overlayClassName)}/>
                <Content className={classnames(styles["dialog-content"], {
                    [styles["dialog-content--fullscreen"]]: fullscreen,
                    [styles[`dialog-content--${radius}-radius`]]: radius,
                }, className)} {...other}>
                    <VisuallyHidden.Root>
                        <Title>{title}</Title>
                        <Description>{description}</Description>
                    </VisuallyHidden.Root>

                    {cloneOrCreateElement(children, {className: classnames(styles["dialog-children"], childrenClassName)}, 'div')}

                    {showCloseIcon && (
                        <IconButton
                            aria-label="Close"
                            onClick={handleClose}
                            className={classnames(styles["dialog-close"], closeClassName)}
                            {...otherCloseProps}
                        >
                            {closeIcon}
                        </IconButton>
                    )}
                </Content>
            </Portal>
        </Root>
    );
};

export default memo(Dialog);
