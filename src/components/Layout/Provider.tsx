import React, {FC, PropsWithChildren, useCallback, useState} from "react";

import {expandType, LayoutContext} from "./context";

import classnames from "classnames";

import styles from "./layout.module.scss";

const Provider: FC<PropsWithChildren> = ({children}) => {
    const [isExpanded, setExpanded] = useState(false);
    const [height, setHeight] = useState<number | string | undefined>(undefined);
    const [width, setWidth] = useState<number | string | undefined>(undefined);

    const expand = useCallback((value?: expandType) => {
        setHeight(value?.height);
        setWidth(value?.width);
        setExpanded(true)
    }, []);

    const collapse = useCallback(() => {
        setHeight(undefined);
        setWidth(undefined);
        setExpanded(false)
    }, []);

    return (
        <LayoutContext.Provider value={{isExpanded, expand, collapse}}>
            <div
                style={{minHeight: height, minWidth: width}}
                className={classnames(styles["layout"], {
                    [styles["layout--expanded"]]: isExpanded,
                })}
            >
                {children}
            </div>
        </LayoutContext.Provider>
    );
};

Provider.displayName = "ViewportProvider";

export default Provider;
