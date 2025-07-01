import React, {FC, memo, useEffect, ComponentProps} from "react";
import classnames from "classnames";
import {useComponentProps, useIcons} from "../../providers";

import styles from "./icon.module.scss";

export interface IconProps extends ComponentProps<"svg"> {
    name: string;
    size?: number;
}

const Icon: FC<IconProps> = props => {
    const {
        name,
        className,
        size = 24,
        width = size,
        height = size,
        ...other
    } = {...useComponentProps("icon"), ...props};

    const {icons, registerIcon} = useIcons();

    useEffect(() => icons[name] && registerIcon(name), [name, icons]);

    if (!icons[name]) {
        console.warn(`Icon "${name}" not found.`);

        return (
            <span
                className={styles["icon--default"]}
                style={{fontSize: `${width}px`, lineHeight: `${width}px`, width, height}}
            >
                ⁇
            </span>
        );
    }

    return (
        <svg className={classnames(styles["icon"], className)} width={width} height={height} {...other}>
            <use href={`#${name}`} />
        </svg>
    );
};

export default memo(Icon);
