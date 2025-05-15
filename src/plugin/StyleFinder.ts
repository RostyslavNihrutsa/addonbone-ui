import path from 'path';
import {ReadonlyConfig} from 'adnbn'
import Finder, {Options} from "./Finder";

export default class StyleFinder extends Finder {
    protected defaultPath: string = path.resolve(__dirname, '..', 'styles', 'default.css');
    protected allowedExtensions: string[] = ['css', 'scss'];

    constructor(protected config: ReadonlyConfig, protected options: Options) {
        super(config, options)
    }
}
