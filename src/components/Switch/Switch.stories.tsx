import type {Meta, StoryObj} from "@storybook/react";
import SwitchComponent from "./Switch";
import {hideInTable} from "../../utils";

const meta: Meta<typeof SwitchComponent> = {
    title: "Components/Switch",
    component: SwitchComponent,
    tags: ["autodocs"],
    argTypes: {
        children: hideInTable,
        className: hideInTable,
        thumbClassName: hideInTable,
    },
};

export default meta;

type Story = StoryObj<typeof SwitchComponent>;

export const Switch: Story = {
    args: {
        checked: true,
        disabled: false,
    },
};
