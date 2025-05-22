import React, {PropsWithChildren, useMemo} from "react";
import {merge} from 'ts-deepmerge';

import ThemeProvider from "./theme/ThemeProvider";
import {IconsProvider, Icons} from "./icons";
import {ComponentsProps} from "../components";

import config from 'adnbn-ui-config'

import type {Config} from "../config";

const UIProvider = ({children, props, icons}: PropsWithChildren<Config>) => {
    const componentsProps: ComponentsProps = useMemo(() => merge(config.props || {}, props), [props])

    const svgIcons: Icons = useMemo(() => merge(config.icons || {}, icons), [icons])

    return (
        <ThemeProvider {...componentsProps}>
            <IconsProvider icons={svgIcons}>
                {children}
            </IconsProvider>
        </ThemeProvider>
    );
};

UIProvider.displayName = "UIProvider";

export default UIProvider;
