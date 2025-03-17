import React, {FC, memo,} from "react";
import classnames from "classnames";
import {AvatarFallbackProps, Fallback} from '@radix-ui/react-avatar';

import {useDefaultProps} from "../../theme";
import styles from "./avatar.module.scss"

export type {AvatarFallbackProps} from '@radix-ui/react-avatar';

const AvatarFallback: FC<AvatarFallbackProps> = (props) => {
    const defaultProps = useDefaultProps('avatarFallback');
    const mergedProps = {...defaultProps, ...props};
    const {
        className,
        children,
        ...other
    } = mergedProps;

    return (
        <Fallback className={classnames(styles['avatar-fallback'], className)} delayMs={600} {...other}>
            {children}
        </Fallback>
    );
};

export default memo(AvatarFallback);
