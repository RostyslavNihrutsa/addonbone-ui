import React, {FC, memo, useRef} from "react";

import classNames from "classnames";

import {useComponentProps} from "../../providers";

import useOdometer, {OdometerOptions} from "./hooks/useOdometer";

import styles from "./odometer.module.scss";

export interface OdometerProps extends OdometerOptions {
    value: number;
    className?: string;
}

const Odometer: FC<OdometerProps> = (props) => {
    const {
        value,
        auto = false,
        format = "d",
        duration = 250,
        className,
        ...other
    } = {...useComponentProps('odometer'), ...props};

    const targetRef = useRef(null);

    useOdometer(targetRef, value, {
        ...other,
        auto,
        format,
        duration,
    });

    return (
        <span
            ref={targetRef}
            dir="ltr"
            style={{'--speed': `${duration}ms`} as React.CSSProperties}
            className={classNames(styles["odometer"], className)}
        />
    );
};

export default memo(Odometer);
