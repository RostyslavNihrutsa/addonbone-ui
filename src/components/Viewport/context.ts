import {createContext, useContext} from "react";

export enum ViewportMode {
    Fixed = "fixed",
    Adaptive = "adaptive",
    Expanded = "expanded",
}

export type ViewportSize = number | string;

export type ViewportSizes = {
    height?: ViewportSize;
    width?: ViewportSize;
};

export interface ViewportContract {
    mode: ViewportMode;

    setMode(mode: ViewportMode): void;

    setSizes(sizes: ViewportSizes): void;

    withTransition(transition: boolean): void;

    resetSizes(): void;
}

export const ViewportContext = createContext<ViewportContract>({
    mode: ViewportMode.Adaptive,

    setMode() {},

    setSizes() {},

    withTransition() {},

    resetSizes() {},
});

ViewportContext.displayName = "ViewportContext";

export const useViewport = () => useContext(ViewportContext);
