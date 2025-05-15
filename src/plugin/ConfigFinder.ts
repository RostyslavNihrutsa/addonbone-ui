import path from 'path';
import {ReadonlyConfig} from 'adnbn'
import Finder, {Options} from "./Finder";

export default class ConfigFinder extends Finder {
    protected defaultPath: string = path.resolve(__dirname, '..', 'config', 'default.ts');
    protected allowedExtensions: string[] = ['ts', 'tsx'];

    constructor(config: ReadonlyConfig, options: Options) {
        super(config, options)
    }
}
