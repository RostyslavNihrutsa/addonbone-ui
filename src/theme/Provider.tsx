import React, {PropsWithChildren, useCallback, useEffect, useState} from "react";

import {DefaultProps, ThemeContext} from "./context";

import {Theme} from "../types/theme";

import '../styles/variables-default.css'

const isDarkMedia = () => window?.matchMedia("(prefers-color-scheme: dark)")?.matches;

const Provider = ({children, ...defaultProps}: PropsWithChildren<DefaultProps>) => {

    const [theme, setTheme] = useState<Theme>(() => {
        return isDarkMedia() ? Theme.Dark : Theme.Light;
    });

    const changeTheme = useCallback((theme: Theme) => {
        setTheme(theme);
    }, []);

    const toggleTheme = useCallback(() => {
        changeTheme(theme === Theme.Dark ? Theme.Light : Theme.Dark);
    }, [theme]);

    useEffect(() => {
        document.querySelector("html")?.setAttribute("theme", theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{theme, changeTheme, toggleTheme, defaultProps}}>
            {children}
        </ThemeContext.Provider>
    );
};

Provider.displayName = "ThemeProvider";

export default Provider;
