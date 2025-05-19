import React, {PropsWithChildren, useCallback, useEffect, useState} from "react";

import {ThemeContext} from "./context";
import {ComponentsProps} from "../components";

import {Theme} from "../types/theme";

import "../styles/default.css"

const isDarkMedia = () => window?.matchMedia("(prefers-color-scheme: dark)")?.matches;

const ThemeProvider = ({children, ...componentsProps}: PropsWithChildren<ComponentsProps>) => {

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
        <ThemeContext.Provider value={{theme, changeTheme, toggleTheme, componentsProps}}>
            {children}
        </ThemeContext.Provider>
    );
};

ThemeProvider.displayName = "ThemeProvider";

export default ThemeProvider;
