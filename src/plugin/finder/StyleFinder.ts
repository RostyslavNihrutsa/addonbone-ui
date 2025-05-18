import {ReadonlyConfig} from 'adnbn'
import Finder, {FinderOptions} from "./Finder";
import {EntrypointFile} from "../../types/entrypoint";

export default class StyleFinder extends Finder {
    protected allowedExtensions: string[] = ['css', 'scss'];

    constructor(protected config: ReadonlyConfig, protected options: FinderOptions) {
        super(config, options)
    }

    protected getAppEntrypointFile(): EntrypointFile | undefined {
        const filePath = this.resolveFileWithExtensions(this.appThemeDir, this.fileName)

        return filePath ? {file: '', import: this.toImportPath(filePath, true)} : undefined;
    }

    protected getSharedEntrypointFile(): EntrypointFile | undefined {
        const filePath = this.resolveFileWithExtensions(this.sharedThemeDir, this.fileName)

        return filePath ? {file: '', import: this.toImportPath(filePath, true)} : undefined;
    }
}
