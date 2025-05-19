import fs from "fs";
import path from "path";
import Finder from './finder/Finder'

export default class Builder {
    protected configTemplate: string

    public constructor(private finder: Finder) {
        this.configTemplate = fs.readFileSync(path.resolve(__dirname, 'virtual', 'config.ts'), 'utf8')
    }

    public buildConfig(): string {
        const files = this.finder.getFiles()

        const imports = files.map((file) => {
            return file.file
                ? `import ${file.file} from "${file.import}"`
                : `import "${file.import}"`
        })

        const names = files.map((file) => file.file)

        return this.configTemplate
            .replace("'configs imports'", imports.join("\n"))
            .replace("{}", names.join(", "))

    }

    public buildStyle(): string {
        const files = this.finder.getFiles()

        const usesLines = new Set<string>();
        const stylesLines: string[] = [];

        const lines = files
            .map(file => file.import)
            .reduce((lines, filePath) => {
                return lines + '\n' + fs.readFileSync(path.resolve(filePath), 'utf8')
            }, '')
            .split('\n')

        for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed.startsWith('@use')) {
                usesLines.add(trimmed);
            } else {
                stylesLines.push(line);
            }
        }

        return [...usesLines].join('\n') + '\n' + stylesLines.join('\n')
    }

}
