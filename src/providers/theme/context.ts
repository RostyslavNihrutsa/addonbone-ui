import {createContext, useContext} from "react";
import {Theme} from "../../types/theme";
import {ComponentsProps} from "../../components";

export interface ThemeContract {
    theme: Theme;

    componentsProps: ComponentsProps;

    changeTheme(theme: Theme): void;

    toggleTheme(): void;
}

export const ThemeContext = createContext<ThemeContract>({
    theme: Theme.Light,
    componentsProps: {},
    changeTheme: () => {
    },
    toggleTheme: () => {
    },
});

ThemeContext.displayName = "ThemeContext";

export const useTheme = () => useContext(ThemeContext);

export const useComponentProps = <K extends keyof ComponentsProps>(key: K): ComponentsProps[K] => {
    const {componentsProps} = useTheme();
    return componentsProps[key];
};
