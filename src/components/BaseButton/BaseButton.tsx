import React, {ComponentProps, FC, memo, ReactNode, isValidElement, cloneElement} from "react";
import classnames from "classnames";

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

    const renderElement = (element: ReactNode, className?: string) => {
        if (isValidElement<{ className?: string }>(element)) {
            return cloneElement(element, {
                className: classnames(element.props.className, className)
            });
        }
        return element ? <span className={className}>{element}</span> : null;
    };

    return (
        <button className={classnames(styles["base-button"], className)} {...other} >
            {renderElement(before, classnames(styles["base-button__before"], beforeClassName))}
            {renderElement(children, classnames(styles["base-button__children"], childrenClassName))}
            {renderElement(after, classnames(styles["base-button__after"], afterClassName))}
        </button>
    );
};

export default memo(BaseButton);
