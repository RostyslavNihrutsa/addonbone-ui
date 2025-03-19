import React, {FC, memo, ReactElement} from "react";
import classnames from "classnames";
import {CheckboxProps as CheckboxRootProps, Indicator, Root} from '@radix-ui/react-checkbox';

import {useDefaultProps} from "../../theme";

import styles from "./checkbox.module.scss"

const defaultCheckedIcon = (
    <svg width="22" height="22" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill="currentColor" fillRule="evenodd" clipRule="evenodd"
              d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"/>
    </svg>
)

const defaultIndeterminateIcon = (
    <svg width="14" height="14" viewBox="0 0 9 9" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
        <path fill="currentColor" fillRule="evenodd" clipRule="evenodd"
              d="M0.75 4.5C0.75 4.08579 1.08579 3.75 1.5 3.75H7.5C7.91421 3.75 8.25 4.08579 8.25 4.5C8.25 4.91421 7.91421 5.25 7.5 5.25H1.5C1.08579 5.25 0.75 4.91421 0.75 4.5Z"/>
    </svg>
)

export type {CheckedState} from '@radix-ui/react-checkbox';

export enum CheckboxVariant {
    Classic = "classic",
    Soft = "soft",
}

export enum CheckboxSize {
    Small = "small",
    Medium = "medium",
    Large = "large",
}

export enum CheckboxRadius {
    Small = "small",
    Large = "large",
}

export interface CheckboxProps extends CheckboxRootProps {
    indicatorClassName?: string
    size?: CheckboxSize;
    radius?: CheckboxRadius;
    variant?: CheckboxVariant;
    checkedIcon?: ReactElement;
    indeterminateIcon?: ReactElement;
}

const Checkbox: FC<CheckboxProps> = (props) => {
    const defaultProps = useDefaultProps('checkbox');
    const mergedProps = {...defaultProps, ...props};
    const {
        checked,
        size,
        radius,
        variant,
        className,
        indicatorClassName,
        checkedIcon = defaultCheckedIcon,
        indeterminateIcon = defaultIndeterminateIcon,
        ...other
    } = mergedProps;

    return (
        <Root
            {...other}
            checked={checked}
            className={classnames(
                styles["checkbox"],
                {
                    [styles[`checkbox--${variant}`]]: variant,
                    [styles[`checkbox--${radius}-radius`]]: radius,
                    [styles[`checkbox--${size}-size`]]: size,
                },
                className)}
        >
            <Indicator className={classnames(styles["checkbox__indicator"], indicatorClassName)}>
                {checked === 'indeterminate' && indeterminateIcon}
                {checked === true && checkedIcon}
            </Indicator>
        </Root>

    );
};

export default memo(Checkbox);
