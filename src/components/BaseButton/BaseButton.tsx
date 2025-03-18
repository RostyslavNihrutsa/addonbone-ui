import React, {ComponentProps, FC, memo, ReactNode} from "react";
import classnames from "classnames";

import {cloneOrCreateElement} from "../../utils";

import styles from "./base-button.module.scss";

export interface BaseButtonProps extends ComponentProps<'button'> {
    after?: ReactNode;
    before?: ReactNode;
    afterClassName?: string
    beforeClassName?: string
    childrenClassName?: string
}

const BaseButton: FC<BaseButtonProps> = (props) => {
    const {
        after,
        before,
        children,
        className,
        afterClassName,
        beforeClassName,
        childrenClassName,
        ...other
    } = props;

    return (
        <button className={classnames(styles["base-button"], className)} {...other} >
            {cloneOrCreateElement(
                before,
                {
                    className: classnames(styles["base-button__before"], beforeClassName)
                }
            )}

            {cloneOrCreateElement(
                children,
                {
                    className: classnames(styles["base-button__children"], childrenClassName)
                }
            )}

            {cloneOrCreateElement(
                after,
                {
                    className: classnames(styles["base-button__after"], afterClassName)
                }
            )}
        </button>
    );
};

export default memo(BaseButton);
