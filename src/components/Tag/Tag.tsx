import React, {ComponentProps, FC, memo} from "react";
import classnames from "classnames";
import {useComponentProps} from "../../providers";

import styles from "./tag.module.scss";

export enum TagVariant {
    Contained = "contained",
    Outlined = "outlined",
    Soft = "soft",
}

export enum TagColor {
    Primary = "primary",
    Secondary = "secondary",
    Accent = "accent",
}

export enum TagSize {
    Small = "small",
    Medium = "medium",
    Large = "large",
}

export enum TagRadius {
    Small = "small",
    Medium = "medium",
    Large = "large",
}

export interface TagProps extends ComponentProps<"span"> {
    size?: TagSize;
    color?: TagColor;
    radius?: TagRadius;
    variant?: TagVariant;
    clickable?: boolean;
}

const Tag: FC<TagProps> = props => {
    const {
        size,
        color,
        radius,
        variant = TagVariant.Contained,
        clickable,
        children,
        className,
        ...other
    } = {...useComponentProps("tag"), ...props};

    return (
        <span
            {...other}
            className={classnames(
                styles["tag"],
                {
                    [styles[`tag--${variant}`]]: variant,
                    [styles[`tag--${radius}-radius`]]: radius,
                    [styles[`tag--${color}-color`]]: color,
                    [styles[`tag--${size}-size`]]: size,
                    [styles["tag--clickable"]]: clickable,
                },
                className
            )}
        >
            {children}
        </span>
    );
};

export default memo(Tag);
