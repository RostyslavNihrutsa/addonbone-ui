import fs from 'fs';
import path from 'path';
import {ReadonlyConfig} from 'adnbn'

export interface Options {
    themeDir: string;
    fileName: string;
    merge: boolean;
}

export default abstract class Finder {
    protected abstract defaultPath: string;
    protected abstract allowedExtensions: string[];

    protected appBasePath: string;
    protected sharedBasePath: string;

    protected fileName: string;
    protected merge: boolean;

    protected constructor(config: ReadonlyConfig, options: Options) {
        const {inputDir, srcDir, appsDir, sharedDir, app, appSrcDir} = config
        const {themeDir, fileName, merge} = options

        const themePath: string[] = this.getDirPath(themeDir);

        this.merge = merge;
        this.fileName = fileName;
        this.appBasePath = path.resolve(inputDir, srcDir, appsDir, app, appSrcDir, ...themePath);
        this.sharedBasePath = path.resolve(inputDir, srcDir, sharedDir, ...themePath);
    }

    protected fileExists(path: string): boolean {
        return fs.existsSync(path);
    }

    protected getDirPath(dirPath: string): string[] {
        return path.normalize(dirPath).split(path.sep);
    }

    public getAppPath(): string {
        return this.resolveFileWithExtensions(this.appBasePath, this.fileName) ?? this.defaultPath;
    }

    public getSharedPath(): string {
        const appPath = this.resolveFileWithExtensions(this.appBasePath, this.fileName);
        const sharedPath = this.resolveFileWithExtensions(this.sharedBasePath, this.fileName);

        return sharedPath && (this.merge || !appPath) ? sharedPath : this.defaultPath;
    }

    protected resolveFileWithExtensions(basePath: string, fileName: string): string | undefined {
        const extname = path.extname(fileName)

        if (this.allowedExtensions.includes(extname.slice(1))) {
            const fullPath = path.resolve(basePath, fileName);
            if (this.fileExists(fullPath)) {
                return fullPath;
            }
        }

        const baseName = path.basename(fileName, extname);

        for (const ext of this.allowedExtensions) {
            const fullPath = path.resolve(basePath, `${baseName}.${ext}`);
            if (this.fileExists(fullPath)) {
                return fullPath;
            }
        }
        return undefined;
    }
}
