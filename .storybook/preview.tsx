import React, {useEffect} from "react";
import type {Preview, StoryContext, StoryFn} from "@storybook/react";
import {ThemeProvider} from "../src/providers";
import "./styles/preview.css";

const ThemeDecorator = (Story: StoryFn, context: StoryContext) => {
    const dir = context.globals.dir || "ltr";
    const theme = context.globals.theme || "light";
    const cssVariables = context.globals.cssVariables || "default";

    useEffect(() => {
        document.documentElement.setAttribute("dir", dir);
        return () => {
            document.documentElement.removeAttribute("dir");
        };
    }, [dir]);

    useEffect(() => {
        document.documentElement.setAttribute("theme", theme);
        return () => {
            document.documentElement.removeAttribute("theme");
        };
    }, [theme]);

    useEffect(() => {
        if (cssVariables === "default") return;

        const linkElement = document.createElement("link");
        linkElement.rel = "stylesheet";
        linkElement.href = "../.storybook/styles/custom.scss";
        document.head.appendChild(linkElement);

        return () => {
            document.head.removeChild(linkElement);
        };
    }, [cssVariables]);

    return (
        <ThemeProvider components={{}}>
            <div className="story-wrapper">{Story(context.args, context)}</div>
        </ThemeProvider>
    );
};

const globalTypes = {
    dir: {
        name: "Direction",
        description: "Choose direction",
        defaultValue: "ltr",
        toolbar: {
            icon: "transfer",
            items: [
                {value: "ltr", title: "Left to right"},
                {value: "rtl", title: "Right to left"},
            ],
            showName: true,
        },
    },
    theme: {
        name: "Theme",
        description: "Global theme for components",
        defaultValue: "light",
        toolbar: {
            icon: "star",
            items: [
                {value: "light", title: "Light theme"},
                {value: "dark", title: "Dark theme"},
            ],
            showName: true,
        },
    },
    cssVariables: {
        name: "CSS Variables",
        description: "Choose CSS variables set",
        defaultValue: "default",
        toolbar: {
            icon: "paintbrush",
            items: [
                {value: "default", title: "Default Variables"},
                {value: "custom", title: "Custom Variables"},
            ],
            showName: true,
        },
    },
};

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
    decorators: [ThemeDecorator],
    globalTypes,
};

export default preview;
