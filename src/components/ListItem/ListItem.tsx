import React, {ComponentProps, forwardRef, memo, ReactNode} from "react";
import classnames from "classnames";

import {cloneOrCreateElement} from "../../utils";

import styles from "./list-item.module.scss";

export type ListItemType = HTMLLIElement;

export interface ListItemProps extends ComponentProps<'li'> {
    left?: ReactNode;
    right?: ReactNode;
    primary?: ReactNode;
    secondary?: ReactNode;
    primaryClassName?: string;
    secondaryClassName?: string;
    centerClassName?: string;
    leftClassName?: string;
    rightClassName?: string;
}

const ListItem = forwardRef<ListItemType, ListItemProps>((props, ref) => {
    const {
        left,
        right,
        primary,
        secondary,
        children,
        className,
        leftClassName,
        rightClassName,
        centerClassName,
        primaryClassName,
        secondaryClassName,
        role = "list-item",
        ...other
    } = props;

    return (
        <li
            {...other}
            ref={ref}
            role={role}
            className={classnames(styles["list-item"], className)}
        >
            {cloneOrCreateElement(left, {className: classnames(styles["list-item__left"], leftClassName)}, 'div')}

            {(primary || secondary) && (
                <div className={classnames(styles["list-item__center"], centerClassName)}>
                    {cloneOrCreateElement(primary, {className: classnames(styles["list-item__primary"], primaryClassName)}, 'div')}
                    {cloneOrCreateElement(secondary, {className: classnames(styles["list-item__secondary"], secondaryClassName)}, 'div')}
                </div>
            )}

            {cloneOrCreateElement(right, {className: classnames(styles["list-item__right"], rightClassName)}, 'div')}

            {children}
        </li>
    )
})

export default memo(ListItem);
