import React, {isValidElement, memo, ReactElement, useCallback, forwardRef, ForwardRefRenderFunction} from "react";
import classnames from "classnames";

import {useComponentProps} from "../../providers";
import {cloneOrCreateElement} from "../../utils";

import {Dialog, DialogProps, dialogPropsKeys} from "../Dialog";
import {IconButton, IconButtonProps} from "../IconButton";

import {ModalRadius} from "./types";

import styles from "./modal.module.scss";

export interface ModalProps extends DialogProps {
    radius?: ModalRadius;
    closeButton?: boolean | IconButtonProps | ReactElement;
    onClose?: () => void;
}

export const modalPropsKeys = new Set<keyof ModalProps>(["radius", "closeButton", "onClose", ...dialogPropsKeys]);

const Modal: ForwardRefRenderFunction<HTMLDivElement, ModalProps> = (props, ref) => {
    const {
        radius,
        fullscreen = true,
        closeButton = true,
        onClose,
        onOpenChange,
        children,
        className,
        overlayClassName,
        childrenClassName,
        ...other
    } = {...useComponentProps("modal"), ...props};

    const handleClose = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            onClose?.();
            onOpenChange?.(false);
            if (typeof closeButton === "object" && !isValidElement(closeButton)) {
                closeButton?.onClick?.(event);
            }
        },
        [onClose, onOpenChange, closeButton]
    );

    const renderCloseButton = useCallback(() => {
        if (!closeButton) return null;

        if (isValidElement(closeButton)) return closeButton;

        const closeButtonProps = typeof closeButton === "object" ? closeButton : {};

        return (
            <IconButton
                aria-label="Close"
                children="✖"
                {...closeButtonProps}
                onClick={handleClose}
                className={classnames(styles["modal-close"], closeButtonProps.className)}
            />
        );
    }, [closeButton, handleClose]);

    return (
        <Dialog
            ref={ref}
            {...other}
            onOpenChange={onOpenChange}
            overlayClassName={classnames(styles["modal-overlay"], overlayClassName)}
            className={classnames(
                styles["modal-content"],
                {
                    [styles["modal-content--fullscreen"]]: fullscreen,
                    [styles[`modal-content--${radius}-radius`]]: radius,
                },
                className
            )}
        >
            {cloneOrCreateElement(
                children,
                {className: classnames(styles["modal-children"], childrenClassName)},
                "div"
            )}
            {renderCloseButton()}
        </Dialog>
    );
};

export default memo(forwardRef(Modal));
