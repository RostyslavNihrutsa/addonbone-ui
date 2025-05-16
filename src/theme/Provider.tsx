import React, {PropsWithChildren, useCallback, useEffect, useMemo, useState} from "react";
import {merge} from 'ts-deepmerge';

import {DefaultProps, ThemeContext} from "./context";

import {Theme} from "../types/theme";

import sharedConfig from '@adnbn-ui-config-shared'
import appConfig from '@adnbn-ui-config-app'

import "../styles/default.css"
import '@adnbn-ui-style-shared'
import '@adnbn-ui-style-app'

const isDarkMedia = () => window?.matchMedia("(prefers-color-scheme: dark)")?.matches;

const Provider = ({children, ...props}: PropsWithChildren<DefaultProps>) => {

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

    const defaultProps: DefaultProps = useMemo(() => merge(props, sharedConfig, appConfig), [props])

    return (
        <ThemeContext.Provider value={{theme, changeTheme, toggleTheme, defaultProps}}>
            {children}
        </ThemeContext.Provider>
    );
};

Provider.displayName = "ThemeProvider";

export default Provider;
