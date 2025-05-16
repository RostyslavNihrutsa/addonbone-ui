import path from "path";
import {definePlugin} from 'adnbn'
import ConfigFinder from "./ConfigFinder"
import StyleFinder from "./StyleFinder"
import Finder from "./Finder"

export interface Options {
    themeDir?: string;
    configFileName?: string;
    styleFileName?: string;
    mergeConfig?: boolean;
    mergeStyles?: boolean;
}

export default definePlugin((options: Options = {}) => {
    const {
        themeDir = '.',
        configFileName = 'theme.tsx',
        styleFileName = 'theme.css',
        mergeConfig = true,
        mergeStyles = true,
    } = options;

    let configFinder: Finder;
    let styleFinder: Finder;

    return {
        name: 'adnbn-ui',
        startup: ({config}) => {
            configFinder = new ConfigFinder(config, {themeDir, fileName: configFileName, merge: mergeConfig});
            styleFinder = new StyleFinder(config, {themeDir, fileName: styleFileName, merge: mergeStyles});
        },
        bundler: () => {

            return {
                resolve: {
                    alias: {
                        '@adnbn-ui-config-app': configFinder.getAppPath(),
                        '@adnbn-ui-config-shared': configFinder.getSharedPath(),
                        '@adnbn-ui-style-app': styleFinder.getAppPath(),
                        '@adnbn-ui-style-shared': styleFinder.getSharedPath(),
                        'react': path.resolve('./node_modules/react'),
                        'react-dom': path.resolve('./node_modules/react-dom'),
                    }
                }
            }
        }
    }
})
