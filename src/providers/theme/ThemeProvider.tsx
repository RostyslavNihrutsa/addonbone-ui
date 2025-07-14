import React, {FC, PropsWithChildren, useCallback, useEffect, useRef, useState} from "react";

import {ThemeContext} from "./context";
import ThemeStorage from "./ThemeStorage";

import {Theme} from "../../types/theme";
import {Config} from "../../types/config";

const isDarkMedia = () => window?.matchMedia("(prefers-color-scheme: dark)")?.matches;

const ThemeProvider: FC<PropsWithChildren<Pick<Config, "components">>> = ({children, components}) => {
    const storage = useRef(new ThemeStorage());

    const [theme, setTheme] = useState<Theme>(() => isDarkMedia() ? Theme.Dark : Theme.Light);

    const changeTheme = useCallback((theme: Theme) => {
        storage.current.change(theme)
            .catch(e => console.error('ThemeProvider, set theme to storage error', e));
    }, []);

    const toggleTheme = useCallback(() => {
        changeTheme(theme === Theme.Dark ? Theme.Light : Theme.Dark);
    }, [theme, changeTheme]);

    useEffect(() => {
        const isValid = (theme: Theme | undefined): theme is Theme => {
            return !!theme && [Theme.Light, Theme.Dark].includes(theme);
        };

        storage.current.get()
            .then(newTheme => isValid(newTheme) && setTheme(newTheme))
            .catch(e => console.error('ThemeProvider, get theme from storage error', e));

        const unsubscribe = storage.current.watch(newTheme => isValid(newTheme) && setTheme(newTheme));

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        document.querySelector("html")?.setAttribute("theme", theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{theme, changeTheme, toggleTheme, components}}>{children}</ThemeContext.Provider>
    );
};

ThemeProvider.displayName = "ThemeProvider";

export default ThemeProvider;
