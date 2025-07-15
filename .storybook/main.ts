import path from "path";
import {mergeConfig} from "vite";
import type {StorybookConfig} from "@storybook/react-vite";

const config: StorybookConfig = {
    stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
    addons: ["@storybook/addon-essentials"],
    framework: {
        name: "@storybook/react-vite",
        options: {},
    },
    viteFinal: config => {
        return mergeConfig(config, {
            resolve: {
                alias: {
                    "adnbn-ui-config": path.resolve("src", "config", "default.ts"),
                    "adnbn-ui-style.scss": path.resolve("src", "providers", "ui", "styles", "default.scss"),
                },
            },
        });
    },
};
export default config;
