import React, {FC, PropsWithChildren, useCallback, useEffect, useRef, useState} from "react";

import {Storage} from 'adnbn/storage';

import {ThemeContext} from "./context";

import {Theme, themeKey} from "../../types/theme";
import {Config} from "../../types/config";

const isDarkMedia = () => window?.matchMedia("(prefers-color-scheme: dark)")?.matches;

const ThemeProvider: FC<PropsWithChildren<Pick<Config, "components">>> = ({children, components}) => {
    const storage = useRef<Storage<Record<string, Theme>>>(new Storage());

    const [theme, setTheme] = useState<Theme>(() => {
        return isDarkMedia() ? Theme.Dark : Theme.Light;
    });

    const changeTheme = useCallback((theme: Theme) => {
        setTheme(theme);

        storage.current.set(themeKey, theme)
            .catch(e => console.error('ThemeProvider, set theme to storage error', e));
    }, []);

    const toggleTheme = useCallback(() => {
        changeTheme(theme === Theme.Dark ? Theme.Light : Theme.Dark);
    }, [theme, changeTheme]);

    useEffect(() => {
        storage.current.get(themeKey)
            .then(theme => theme && setTheme(theme))
            .catch(e => console.error('ThemeProvider, get theme from storage error', e));
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
