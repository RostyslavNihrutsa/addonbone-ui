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

import styles from "./modal.module.scss"

export enum ModalRadius {
    None = "none",
    Small = "small",
    Medium = "medium",
    Large = "large",
}

export interface ModalProps extends DialogRootProps, DialogPortalProps, DialogContentProps {
    radius?: ModalRadius;
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

const Modal: FC<ModalProps> = (props) => {
    const defaultProps = useDefaultProps('modal');
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
                <Overlay className={classnames(styles["modal-overlay"], overlayClassName)}/>
                <Content className={classnames(styles["modal-content"], {
                    [styles["modal-content--fullscreen"]]: fullscreen,
                    [styles[`modal-content--${radius}-radius`]]: radius,
                }, className)} {...other}>
                    <VisuallyHidden.Root>
                        <Title>{title}</Title>
                        <Description>{description}</Description>
                    </VisuallyHidden.Root>

                    {cloneOrCreateElement(children, {className: classnames(styles["modal-children"], childrenClassName)}, 'div')}

                    {showCloseIcon && (
                        <IconButton
                            aria-label="Close"
                            onClick={handleClose}
                            className={classnames(styles["modal-close"], closeClassName)}
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

export default memo(Modal);
