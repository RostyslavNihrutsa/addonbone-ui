import React, {FC, memo, useEffect, useRef} from "react";
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
    speed?: number
    description?: string;
    fullscreen?: boolean;
    className?: string;
    overlayClassName?: string;
    childrenClassName?: string;
}

export const dialogPropsKeys = new Set<keyof DialogProps>([
    // Dialog keys
    'speed', 'description', 'fullscreen', 'className', 'overlayClassName', 'childrenClassName',

    // Extended Dialog keys
    'open', 'defaultOpen', 'onOpenChange', 'modal', 'container', 'title',
]);

const Dialog: FC<DialogProps> = (props) => {
    const defaultProps = useDefaultProps('dialog');
    const mergedProps = {...defaultProps, ...props};
    const {
        speed = 200,
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

    const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);
    const intervalId = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        intervalId.current && clearInterval(intervalId.current);
        timeoutId.current && clearTimeout(timeoutId.current);

        if (open) {
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.overflow = "hidden";
            document.body.style.boxSizing = "border-box";
            document.body.style.setProperty("padding-right", `${scrollbarWidth}px`, "important");
        } else {
            intervalId.current = setInterval(() => {
                const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
                if (scrollbarWidth) {
                    document.body.style.overflow = "";
                    document.body.style.paddingRight = "";
                    intervalId.current && clearInterval(intervalId.current);
                }
            }, 10)

            timeoutId.current = setTimeout(()=>{
                intervalId.current && clearInterval(intervalId.current);
            }, speed + 100)
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    return (
        <Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange} modal={modal}>
            <Portal container={container}>
                <Overlay
                    className={classnames(styles["dialog-overlay"], overlayClassName)}
                    style={{animationDuration: `${speed}ms`}}
                />
                <Content
                    className={classnames(styles["dialog-content"], className)}
                    style={{animationDuration: `${speed}ms`}}
                    {...other}
                >
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
