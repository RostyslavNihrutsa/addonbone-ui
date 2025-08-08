import React, {memo, forwardRef, ForwardRefRenderFunction} from "react";
import classnames from "classnames";
import {BaseButton, BaseButtonProps} from "../BaseButton";

import {useComponentProps} from "../../providers";

import {ButtonColor, ButtonRadius, ButtonSize, ButtonVariant} from './types';

import styles from "./button.module.scss";


export interface ButtonProps extends BaseButtonProps {
    variant?: ButtonVariant;
    color?: ButtonColor;
    size?: ButtonSize;
    radius?: ButtonRadius;
}

const Button: ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (props, ref) => {
    const {
        variant = ButtonVariant.Contained,
        color,
        size,
        radius,
        childrenClassName,
        className,
        children,
        ...other
    } = {...useComponentProps("button"), ...props};

    return (
        <BaseButton
            ref={ref}
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
            childrenClassName={classnames(styles["button__text"], childrenClassName)}
        >
            {children}
        </BaseButton>
    );
};

export default memo(forwardRef(Button));
