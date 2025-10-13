import React, {FC, PropsWithChildren, useCallback, useEffect, useMemo, useState} from "react";

import {ThemeContext} from "./context";

import {Theme, ThemeStorageContract} from "../../types/theme";
import {Config} from "../../types/config";

import ThemeStorage from "./ThemeStorage";

const isDarkMedia = () => window?.matchMedia("(prefers-color-scheme: dark)")?.matches;

const isValid = (theme: Theme | undefined): theme is Theme => {
    return !!theme && [Theme.Light, Theme.Dark].includes(theme);
};

export interface ThemeProviderProps extends Pick<Config, "components"> {
    storage?: ThemeStorageContract | true;
}

const ThemeProvider: FC<PropsWithChildren<ThemeProviderProps>> = ({children, components, storage}) => {
    const [theme, setTheme] = useState<Theme>(() => (isDarkMedia() ? Theme.Dark : Theme.Light));

    const currentStorage: ThemeStorageContract | undefined = useMemo(() => {
        if (!storage) return;

        if (storage === true) return new ThemeStorage();

        return storage;
    }, [storage]);

    const changeTheme = useCallback(
        (theme: Theme) => {
            if (currentStorage) {
                currentStorage.change(theme).catch(e => console.error("ThemeProvider: set theme to storage error", e));
            } else {
                setTheme(theme);
            }
        },
        [currentStorage]
    );

    const toggleTheme = useCallback(() => {
        changeTheme(theme === Theme.Dark ? Theme.Light : Theme.Dark);
    }, [theme, changeTheme]);

    useEffect(() => {
        if (!currentStorage) return;

        currentStorage
            .get()
            .then(newTheme => isValid(newTheme) && setTheme(newTheme))
            .catch(e => console.error("ThemeProvider: get theme from storage error", e));

        const unsubscribe = currentStorage.watch(newTheme => isValid(newTheme) && setTheme(newTheme));

        return () => unsubscribe();
    }, [currentStorage]);

    useEffect(() => {
        document.querySelector("html")?.setAttribute("theme", theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{theme, changeTheme, toggleTheme, components}}>{children}</ThemeContext.Provider>
    );
};

ThemeProvider.displayName = "ThemeProvider";

export default ThemeProvider;
