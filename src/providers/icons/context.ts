import {createContext, useContext} from "react";
import {SvgSpriteProps} from '../../components'

export type Icons = SvgSpriteProps['icons'];

export interface IconsContract {
    icons: Icons;
    registeredIconNames: string[];
    registerIcon: (name: string) => void;
}

export const IconsContext = createContext<IconsContract>({
    icons: {},

    registeredIconNames: [],

    registerIcon: () => {
    },

});

IconsContext.displayName = "IconsContext";

export const useIcons = () => useContext(IconsContext);
