import React, {FC, memo} from "react";
import classnames from "classnames";
import {BaseButton, BaseButtonProps} from "../BaseButton";

import {useDefaultProps} from "../../theme";

import styles from "./icon-button.module.scss";

export enum IconButtonVariant {
    Contained = "contained",
    Outlined = "outlined",
    Ghost = "ghost",
}

export enum IconButtonSize {
    Small = "small",
    Medium = "medium",
    Large = "large"
}

export enum IconButtonRadius {
    Small = "small",
    Medium = "medium",
    Large = "large",
}

export interface IconButtonProps extends BaseButtonProps {
    size?: IconButtonSize;
    radius?: IconButtonRadius;
    variant?: IconButtonVariant;
    textClassName?: string;
}

const IconButton: FC<IconButtonProps> = (props) => {
    const defaultProps = useDefaultProps('iconButton');
    const mergedProps = {...defaultProps, ...props};
    const {
        size,
        radius,
        variant,
        className,
        textClassName,
        children,
        ...other
    } = mergedProps;

    return (
        <BaseButton
            {...other}
            className={classnames(
                styles["icon-button"],
                {
                    [styles[`icon-button--${variant}`]]: variant,
                    [styles[`icon-button--${size}-size`]]: size,
                    [styles[`icon-button--${radius}-radius`]]: radius,
                },
                className
            )}
        >
            {children}
        </BaseButton>
    );
};

export default memo(IconButton);
