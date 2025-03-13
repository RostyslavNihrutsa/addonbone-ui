import React, {ComponentProps, FC, memo, ReactNode,} from "react";
import classnames from "classnames";

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

export interface ButtonProps extends ComponentProps<'button'> {
    variant?: ButtonVariant;
    color?: ButtonColor;
    size?: ButtonSize;
    radius?: ButtonRadius;
    before?: ReactNode;
    after?: ReactNode;
    textClassName?: string;
    disabled?: boolean;
}

const Button: FC<ButtonProps> = (props) => {
    const {
        variant = ButtonVariant.Contained,
        color,
        size,
        radius,
        before,
        after,
        textClassName,
        className,
        disabled,
        children,
        ...other
    } = props;

    return (
        <button
            {...other}
            className={classnames(
                styles["button"],
                {
                    [styles[`button--${variant}`]]: variant,
                    [styles[`button--${radius}-radius`]]: radius,
                    [styles[`button--${color}-color`]]: color,
                    [styles[`button--${size}-size`]]: size,
                    [styles[`button--disabled`]]: disabled,
                },
                className
            )}
            disabled
        >
            {before}
            <span className={classnames(styles['button__text'], textClassName)}>
                {children}
            </span>
            {after}
        </button>
    );
};

export default memo(Button);
