import React, {FC, memo} from "react";
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
