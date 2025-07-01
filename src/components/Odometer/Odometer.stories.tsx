import {useEffect, useState} from "react";
import type {Meta, StoryObj} from "@storybook/react";
import OdometerComponent from "./Odometer";

import {hideInTable} from "../../utils";

const meta: Meta<typeof OdometerComponent> = {
    title: "Components/Odometer",
    component: OdometerComponent,
    tags: ["autodocs"],
    argTypes: {
        value: {
            description: "The number to display on the odometer.",
            control: {type: "number"},
        },
        format: {
            description: "Formatting string for odometer value.",
            control: {type: "text"},
        },
        duration: {
            description: "Animation duration in milliseconds.",
            control: {type: "number"},
        },
        auto: hideInTable,
        className: hideInTable,
    },
};

export default meta;

type Story = StoryObj<typeof OdometerComponent>;

export const Odometer: Story = {
    args: {
        value: 1234,
        duration: 500,
        format: "d",
    },
};

export const OdometerCount = () => {
    const [value, setValue] = useState(100);

    useEffect(() => {
        const interval = setInterval(() => {
            setValue(prev => ++prev);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return <OdometerComponent value={value} />;
};

export const OdometerRandom = () => {
    const [value, setValue] = useState(100);

    useEffect(() => {
        const interval = setInterval(() => {
            setValue(prev => prev + Math.floor(Math.random() * 10) + 1);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return <OdometerComponent value={value} duration={1000} />;
};
