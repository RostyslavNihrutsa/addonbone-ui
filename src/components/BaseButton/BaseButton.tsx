import React, {ComponentProps, FC, memo, ReactNode,} from "react";
import classnames from "classnames";

import styles from "./base-button.module.scss";

export interface BaseButtonProps extends ComponentProps<'button'> {
    before?: ReactNode;
    after?: ReactNode;
}

const BaseButton: FC<BaseButtonProps> = (props) => {
    const {
        before,
        after,
        className,
        children,
        ...other
    } = props;

    return (
        <button className={classnames(styles["base-button"], className)} {...other} >
            {before}
            {children}
            {after}
        </button>
    );
};

export default memo(BaseButton);
