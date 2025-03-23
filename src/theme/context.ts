import {createContext, useContext} from "react";
import {Theme} from "../types/theme";
import type {
    AvatarProps,
    ButtonProps,
    CheckboxProps,
    HeaderProps,
    IconButtonProps,
    SwitchProps,
    TagProps,
    ToastProps,
    TooltipProps,
} from "../components";

export interface DefaultProps {
    avatar?: Pick<AvatarProps, 'size' | 'radius' | 'cursorPointer' | 'delayMs'>;
    button?: Pick<ButtonProps, 'variant' | 'color' | 'size' | 'radius'>;
    checkbox?: Pick<CheckboxProps, 'variant' | 'size' | 'radius' | 'checkedIcon' | 'indeterminateIcon'>;
    header?: Pick<HeaderProps, 'alignCenter' | 'before' | 'after'>;
    iconButton?: Pick<IconButtonProps, 'variant' | 'size' | 'radius'>;
    switch?: SwitchProps;
    tag?: Pick<TagProps, 'variant' | 'size' | 'color' | 'radius' | 'clickable'>
    toast?: Pick<ToastProps, 'side' | 'duration' | 'swipeDirection' | 'swipeThreshold' | 'closeProps' | 'closeIcon' | 'fullWidth' | 'sticky' | 'radius' | 'color'>;
    tooltip?: Pick<TooltipProps, 'side' | 'align' | 'delayDuration' | 'arrowHeight' | 'arrowWidth'>;
}

export interface ThemeContract {
    theme: Theme;

    defaultProps: DefaultProps;

    changeTheme(theme: Theme): void;

    toggleTheme(): void;
}

export const ThemeContext = createContext<ThemeContract>({
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
