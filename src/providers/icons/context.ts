import {createContext, useContext} from "react";

export type SvgProps = React.SVGProps<SVGSVGElement>;
export type IconType = React.FC<SvgProps>;
export type Icons = Record<string, IconType>;

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
