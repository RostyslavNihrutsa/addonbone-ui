import {createContext, useContext} from "react";
import {Theme} from "../../types/theme";
import {ComponentsProps} from "../../types/config";

export interface ThemeContract {
    theme: Theme;

    components: ComponentsProps;

    changeTheme(theme: Theme): void;

    toggleTheme(): void;
}

export const ThemeContext = createContext<ThemeContract>({
    theme: Theme.Light,
    components: {},
    changeTheme: () => {},
    toggleTheme: () => {},
});

ThemeContext.displayName = "ThemeContext";

export const useTheme = () => useContext(ThemeContext);

export const useComponentProps = <K extends keyof ComponentsProps>(key: K): ComponentsProps[K] => {
    const {components} = useTheme();

    return components[key];
};
