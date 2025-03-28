import {createContext, useContext} from "react";
import {Theme} from "../types/theme";
import type {
    AvatarProps,
    ButtonProps,
    CheckboxProps,
    DialogProps,
    DrawerProps,
    FooterProps,
    HeaderProps,
    IconButtonProps,
    ModalProps,
    SwitchProps,
    TagProps,
    TextAreaProps,
    TextFieldProps,
    ToastProps,
    TooltipProps,
    ViewProps,
    ViewDrawerProps,
    ViewModalProps,
} from "../components";

export interface DefaultProps {
    avatar?: Pick<AvatarProps, 'size' | 'radius' | 'cursorPointer' | 'delayMs'>;
    button?: Pick<ButtonProps, 'variant' | 'color' | 'size' | 'radius'>;
    checkbox?: Pick<CheckboxProps, 'variant' | 'size' | 'radius' | 'checkedIcon' | 'indeterminateIcon'>;
    dialog?: DialogProps;
    drawer?: DrawerProps;
    footer?: FooterProps;
    header?: Pick<HeaderProps, 'alignCenter' | 'before' | 'after'>;
    iconButton?: Pick<IconButtonProps, 'variant' | 'size' | 'radius'>;
    modal?: ModalProps;
    switch?: SwitchProps;
    tag?: Pick<TagProps, 'variant' | 'size' | 'color' | 'radius' | 'clickable'>;
    textArea?: TextAreaProps;
    textField?: TextFieldProps;
    toast?: Pick<ToastProps, 'side' | 'duration' | 'swipeDirection' | 'swipeThreshold' | 'closeProps' | 'closeIcon' | 'fullWidth' | 'sticky' | 'radius' | 'color'>;
    tooltip?: Pick<TooltipProps, 'side' | 'align' | 'delayDuration' | 'arrowHeight' | 'arrowWidth'>;
    view?: ViewProps;
    viewDrawer?: ViewDrawerProps;
    viewModal?: ViewModalProps;
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
