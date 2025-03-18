import React, {FC, memo} from "react";
import classnames from "classnames";
import {BaseButton, BaseButtonProps} from "../BaseButton";

import {useDefaultProps} from "../../theme";

import styles from "./button.module.scss";

export enum ButtonVariant {
    Contained = "contained",
    Outlined = "outlined",
    Text = "text"
}

export enum ButtonColor {
    Primary = "primary",
    Secondary = "secondary",
    Accent = "accent",
}

export enum ButtonSize {
    Small = "small",
    Medium = "medium",
    Large = "large"
}

export enum ButtonRadius {
    Small = "small",
    Medium = "medium",
    Large = "large",
    Full = "full"
}

export interface ButtonProps extends BaseButtonProps {
    variant?: ButtonVariant;
    color?: ButtonColor;
    size?: ButtonSize;
    radius?: ButtonRadius;
}

const Button: FC<ButtonProps> = (props) => {
    const defaultProps = useDefaultProps('button');
    const mergedProps = {...defaultProps, ...props};
    const {
        variant = ButtonVariant.Contained,
        color,
        size,
        radius,
        childrenClassName,
        className,
        children,
        ...other
    } = mergedProps;

    return (
        <BaseButton
            {...other}
            className={classnames(
                styles["button"],
                {
                    [styles[`button--${variant}`]]: variant,
                    [styles[`button--${radius}-radius`]]: radius,
                    [styles[`button--${color}-color`]]: color,
                    [styles[`button--${size}-size`]]: size,
                },
                className
            )}
            childrenClassName={classnames(styles['button__text'], childrenClassName)}
        >
            {children}
        </BaseButton>
    );
};

export default memo(Button);
