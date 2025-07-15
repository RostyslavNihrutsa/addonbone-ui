export enum Theme {
    Light = "light",
    Dark = "dark",
}

export interface ThemeStorageContract {
    get: () => Promise<Theme | undefined>;
    change: (theme: Theme) => Promise<void>;
    toggle: () => Promise<void>;
    watch: (callback: (theme: Theme) => void) => () => void;
}
