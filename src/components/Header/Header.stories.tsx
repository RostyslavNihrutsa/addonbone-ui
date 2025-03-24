import type {Meta, StoryObj} from "@storybook/react";
import HeaderComponent from "./Header";
import {hideInTable} from "../../utils";

const meta: Meta<typeof HeaderComponent> = {
    title: "Components/Header",
    component: HeaderComponent,
    tags: ['autodocs'],
    argTypes: {
        before: hideInTable,
        after: hideInTable,
        children: hideInTable,
        className: hideInTable,
        wrapClassName: hideInTable,
        titleClassName: hideInTable,
        beforeClassName: hideInTable,
        afterClassName: hideInTable,
        subtitleClassName: hideInTable,
        childrenClassName: hideInTable,
    },
    decorators: [
        (Story) => (
            <div style={{ background: '#EEE', width: '380px', height: '300px', borderRadius: '10px' }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;

type Story = StoryObj<typeof HeaderComponent>;

export const Header: Story = {
    args: {
        title: 'Volume Up Plus',
        subtitle: 'Adjust the current tab\'s volume with the slider. Switch to any audio tab in one click.',
    },
};

export const WithLogo: Story = {
    args: {
        title: 'Volume Up Plus',
        subtitle: 'Adjust the current tab\'s volume with the slider. Switch to any audio tab in one click.',
        before: '❤️'
    },
};
