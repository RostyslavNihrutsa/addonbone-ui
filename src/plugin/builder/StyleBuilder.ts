import fs from "fs";
import path from "path";
import Finder from "../finder/Finder";

import type {BuilderContract} from "../types";

export default class StyleBuilder implements BuilderContract {
    public constructor(protected finder: Finder) {}

    public build(): string {
        const files = this.finder.getFiles();

        const usesLines = new Set<string>();
        const stylesLines: string[] = [];

        const lines = files
            .map(file => file.import)
            .reduce((lines, filePath) => {
                return lines + "\n" + fs.readFileSync(path.resolve(filePath), "utf8");
            }, "")
            .split("\n");

        for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed.startsWith("@use")) {
                usesLines.add(trimmed);
            } else {
                stylesLines.push(line);
            }
        }

        return [...usesLines].join("\n") + "\n" + stylesLines.join("\n");
    }
}
