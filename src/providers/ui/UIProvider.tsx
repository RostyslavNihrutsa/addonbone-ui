import React, {FC, PropsWithChildren} from "react";
import {merge} from "ts-deepmerge";

import {ExtraProvider, IconsProvider, ThemeProvider} from "../index";

import {ComponentsProps, Config, ExtraProps, Icons} from "../../types/config";

import "../theme/styles/default.scss";
import "../theme/styles/reset.scss";
import "adnbn-ui-style.scss";

import config from "adnbn-ui-config";

export type UIProviderProps = Partial<Config>

const UIProvider: FC<PropsWithChildren<UIProviderProps>> = ({children, components = {}, extra = {}, icons = {}}) => {
    const componentsProps: ComponentsProps = merge(config.components || {}, components);

    const extraProps: ExtraProps = merge(config.extra || {}, extra);

    const svgIcons: Icons = merge(config.icons || {}, icons);

    return (
        <ThemeProvider components={componentsProps}>
            <ExtraProvider extra={extraProps}>
                <IconsProvider icons={svgIcons}>
                    {children}
                </IconsProvider>
            </ExtraProvider>
        </ThemeProvider>
    );
};

UIProvider.displayName = "UIProvider";

export default UIProvider;
