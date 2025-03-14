import {createContext, useContext} from "react";
import {Mode, Theme} from "../types/theme";
import type {ButtonProps, TooltipProps} from "../components";

export interface DefaultProps {
    button?: Pick<ButtonProps, 'variant' | 'color' | 'size' | 'radius'>;
    tooltip?: Pick<TooltipProps, 'side' | 'align' | 'delayDuration' | 'arrowHeight' | 'arrowWidth'>;
}

export interface ThemeContract {
    mode: Mode;

    theme: Theme;

    defaultProps: DefaultProps;

    changeTheme(theme: Theme): void;

    toggleTheme(): void;
}

export const ThemeContext = createContext<ThemeContract>({
    mode: Mode.Static,
    theme: Theme.Light,
    defaultProps: {},
    changeTheme: () => {
    },
    toggleTheme: () => {
    },
});

ThemeContext.displayName = "ThemeContext";

export const useTheme = () => useContext(ThemeContext);

export const useDefaultProps = <K extends keyof DefaultProps>(key: K): DefaultProps[K] => {
    const {defaultProps} = useTheme();
    return defaultProps[key];
};
