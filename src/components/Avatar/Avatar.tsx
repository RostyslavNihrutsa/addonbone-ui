import React, {FC, memo,} from "react";
import classnames from "classnames";
import {AvatarImageProps, Image, Root,} from '@radix-ui/react-avatar';

import {useDefaultProps} from "../../theme";

import styles from "./avatar.module.scss"

export enum AvatarSize {
    Small = "small",
    Medium = "medium",
    Large = "large"
}

export enum AvatarRadius {
    Small = "small",
    Medium = "medium",
    Large = "large",
}

export interface AvatarProps extends AvatarImageProps {
    imageClassname?: string;
    size?: AvatarSize;
    radius?: AvatarRadius;
    cursorPointer?:boolean;
}

const Avatar: FC<AvatarProps> = (props) => {
    const defaultProps = useDefaultProps('avatar');
    const mergedProps = {...defaultProps, ...props};
    const {
        size,
        radius,
        cursorPointer,
        imageClassname,
        className,
        children,
        ...other
    } = mergedProps;

    return (
        <Root className={classnames(styles['avatar-root'],
            {
                [styles[`avatar-root--${size}-size`]]: size,
                [styles[`avatar-root--${radius}-radius`]]: radius,
                [styles[`avatar-root--cursor-pointer`]]: cursorPointer,
            },
            className)}
        >
            <Image
                className={classnames(styles['avatar-image'], imageClassname)}
                {...other}
            />
            {children}
        </Root>
    );
};

export default memo(Avatar);
