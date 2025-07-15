import React, {FC, PropsWithChildren, useCallback, useEffect, useState} from "react";

import {ThemeContext} from "./context";

import {Theme, ThemeStorageContract} from "../../types/theme";
import {Config} from "../../types/config";

const isDarkMedia = () => window?.matchMedia("(prefers-color-scheme: dark)")?.matches;

const isValid = (theme: Theme | undefined): theme is Theme => {
    return !!theme && [Theme.Light, Theme.Dark].includes(theme);
};

export interface ThemeProviderProps extends Pick<Config, "components"> {
    storage?: ThemeStorageContract;
}

const ThemeProvider: FC<PropsWithChildren<ThemeProviderProps>> = ({children, components, storage}) => {
    const [theme, setTheme] = useState<Theme>(() => (isDarkMedia() ? Theme.Dark : Theme.Light));

    const changeTheme = useCallback((theme: Theme) => {
        if (storage) {
            storage.change(theme).catch(e => console.error("ThemeProvider: set theme to storage error", e));
        } else {
            setTheme(theme);
        }
    }, []);

    const toggleTheme = useCallback(() => {
        changeTheme(theme === Theme.Dark ? Theme.Light : Theme.Dark);
    }, [theme, changeTheme]);

    useEffect(() => {
        if (!storage) return;

        storage
            .get()
            .then(newTheme => isValid(newTheme) && setTheme(newTheme))
            .catch(e => console.error("ThemeProvider: get theme from storage error", e));

        const unsubscribe = storage.watch(newTheme => isValid(newTheme) && setTheme(newTheme));

        return () => unsubscribe();
    }, [storage]);

    useEffect(() => {
        document.querySelector("html")?.setAttribute("theme", theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{theme, changeTheme, toggleTheme, components}}>{children}</ThemeContext.Provider>
    );
};

ThemeProvider.displayName = "ThemeProvider";

export default ThemeProvider;
