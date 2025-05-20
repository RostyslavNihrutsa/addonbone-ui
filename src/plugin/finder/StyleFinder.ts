import Finder from "./Finder";

import type {ReadonlyConfig} from "adnbn";
import type {FileImportInfo} from "../types";

export default class StyleFinder extends Finder {
    protected getAllowedExtensions(): string[] {
        return ['scss', 'css'];
    }

    constructor(fileName: string, config: ReadonlyConfig) {
        super(fileName, config);
    }

    protected getFile(dirPath: string): FileImportInfo | undefined {
        const filePath = this.resolveFileWithExtensions(dirPath, this.fileName)

        if (!filePath) return

        return {name: '', import: this.toImportPath(filePath, true)}
    }
}
