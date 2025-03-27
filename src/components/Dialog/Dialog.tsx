import React, {FC, memo, useEffect} from "react";
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

import styles from "./dialog.module.scss"

export interface DialogProps extends DialogRootProps, DialogPortalProps, DialogContentProps {
    description?: string;
    fullscreen?: boolean;
    className?: string;
    overlayClassName?: string;
    childrenClassName?: string;
}

export const dialogPropsKeys = new Set<keyof DialogProps>([
    // Dialog keys
    'description', 'fullscreen', 'className', 'overlayClassName', 'childrenClassName',

    // Extended Dialog keys
    'open', 'defaultOpen', 'onOpenChange', 'modal', 'container', 'title',
]);

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
        title,
        description,
        className,
        overlayClassName,
        childrenClassName,
        ...other
    } = mergedProps;

    useEffect(() => {
        if (open) {
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.overflow = "hidden";
            document.body.style.boxSizing = "border-box";
            document.body.style.setProperty("padding-right", `${scrollbarWidth}px`, "important");
        } else {
            document.body.style.overflow = "";
            document.body.style.paddingRight = "";
        }

        return () => {
            document.body.style.overflow = "";
            document.body.style.paddingRight = "";
        };
    }, [open]);

    return (
        <Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange} modal={modal}>
            <Portal container={container}>
                <Overlay className={classnames(styles["dialog-overlay"], overlayClassName)}/>
                <Content className={classnames(styles["dialog-content"], className)} {...other}>
                    <VisuallyHidden.Root>
                        <Title>{title}</Title>
                        <Description>{description}</Description>
                    </VisuallyHidden.Root>

                    {cloneOrCreateElement(children, {className: classnames(styles["dialog-children"], childrenClassName)}, 'div')}
                </Content>
            </Portal>
        </Root>
    );
};

export default memo(Dialog);
