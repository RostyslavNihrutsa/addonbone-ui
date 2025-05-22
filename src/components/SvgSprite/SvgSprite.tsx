import React, {FC, memo, SVGProps} from "react";

export interface SvgSpriteProps {
    icons: Record<string, FC<SVGProps<SVGSVGElement>>>
}

const SvgSprite: FC<SvgSpriteProps> = ({icons}) => {

    return (
        <svg style={{display: "none"}} aria-hidden="true">
            <defs>
                {Object.entries(icons).map(([name, Icon]) => (
                        <symbol id={name} key={name} viewBox="0 0 24 24">
                            <Icon/>
                        </symbol>
                    )
                )}
            </defs>
        </svg>
    );
};


export default memo(SvgSprite);
