import React, {PropsWithChildren, useCallback, useEffect, useState} from "react";

import {DefaultProps, ThemeContext} from "./context";

import {Theme, Mode} from "../types/theme";

import '../styles/variables-default.css'

const isDarkMedia = () => window?.matchMedia("(prefers-color-scheme: dark)")?.matches;

const Provider = ({children, ...defaultProps}: PropsWithChildren<DefaultProps>) => {

    const [theme, setTheme] = useState<Theme>(() => {
        return isDarkMedia() ? Theme.Dark : Theme.Light;
    });

    const [mode, setMode] = useState<Mode>(Mode.Static);

    const changeTheme = useCallback((theme: Theme) => {
        setTheme(theme);
    }, []);

    const toggleTheme = useCallback(() => {
        changeTheme(theme === Theme.Dark ? Theme.Light : Theme.Dark);
    }, [theme]);

    useEffect(() => {
        document.querySelector("html")?.setAttribute("theme", theme);
    }, [theme]);

    useEffect(() => {
        const url = new URL(document.location.href);

        const mode: Mode = url.searchParams.get('mode') === Mode.Responsive || url.pathname.includes('sidebar.html') ? Mode.Responsive : Mode.Static;

        if (mode !== Mode.Static) {
            setMode(mode);
        }

        document.querySelector("html")?.setAttribute("mode", mode);
    }, []);

    return (
        <ThemeContext.Provider value={{mode, theme, changeTheme, toggleTheme, defaultProps}}>
            {children}
        </ThemeContext.Provider>
    );
};

Provider.displayName = "ThemeProvider";

export default Provider;
