import {createContext, useContext} from "react";
import {Icons} from "../../types/config";

export interface IconsContract {
    icons: Icons;
    registeredIconNames: string[];
    registerIcon: (name: string) => void;
}

export const IconsContext = createContext<IconsContract>({
    icons: {},

    registeredIconNames: [],

    registerIcon: () => {},
});

IconsContext.displayName = "IconsContext";

export const useIcons = () => useContext(IconsContext);
