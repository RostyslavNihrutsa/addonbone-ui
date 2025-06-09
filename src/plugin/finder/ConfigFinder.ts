import path from "path";
import Finder from "./Finder";

import type {ReadonlyConfig} from "adnbn";
import type {FileImportInfo} from "../types";

export default class ConfigFinder extends Finder {
    protected getAllowedExtensions(): string[] {
        return ['tsx', 'ts'];
    }

    constructor(fileName: string, config: ReadonlyConfig) {
        super(fileName, config);
    }

    protected getFile(dirPath: string): FileImportInfo | undefined {
        const filePath = this.resolveFileWithExtensions(dirPath, this.fileName)

        if (!filePath) return

        return {
            name: dirPath.replaceAll(path.sep, '').replaceAll('-', ''),
            import: this.toImportPath(filePath)
        }
    }
}
