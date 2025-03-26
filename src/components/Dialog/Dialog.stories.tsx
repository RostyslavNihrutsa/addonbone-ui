import {useState} from "react";
import type {Meta, StoryObj} from "@storybook/react";
import DialogComponent, {DialogProps, DialogRadius} from "./Dialog";
import {Button} from "../Button";
import {Header} from "../Header";
import {capitalizeFirstLetter, hideInTable} from "../../utils";

const radius: (DialogRadius | 'default')[] = [DialogRadius.None, DialogRadius.Small, 'default', DialogRadius.Medium, DialogRadius.Large]

const meta: Meta<typeof DialogComponent> = {
    title: "Components/Dialog",
    component: DialogComponent,
    tags: ['autodocs'],
    argTypes: {
        radius: {
            options: radius,
            control: {type: 'select'},
        },
        modal: {
            description: "The modality of the dialog. When set to true, interaction with outside elements will be disabled and only dialog content will be visible to screen readers.",
            control: {type: "boolean"},
            type: "boolean",
        },
        onClose: hideInTable,
        children: hideInTable,
        closeIcon: hideInTable,
        closeIconProps: hideInTable,
        className: hideInTable,
        description: hideInTable,
        overlayClassName: hideInTable,
        childrenClassName: hideInTable,
    },
};

export default meta;

type Story = StoryObj<typeof DialogComponent>;

export const Dialog = (props: DialogProps & { label?: string }) => {
    const [open, setOpen] = useState(false);
    const {label = 'Open Dialog', ...other} = props
    return (
        <div>
            <Button onClick={() => setOpen(true)}>{label}</Button>
            <DialogComponent open={open} onOpenChange={setOpen} {...other}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    gap: '30px'
                }}>
                    <Header
                        title='Volume Up Plus'
                        subtitle="Adjust the current tab's volume with the slider. Switch to any audio tab in one click."
                        before='❤️'
                    />
                    <Button onClick={() => setOpen(false)}>Close Dialog</Button>
                </div>
            </DialogComponent>
        </div>
    );
};

export const Radius = () => {
    return (
        <div className='grid-wrapper' style={{gridTemplateColumns: 'repeat(5, auto)'}}>
            {radius.map((radius) => (
                <div key={radius} className='item-card'>
                    <Dialog
                        radius={radius !== 'default' ? radius : undefined}
                        fullscreen={false}
                        label={`${capitalizeFirstLetter(radius)} radius`}
                    />
                </div>
            ))}
        </div>
    );
};