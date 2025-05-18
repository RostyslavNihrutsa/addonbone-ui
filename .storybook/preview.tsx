import React, {useEffect} from 'react';
import type {Preview, StoryContext, StoryFn} from '@storybook/react'
import {ThemeProvider} from "../src/theme";
import '../src/styles/preview.css'


const themeDecorator = (Story: StoryFn, context: StoryContext) => {
    const theme = context.globals.theme || 'light';
    const cssVariables = context.globals.cssVariables || 'default';

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        return () => {
            document.documentElement.removeAttribute('data-theme');
        };
    }, [theme]);

    useEffect(() => {
        if (cssVariables === 'default') return

        const linkElement = document.createElement('link');
        linkElement.rel = 'stylesheet';
        linkElement.href = '/src/styles/custom.css';
        document.head.appendChild(linkElement);

        return () => {
            document.head.removeChild(linkElement);
        };
    }, [cssVariables]);

    return (
        <ThemeProvider>
            <div className='story-wrapper'>
                {Story(context.args, context)}
            </div>
        </ThemeProvider>
    )
};

const globalTypes = {
    theme: {
        name: 'Theme',
        description: 'Global theme for components',
        defaultValue: 'light',
        toolbar: {
            icon: 'star',
            items: [
                {value: 'light', title: 'Light theme'},
                {value: 'dark', title: 'Dark theme'},
            ],
            showName: true,
        },
    },
    cssVariables: {
        name: 'CSS Variables',
        description: 'Choose CSS variables set',
        defaultValue: 'default',
        toolbar: {
            icon: 'paintbrush',
            items: [
                {value: 'default', title: 'Default Variables'},
                {value: 'custom', title: 'Custom Variables'},
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
    decorators: [themeDecorator],
    globalTypes
};

export default preview;
