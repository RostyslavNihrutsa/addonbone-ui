import {createContext, useContext} from "react";

export type expandType = {
    height?: number | string,
    width?: number | string,
}

export interface LayoutContract {
    isExpanded?: boolean;

    expand(value?: expandType): void;

    collapse(): void;
}

export const LayoutContext = createContext<LayoutContract>({
    isExpanded: false,
    expand() {
    },
    collapse() {
    },
});

LayoutContext.displayName = "LayoutContext";

export const useLayout = () => useContext(LayoutContext);
