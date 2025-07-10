import React, {FC, PropsWithChildren, useCallback, useEffect, useState} from "react";

import {ThemeContext} from "./context";

import {Theme} from "../../types/theme";
import {Config} from "../../types/config";

const isDarkMedia = () => window?.matchMedia("(prefers-color-scheme: dark)")?.matches;

const ThemeProvider: FC<PropsWithChildren<Pick<Config, 'components'>>> = ({children, components}) => {
    const [theme, setTheme] = useState<Theme>(() => {
        return isDarkMedia() ? Theme.Dark : Theme.Light;
    });

    const changeTheme = useCallback((theme: Theme) => {
        setTheme(theme);
    }, []);

    const toggleTheme = useCallback(() => {
        changeTheme(theme === Theme.Dark ? Theme.Light : Theme.Dark);
    }, [theme, changeTheme]);

    useEffect(() => {
        document.querySelector("html")?.setAttribute("theme", theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{theme, changeTheme, toggleTheme, components}}>
            {children}
        </ThemeContext.Provider>
    );
};

ThemeProvider.displayName = "ThemeProvider";

export default ThemeProvider;
