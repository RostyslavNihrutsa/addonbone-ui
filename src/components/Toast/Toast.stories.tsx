import {FC, useState} from "react";
import type {Meta, StoryObj} from "@storybook/react";
import ToastComponent, {ToastProps, ToastSide} from "./Toast";
import {Button, ButtonColor, ButtonVariant} from "../Button";

import {hideInTable} from "../../utils";

const sides: ToastSide[] = [ToastSide.TopLeft, ToastSide.TopRight, ToastSide.BottomRight, ToastSide.BottomLeft]
const meta: Meta<typeof ToastComponent> = {
    title: "Components/Toast",
    component: ToastComponent,
    tags: ['autodocs'],
    argTypes: {
        duration: {
            description: "The time in milliseconds that should elapse before automatically closing each toast."
        },
        swipeDirection: {
            options: ["right", "left", "up", "down"],
            control: {type: 'select'},
            description: 'The direction of the pointer swipe that should close the toast.'
        },
        swipeThreshold: {
            description: "The distance in pixels that the swipe gesture must travel before a close is triggered.",
            control: {type: 'number'},
        },
        side: {
            options: sides,
            control: {type: 'select'},
        },

        closeProps: hideInTable,
        onClose: hideInTable,
        children: hideInTable,
        className: hideInTable,
        titleClassName: hideInTable,
        actionClassName: hideInTable,
        viewportClassName: hideInTable,
        descriptionClassName: hideInTable,
    },
};

export default meta;

type Story = StoryObj<typeof ToastComponent>;

export const Toast: Story = {
    args: {
        open: true,
        children: <Button variant={ButtonVariant.Contained} color={ButtonColor.Primary}>Show toast</Button>,
        title: 'New notification',
        description: 'Description',
        side: ToastSide.BottomRight,
        duration: 5000,
        swipeThreshold: 50,
        swipeDirection: 'right',
        onClose: () => undefined
    },
};

const ToastClickable: FC<ToastProps> = ({children, ...props}) => {
    const [open, setOpen] = useState(false);
    const handleClick = () => setOpen((prev) => !prev);
    const handleClose = () => setOpen(false);

    return (
        <ToastComponent
            open={open}
            title='New notification'
            description='Description'
            onOpenChange={setOpen}
            onClose={handleClose}
            {...props}
        >
            <Button
                variant={ButtonVariant.Contained}
                color={ButtonColor.Primary}
                onClick={handleClick}
            >
                {children}
            </Button>
        </ToastComponent>
    );
};

export const Side = () => {
    return (
        <div style={{display: 'flex', gap: '10px'}}>
            <ToastClickable
                side={ToastSide.TopLeft}
                description='Top Left'
                swipeDirection='left'
            >
                Top Left
            </ToastClickable>

            <ToastClickable
                side={ToastSide.TopRight}
                description='Top Right'
            >
                Top Right
            </ToastClickable>

            <ToastClickable
                side={ToastSide.BottomRight}
                description='Bottom Right'
            >
                Bottom Right
            </ToastClickable>

            <ToastClickable
                side={ToastSide.BottomLeft}
                description='Bottom Left'
                swipeDirection='left'
            >
                Bottom Left
            </ToastClickable>
        </div>
    );
};

