import fs from "fs";
import path from "path";
import {definePlugin} from 'adnbn'
import {RspackVirtualModulePlugin} from "rspack-plugin-virtual-module"

import Builder from "./Builder"
import Finder from "./finder/Finder"
import ConfigFinder from "./finder/ConfigFinder"
import StyleFinder from "./finder/StyleFinder"

export interface PluginOptions {
    themeDir?: string;
    configFileName?: string;
    styleFileName?: string;
    mergeConfig?: boolean;
    mergeStyles?: boolean;
}

export default definePlugin((options: PluginOptions = {}) => {
    const {
        themeDir = '.',
        configFileName = 'theme.tsx',
        styleFileName = 'theme.scss',
        mergeConfig = true,
        mergeStyles = true,
    } = options;

    const template = fs.readFileSync(path.resolve(__dirname, 'virtual', 'config.ts'), 'utf8')

    let configFinder: Finder;
    let styleFinder: Finder;

    let configBuilder: Builder;
    let styleBuilder: Builder;

    return {
        name: 'adnbn-ui',
        startup: ({config}) => {
            configFinder = new ConfigFinder(config, {themeDir, fileName: configFileName, canMerge: mergeConfig});
            styleFinder = new StyleFinder(config, {themeDir, fileName: styleFileName, canMerge: mergeStyles});

            configBuilder = new Builder(configFinder)
            styleBuilder = new Builder(styleFinder)
        },
        bundler: () => {
            const {imports: configImports, names: configNames} = configBuilder.build()
            const {imports: styleImports} = styleBuilder.build()

            return {
                plugins: [
                    new RspackVirtualModulePlugin({
                        'adnbn-ui-config': template
                            .replace("'styles imports'", styleImports.join("\n"))
                            .replace("'configs imports'", configImports.join("\n"))
                            .replace("{}", configNames.join(", "))
                    }),
                ],

                resolve: {
                    alias: {
                        'react': path.resolve('./node_modules/react'),
                        'react-dom': path.resolve('./node_modules/react-dom'),
                    }
                }
            }
        }
    }
})
