import fs from 'fs';
import path from 'path';
import {ReadonlyConfig} from 'adnbn'

import {EntrypointFile} from "../../types/entrypoint";

export interface FinderOptions {
    themeDir: string;
    fileName: string;
    canMerge: boolean;
}

export default abstract class Finder {
    protected abstract allowedExtensions: string[];

    protected abstract getAppEntrypointFile(): EntrypointFile | undefined;
    protected abstract getSharedEntrypointFile(): EntrypointFile | undefined;

    protected fileName: string;
    protected canMerge: boolean;

    protected inputDir: string;

    protected appThemeDir: string;
    protected sharedThemeDir: string;

    protected constructor(config: ReadonlyConfig, options: FinderOptions) {
        const {inputDir, srcDir, appsDir, sharedDir, app, appSrcDir} = config
        const {themeDir, fileName, canMerge} = options

        const themePath: string[] = path.normalize(themeDir).split(path.sep);
        
        this.inputDir = inputDir;
        this.canMerge = canMerge;
        this.fileName = fileName;
        this.appThemeDir = path.resolve(inputDir, srcDir, appsDir, app, appSrcDir, ...themePath);
        this.sharedThemeDir = path.resolve(inputDir, srcDir, sharedDir, ...themePath);
    }

    public getFiles(): EntrypointFile[] {
        const files: EntrypointFile[] = [];

        const appFile = this.getAppEntrypointFile()
        const sharedFile = this.getSharedEntrypointFile()

        if (sharedFile !== undefined && (this.canMerge || appFile === undefined)) {
            files.push(sharedFile)
        }

        if (appFile !== undefined) {
            files.push(appFile)
        }

        return files
    }

    protected resolveFileWithExtensions(basePath: string, fileName: string): string | undefined {
        const extname = path.extname(fileName)

        if (this.allowedExtensions.includes(extname.slice(1))) {
            const fullPath = path.resolve(basePath, fileName);
            if (fs.existsSync(fullPath)) {
                return fullPath;
            }
        }

        const baseName = path.basename(fileName, extname);

        for (const ext of this.allowedExtensions) {
            const fullPath = path.resolve(basePath, `${baseName}.${ext}`);
            if (fs.existsSync(fullPath)) {
                return fullPath;
            }
        }
        return undefined;
    }

    protected toImportPath(fullPath: string, withExt: boolean = false): string {
        const importPath = path.relative(this.inputDir, fullPath).split(path.sep).join('/');

        return withExt ? importPath : importPath.replace(path.extname(importPath), '');
    }
}
