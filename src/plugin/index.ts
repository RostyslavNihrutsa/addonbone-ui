import path from "path";
import {definePlugin} from 'adnbn'
import {RspackVirtualModulePlugin} from "rspack-plugin-virtual-module"

import StyleBuilder from "./builder/StyleBuilder"
import ConfigBuilder from "./builder/ConfigBuilder"

import Finder from "./finder/Finder"
import StyleFinder from "./finder/StyleFinder"
import ConfigFinder from "./finder/ConfigFinder"

import type {Configuration as Rspack} from '@rspack/core'
import type {BuilderContract} from './types'

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
        configFileName = 'ui.config',
        styleFileName = 'ui.style',
        mergeConfig = true,
        mergeStyles = true,
    } = options;

    let configFinder: Finder;
    let styleFinder: Finder;

    let configBuilder: BuilderContract;
    let styleBuilder: BuilderContract;

    return {
        name: 'adnbn-ui',
        startup: ({config}) => {
            const {srcDir, appsDir, sharedDir, app, appSrcDir} = config
            const normalizeThemeDir = path.normalize(themeDir).split(path.sep)

            // Elements should be arranged in descending order of priority
            const searchDirs = [
                path.join(srcDir, appsDir, app, appSrcDir, ...normalizeThemeDir),
                path.join(srcDir, sharedDir, ...normalizeThemeDir),
            ]

            configFinder = new ConfigFinder(configFileName, config).setCanMerge(mergeConfig).setSearchDirs(searchDirs);
            styleFinder = new StyleFinder(styleFileName, config).setCanMerge(mergeStyles).setSearchDirs(searchDirs);

            configBuilder = new ConfigBuilder(configFinder)
            styleBuilder = new StyleBuilder(styleFinder)
        },
        bundler: ({config}) => {
            return {
                plugins: [
                    new RspackVirtualModulePlugin({
                        'adnbn-ui-config': configBuilder.build(),
                        'adnbn-ui-style.scss': styleBuilder.build()
                    }, 'adnbn-ui-virtual'),
                ],

                resolve: {
                    alias: config.debug
                        ? {
                            'react': path.resolve('./node_modules/react'),
                            'react-dom': path.resolve('./node_modules/react-dom'),
                        } : undefined
                }
            } satisfies Rspack
        }
    }
})
