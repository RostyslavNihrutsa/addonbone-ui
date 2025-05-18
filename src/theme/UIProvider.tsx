import React, {PropsWithChildren, useMemo} from "react";
import {merge} from 'ts-deepmerge';

import ThemeProvider from "./ThemeProvider";
import {ComponentsProps} from "../components";

import config from 'adnbn-ui-config'

const UIProvider = ({children, ...props}: PropsWithChildren<ComponentsProps>) => {

    const componentsProps: ComponentsProps = useMemo(() => merge(config, props), [props])

    return (
        <ThemeProvider {...componentsProps}>
            {children}
        </ThemeProvider>
    );
};

UIProvider.displayName = "UIProvider";

export default UIProvider;
