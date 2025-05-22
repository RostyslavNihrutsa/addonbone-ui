import React, {FC, PropsWithChildren, useCallback, useState,} from "react";

import type {Icons} from './context'
import {IconsContext} from './context'
import SvgSprite from './SvgSprite'

const IconsProvider: FC<PropsWithChildren<{ icons: Icons }>> = ({children, icons}) => {
    const [registeredIconNames, setRegisteredIconNames] = useState<string[]>([]);

    const registerIcon = useCallback((name: string) => {
        setRegisteredIconNames(prev => prev.includes(name) ? prev : [...prev, name]);
    }, []);

    return (
        <IconsContext.Provider value={{icons, registeredIconNames, registerIcon}}>
            {children}
            <SvgSprite icons={icons} registeredIconNames={registeredIconNames} />
        </IconsContext.Provider>
    );
};

IconsProvider.displayName = "IconsProvider";

export default IconsProvider;
