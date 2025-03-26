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
    Title
} from '@radix-ui/react-dialog';
import {VisuallyHidden} from "radix-ui";

import {useDefaultProps} from "../../theme";
import {cloneOrCreateElement} from "../../utils";

import styles from "./drawer.module.scss"

export enum DrawerSide {
    Left = "left",
    Right = "right",
    Top = "top",
    Bottom = "bottom",
}

export interface DrawerProps extends DialogRootProps, DialogPortalProps, DialogContentProps {
    side?: DrawerSide;
    description?: string;
    fullscreen?: boolean;
    className?: string;
    overlayClassName?: string;
    childrenClassName?: string;
}

const Drawer: FC<DrawerProps> = (props) => {
    const defaultProps = useDefaultProps('drawer');
    const mergedProps = {...defaultProps, ...props};
    const {
        open,
        defaultOpen,
        onOpenChange,
        modal,
        children,
        container,
        side = DrawerSide.Left,
        title,
        description,
        fullscreen,
        className,
        overlayClassName,
        childrenClassName,
        ...other
    } = mergedProps;

    return (
        <Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange} modal={modal}>
            <Portal container={container}>
                <Overlay className={classnames(styles["drawer-overlay"], overlayClassName)}/>
                <Content className={classnames(styles["drawer-content"], {
                    [styles["drawer-content--fullscreen"]]: fullscreen,
                    [styles[`drawer-content--${side}-side`]]: side,
                }, className)} {...other}>
                    <VisuallyHidden.Root>
                        <Title>{title}</Title>
                        <Description>{description}</Description>
                    </VisuallyHidden.Root>
                    {cloneOrCreateElement(children, {className: classnames(styles["drawer-children"], childrenClassName)}, 'div')}
                </Content>
            </Portal>
        </Root>
    );
};

export default memo(Drawer);
