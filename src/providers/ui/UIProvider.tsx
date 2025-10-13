import React, {FC, PropsWithChildren, useMemo, useRef} from "react";
import {merge} from "ts-deepmerge";

import {ExtraProvider, IconsProvider, ThemeProvider, ThemeStorage} from "../index";

import {ThemeStorageContract} from "../../types/theme";
import {ComponentsProps, Config, ExtraProps, Icons} from "../../types/config";

import "./styles/default.scss";
import "./styles/reset.scss";
import "addon-ui-style.scss";

import config from "addon-ui-config";

export type UIProviderProps = Partial<Config> & {
    view?: string
};

const UIProvider: FC<PropsWithChildren<UIProviderProps>> = (
    {
        children,
        components = {},
        extra = {},
        icons = {},
        view
    }) => {
    const storageRef = useRef<ThemeStorageContract | null>(null);

    if (!storageRef.current) {
        storageRef.current = new ThemeStorage();
    }

    const componentsProps = useMemo<ComponentsProps>(() => merge(config.components || {}, components), [components]);

    const extraProps = useMemo<ExtraProps>(() => merge(config.extra || {}, extra), [extra]);

    const svgIcons = useMemo<Icons>(() => merge(config.icons || {}, icons), [icons]);

    return (
        <ThemeProvider components={componentsProps} storage={storageRef.current} view={view}>
            <ExtraProvider extra={extraProps}>
                <IconsProvider icons={svgIcons}>{children}</IconsProvider>
            </ExtraProvider>
        </ThemeProvider>
    );
};

UIProvider.displayName = "UIProvider";

export default UIProvider;
