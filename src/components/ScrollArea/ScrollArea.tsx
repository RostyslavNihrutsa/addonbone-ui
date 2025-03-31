import React, {FC, memo} from "react";
import classnames from "classnames";
import {
    Corner,
    Root,
    ScrollAreaProps as ScrollAreaRootProps,
    Scrollbar,
    Thumb,
    Viewport
} from '@radix-ui/react-scroll-area';

import {useDefaultProps} from "../../theme";

import styles from "./scroll-area.module.scss"

export interface ScrollAreaProps extends ScrollAreaRootProps {
    xOffset?: number,
    yOffset?: number,
    thumbClassName?: string
    cornerClassName?: string
    viewportClassName?: string
    scrollbarClassName?: string
}

const ScrollArea: FC<ScrollAreaProps> = (props) => {
    const defaultProps = useDefaultProps('scrollArea');
    const mergedProps = {...defaultProps, ...props};
    const {
        xOffset,
        yOffset,
        children,
        className,
        thumbClassName,
        cornerClassName,
        viewportClassName,
        scrollbarClassName,
        ...other
    } = mergedProps;

    return (
        <Root className={classnames(styles["scroll-area"], className)} {...other}>
            <Viewport className={classnames(styles["scroll-area__viewport"], viewportClassName)}>
                {children}
            </Viewport>

            <Scrollbar
                orientation='vertical'
                style={{padding: `0 ${xOffset}px`}}
                className={classnames(styles["scroll-area__scrollbar"], scrollbarClassName)}
            >
                <Thumb className={classnames(styles["scroll-area__thumb"], thumbClassName)}/>
            </Scrollbar>

            <Scrollbar
                orientation='horizontal'
                style={{padding: `${yOffset}px 0`}}
                className={classnames(styles["scroll-area__scrollbar"], scrollbarClassName)}
            >
                <Thumb className={classnames(styles["scroll-area__thumb"], thumbClassName)}/>
            </Scrollbar>

            <Corner className={classnames(styles["scroll-area__corner"], cornerClassName)}/>
        </Root>

    );
};

export default memo(ScrollArea);
