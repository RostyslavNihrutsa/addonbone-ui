import fs from "fs";
import path from "path";
import Finder from "../finder/Finder";

import type {BuilderContract} from "../types";

export default class ConfigBuilder implements BuilderContract {
    protected template: string;

    public constructor(protected finder: Finder) {
        this.template = fs.readFileSync(path.resolve(__dirname, "virtual.config.ts"), "utf8");
    }

    public build(): string {
        const files = this.finder.getFiles();

        const imports = files.map(file => {
            return file.name ? `import ${file.name} from "${file.import}"` : `import "${file.import}"`;
        });

        // Elements must be reversed for correct merging of configs by priority
        const names = files
            .map(file => file.name)
            .filter(Boolean)
            .reverse();

        return this.template
            .replace("'configs imports'", imports.join("\n"))
            .replace("{}", names.join(", "));
    }
}
