import React, {FC, PropsWithChildren, useRef} from "react";
import {merge} from "ts-deepmerge";

import {ExtraProvider, IconsProvider, ThemeProvider, ThemeStorage} from "../index";

import {ThemeStorageContract} from "../../types/theme";
import {ComponentsProps, Config, ExtraProps, Icons} from "../../types/config";

import "./styles/default.scss";
import "./styles/reset.scss";
import "addon-ui-style.scss";

import config from "addon-ui-config";

export type UIProviderProps = Partial<Config>;

const UIProvider: FC<PropsWithChildren<UIProviderProps>> = ({children, components = {}, extra = {}, icons = {}}) => {
    const storage = useRef<ThemeStorageContract>(new ThemeStorage());

    const componentsProps: ComponentsProps = merge(config.components || {}, components);

    const extraProps: ExtraProps = merge(config.extra || {}, extra);

    const svgIcons: Icons = merge(config.icons || {}, icons);

    return (
        <ThemeProvider components={componentsProps} storage={storage.current}>
            <ExtraProvider extra={extraProps}>
                <IconsProvider icons={svgIcons}>{children}</IconsProvider>
            </ExtraProvider>
        </ThemeProvider>
    );
};

UIProvider.displayName = "UIProvider";

export default UIProvider;
