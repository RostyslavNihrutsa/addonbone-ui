import React, {FC, PropsWithChildren, useEffect, useMemo} from "react";
import {getBrowser} from "adnbn";

import {merge} from "ts-deepmerge";

import {ExtraProvider} from "../extra";
import {IconsProvider} from "../icons";
import {ThemeProvider, ThemeProviderProps} from "../theme";

import {ComponentsProps, Config, ExtraProps, Icons} from "../../types/config";

import "./styles/default.scss";
import "./styles/reset.scss";
import "addon-ui-style.scss";

import config from "addon-ui-config";

export interface UIProviderProps extends Partial<Config>, Pick<ThemeProviderProps, "storage"> {
    view?: string;
}

const UIProvider: FC<PropsWithChildren<UIProviderProps>> = ({
    children,
    components = {},
    extra = {},
    icons = {},
    storage,
    view,
}) => {
    const componentsProps = useMemo<ComponentsProps>(() => merge(config.components || {}, components), [components]);

    const extraProps = useMemo<ExtraProps>(() => merge(config.extra || {}, extra), [extra]);

    const svgIcons = useMemo<Icons>(() => merge(config.icons || {}, icons), [icons]);

    useEffect(() => {
        const html = document.querySelector("html");
        if (html) {
            if (view) {
                html.setAttribute("view", view);
            }
            html.setAttribute("browser", getBrowser());
        }
    }, [view]);

    return (
        <ThemeProvider components={componentsProps} storage={storage}>
            <ExtraProvider extra={extraProps}>
                <IconsProvider icons={svgIcons}>{children}</IconsProvider>
            </ExtraProvider>
        </ThemeProvider>
    );
};

UIProvider.displayName = "UIProvider";

export default UIProvider;
