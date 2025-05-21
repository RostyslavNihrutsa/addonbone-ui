import fs from 'fs';
import path from 'path';

import type {ReadonlyConfig} from "adnbn";
import type {FileImportInfo} from "../types";

export interface FinderOptions {
    searchDirs: string[];
    fileName: string;
    canMerge: boolean;
}

export default abstract class Finder {
    protected abstract getAllowedExtensions(): string[];

    protected abstract getFile(dirPath: string): FileImportInfo | undefined;

    protected searchDirs: string[] = [];
    protected canMerge: boolean = true;

    protected constructor(
        protected readonly fileName: string,
        protected readonly config: ReadonlyConfig) {
    }

    public setCanMerge(canMerge: boolean): this {
        this.canMerge = canMerge;
        return this;
    }

    public setSearchDirs(searchDirs: string[]): this {
        this.searchDirs = searchDirs;
        return this;
    }

    public getFiles(): FileImportInfo[] {
        const files: FileImportInfo[] = [];

        let isFound = false

        this.searchDirs.forEach((dirPath) => {
            const file = this.getFile(dirPath);

            if (file && (this.canMerge || !isFound)) {
                files.push(file);
                isFound = true;
            }
        })

        return files
    }

    protected resolveFileWithExtensions(basePath: string, fileName: string): string | undefined {
        const extname = path.extname(fileName)

        const baseName = this.getAllowedExtensions().includes(extname.slice(1))
            ? path.basename(fileName, extname)
            : fileName;

        for (const ext of this.getAllowedExtensions()) {
            const fullPath = path.resolve(basePath, `${baseName}.${ext}`);
            if (fs.existsSync(fullPath)) {
                return fullPath;
            }
        }

        return undefined;
    }

    protected toImportPath(fullPath: string, withExt: boolean = false): string {
        const importPath = path
            .relative(this.config.inputDir, fullPath)
            .split(path.sep)
            .join('/');

        return withExt ? importPath : importPath.replace(path.extname(importPath), '');
    }
}
