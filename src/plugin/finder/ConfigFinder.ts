import {ReadonlyConfig} from 'adnbn'
import Finder, {FinderOptions} from "./Finder";
import {EntrypointFile} from "../../types/entrypoint";

export default class ConfigFinder extends Finder {
    protected allowedExtensions: string[] = ['ts', 'tsx'];

    constructor(config: ReadonlyConfig, options: FinderOptions) {
        super(config, options)
    }

    protected getAppEntrypointFile(): EntrypointFile | undefined {
        const filePath = this.resolveFileWithExtensions(this.appThemeDir, this.fileName)

        return filePath ? {file: 'appConfig', import: this.toImportPath(filePath)} : undefined;
    }

    protected getSharedEntrypointFile(): EntrypointFile | undefined {
        const filePath = this.resolveFileWithExtensions(this.sharedThemeDir, this.fileName)

        return filePath ? {file: 'sharedConfig', import: this.toImportPath(filePath)} : undefined;
    }
}
