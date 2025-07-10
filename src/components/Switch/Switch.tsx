import React, {FC, memo} from "react";
import classnames from "classnames";
import {Root, SwitchProps as SwitchRootProps, Thumb} from "@radix-ui/react-switch";

import {useComponentProps} from "../../providers";

import styles from "./switch.module.scss";

export interface SwitchProps extends SwitchRootProps {
    thumbClassName?: string;
}

const Switch: FC<SwitchProps> = props => {
    const {className, thumbClassName, children, ...other} = {...useComponentProps("switch"), ...props};

    return (
        <Root {...other} className={classnames(styles["switch"], className)}>
            <Thumb className={classnames(styles["switch__thumb"], thumbClassName)} />
            {children}
        </Root>
    );
};

export default memo(Switch);
