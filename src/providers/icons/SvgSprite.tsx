import React, {FC} from "react";

import {IconsContract} from './context'

type SvgSpriteProps = Pick<IconsContract, 'icons' | 'registeredIconNames'>

const SvgSprite: FC<SvgSpriteProps> = ({registeredIconNames, icons}) => {

    return (
        <svg style={{display: "none"}} aria-hidden="true">
            <defs>
                {registeredIconNames.map((iconName) => {
                    const Icon = icons[iconName];

                    return Icon
                        ? (<symbol id={iconName} key={iconName} viewBox="0 0 24 24">
                                <Icon/>
                            </symbol>
                        ) : null
                })}
            </defs>
        </svg>
    );
};


export default SvgSprite;
