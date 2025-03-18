import React, {cloneElement, isValidElement, JSX, ReactNode} from "react";
import classnames from "classnames";

export const renderElement = (element: ReactNode, className?: string, wrapperTag: keyof JSX.IntrinsicElements = 'span') => {
    if (isValidElement<{ className?: string }>(element)) {
        return cloneElement(element, {
            className: classnames(element.props.className, className)
        });
    }

    if (element) {
        const Wrapper = wrapperTag;
        return <Wrapper className={className}>{element}</Wrapper>;
    }

    return null;
};