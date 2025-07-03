export interface FileImportInfo {
    name: string;
    import: string;
}

export interface BuilderContract {
    build(): string;
}
