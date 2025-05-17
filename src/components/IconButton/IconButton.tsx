import React, {FC, memo} from "react";
import classnames from "classnames";

import {Tooltip, TooltipProps} from "../Tooltip";
import {BaseButton, BaseButtonProps} from "../BaseButton";

import {useComponentProps} from "../../theme";

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
    tooltip?: Omit<TooltipProps, 'children'>;
}

const IconButton: FC<IconButtonProps> = (props) => {
    const {
        size,
        radius,
        variant,
        tooltip,
        className,
        children,
        ...other
    } = {...useComponentProps('iconButton'), ...props};

    const iconButton = (
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
    )
    if (tooltip) {
        return (
            <Tooltip {...tooltip}>
                {iconButton}
            </Tooltip>
        )
    }

    return iconButton;
};

export default memo(IconButton);
