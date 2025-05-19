import React, {FC, memo} from "react";
import classnames from "classnames";
import Highlighter, {HighlighterProps} from "react-highlight-words";

import {useComponentProps} from "../../theme";

import styles from "./highlight.module.scss";

export enum HighlightColor {
    Primary = "primary",
    Secondary = "secondary",
    Accent = "accent",
}

export interface HighlightProps extends HighlighterProps {
    color?: HighlightColor;
}

const Highlight: FC<HighlightProps> = (props) => {
    const {
        color,
        activeClassName,
        highlightClassName,
        className,
        ...other
    } = {...useComponentProps('highlight'), ...props};

    return (
        <Highlighter
            highlightClassName={classnames(
                styles["highlight"],
                {
                    [styles[`highlight--${color}-color`]]: color,
                },
                highlightClassName
            )}
            activeClassName={classnames(styles["highlight--active"], activeClassName)}
            {...other}
        />
    );
};

export default memo(Highlight);
