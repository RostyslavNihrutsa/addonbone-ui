import React, {FC, memo} from "react";
import classnames from "classnames";

import {useDefaultProps} from "../../theme";
import {cloneOrCreateElement} from "../../utils";

import {Dialog, DialogProps} from "../Dialog"

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

const Drawer: FC<DrawerProps> = (props) => {
    const defaultProps = useDefaultProps('drawer');
    const mergedProps = {...defaultProps, ...props};
    const {
        side = DrawerSide.Left,
        fullscreen,
        children,
        className,
        overlayClassName,
        childrenClassName,
        ...other
    } = mergedProps;

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
