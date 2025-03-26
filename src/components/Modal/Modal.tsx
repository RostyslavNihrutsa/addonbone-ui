import React, {FC, memo, ReactElement, useCallback} from "react";
import classnames from "classnames";

import {useDefaultProps} from "../../theme";
import {cloneOrCreateElement} from "../../utils";

import {Dialog, DialogProps} from "../Dialog"
import {IconButton, IconButtonProps} from "../IconButton";

import styles from "./modal.module.scss"

export enum ModalRadius {
    None = "none",
    Small = "small",
    Medium = "medium",
    Large = "large",
}

export interface ModalProps extends DialogProps {
    radius?: ModalRadius;
    closeButton?: ReactElement;
    closeButtonProps?: IconButtonProps;
    showCloseButton?: boolean;
    onClose?: () => void;
}

const Modal: FC<ModalProps> = (props) => {
    const defaultProps = useDefaultProps('modal');
    const mergedProps = {...defaultProps, ...props};
    const {
        radius,
        fullscreen = true,
        closeButton = '✖',
        showCloseButton = true,
        closeButtonProps = {},
        onClose,
        onOpenChange,
        children,
        className,
        overlayClassName,
        childrenClassName,
        ...other
    } = mergedProps;

    const handleClose = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        onClose && onClose();
        onOpenChange && onOpenChange(false);
        closeButtonProps.onClick && closeButtonProps.onClick(event);
    }, [onClose, closeButtonProps])

    return (
        <Dialog
            {...other}
            onOpenChange={onOpenChange}
            overlayClassName={classnames(styles["modal-overlay"], overlayClassName)}
            className={classnames(styles["modal-content"], {
                [styles["modal-content--fullscreen"]]: fullscreen,
                [styles[`modal-content--${radius}-radius`]]: radius,
            }, className)}
        >
            {cloneOrCreateElement(children, {className: classnames(styles["modal-children"], childrenClassName)}, 'div')}

            {showCloseButton && (
                <IconButton
                    aria-label="Close"
                    {...closeButtonProps}
                    onClick={handleClose}
                    className={classnames(styles["modal-close"], closeButtonProps.className)}
                >
                    {closeButton}
                </IconButton>
            )}
        </Dialog>
    )
};

export default memo(Modal);
