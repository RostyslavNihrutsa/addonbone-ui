import React, {memo, forwardRef, ForwardRefRenderFunction} from "react";
import classnames from "classnames";

import {useComponentProps} from "../../providers";
import {cloneOrCreateElement} from "../../utils";

import {Dialog, DialogProps, dialogPropsKeys} from "../Dialog";

import {DrawerSide} from "./types";

import styles from "./drawer.module.scss";

export interface DrawerProps extends DialogProps {
    side?: DrawerSide;
}

export const drawerPropsKeys = new Set<keyof DrawerProps>(["side", ...dialogPropsKeys]);

const Drawer: ForwardRefRenderFunction<HTMLDivElement, DrawerProps> = (props, ref) => {
    const {
        side = DrawerSide.Left,
        fullscreen,
        children,
        className,
        overlayClassName,
        childrenClassName,
        ...other
    } = {...useComponentProps("drawer"), ...props};

    return (
        <Dialog
            ref={ref}
            {...other}
            overlayClassName={classnames(styles["drawer-overlay"], overlayClassName)}
            className={classnames(
                styles["drawer-content"],
                {
                    [styles["drawer-content--fullscreen"]]: fullscreen,
                    [styles[`drawer-content--${side}-side`]]: side,
                },
                className
            )}
        >
            {cloneOrCreateElement(
                children,
                {className: classnames(styles["drawer-children"], childrenClassName)},
                "div"
            )}
        </Dialog>
    );
};

export default memo(forwardRef(Drawer));
