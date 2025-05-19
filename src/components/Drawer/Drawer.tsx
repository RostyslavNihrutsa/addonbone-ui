import React, {FC, memo} from "react";
import classnames from "classnames";

import {useComponentProps} from "../../theme";
import {cloneOrCreateElement} from "../../utils";

import {Dialog, DialogProps, dialogPropsKeys} from "../Dialog"

import styles from "./drawer.module.scss"

export enum DrawerSide {
    Left = "left",
    Right = "right",
    Top = "top",
    Bottom = "bottom",
}

export interface DrawerProps extends DialogProps {
    side?: DrawerSide;
}

export const drawerPropsKeys = new Set<keyof DrawerProps>(['side', ...dialogPropsKeys]);

const Drawer: FC<DrawerProps> = (props) => {
    const {
        side = DrawerSide.Left,
        fullscreen,
        children,
        className,
        overlayClassName,
        childrenClassName,
        ...other
    } = {...useComponentProps('drawer'), ...props};

    return (
        <Dialog
            {...other}
            overlayClassName={classnames(styles["drawer-overlay"], overlayClassName)}
            className={classnames(styles["drawer-content"], {
                [styles["drawer-content--fullscreen"]]: fullscreen,
                [styles[`drawer-content--${side}-side`]]: side,
            }, className)}
        >
            {cloneOrCreateElement(children, {className: classnames(styles["drawer-children"], childrenClassName)}, 'div')}
        </Dialog>
    )
};

export default memo(Drawer);
