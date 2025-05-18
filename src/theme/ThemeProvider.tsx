import React, {PropsWithChildren, useCallback, useEffect, useMemo, useState} from "react";
import {merge} from 'ts-deepmerge';

import {ThemeContext} from "./context";
import {ComponentsProps} from "../components";

import {Theme} from "../types/theme";

import config from 'adnbn-ui-config'

import "../styles/default.css"

const isDarkMedia = () => window?.matchMedia("(prefers-color-scheme: dark)")?.matches;

const ThemeProvider = ({children, ...props}: PropsWithChildren<ComponentsProps>) => {

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

    const componentsProps: ComponentsProps = useMemo(() => merge(props, config), [props])

    return (
        <ThemeContext.Provider value={{theme, changeTheme, toggleTheme, componentsProps}}>
            {children}
        </ThemeContext.Provider>
    );
};

ThemeProvider.displayName = "ThemeProvider";

export default ThemeProvider;
