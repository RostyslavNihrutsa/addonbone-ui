import {useState} from "react";
import type {Meta, StoryObj} from "@storybook/react";
import DrawerComponent, {DrawerProps, DrawerSide} from "./Drawer";
import {Button} from "../Button";
import {List} from "../List";
import {ListItem} from "../ListItem";

import {capitalizeFirstLetter, hideInTable} from "../../utils";

const sides: DrawerSide[] = [DrawerSide.Left, DrawerSide.Top, DrawerSide.Bottom, DrawerSide.Right,]
const items = [
    {title: 'Profile', icon: '👤'},
    {title: 'Messages', icon: '✉️'},
    {title: 'Notifications', icon: '🔔'},
    {title: 'Setting', icon: '⚙️'},
    {title: 'Help', icon: '❓'},
    {title: 'Logout', icon: '🚪'}
];

const meta: Meta<typeof DrawerComponent> = {
    title: "Components/Drawer",
    component: DrawerComponent,
    tags: ['autodocs'],
    argTypes: {
        side: {
            options: sides,
            control: {type: 'select'},
        },
        modal: {
            description: "The modality of the dialog. When set to true, interaction with outside elements will be disabled and only dialog content will be visible to screen readers.",
            control: {type: "boolean"},
            type: "boolean",
        },
        className: hideInTable,
        description: hideInTable,
        overlayClassName: hideInTable,
        childrenClassName: hideInTable,
    },
};

export default meta;

type Story = StoryObj<typeof DrawerComponent>;

export const Drawer = (props: DrawerProps & { label?: string }) => {
    const [open, setOpen] = useState(false);
    const {label = 'Open Drawer', ...other} = props
    return (
        <div>
            <Button onClick={() => setOpen(true)}>{label}</Button>
            <DrawerComponent open={open} onOpenChange={setOpen} {...other}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%',
                    gap: '30px'
                }}>
                    <List style={{display: 'flex', flexDirection: 'column', gap: '15px', overflow: 'auto'}}>
                        {items.map(({icon, title}) => (
                            <ListItem left={icon} primary={title}/>
                        ))}
                    </List>
                    <Button onClick={() => setOpen(false)} style={{width: 'auto'}}>Close</Button>
                </div>
            </DrawerComponent>
        </div>
    );
};

export const Side = () => {
    return (
        <div className='grid-wrapper' style={{gridTemplateColumns: 'repeat(4, auto)'}}>
            {sides.map((side) => (
                <div key={side} className='item-card'>
                    <Drawer
                        side={side}
                        label={`${capitalizeFirstLetter(side)} side`}
                    />
                </div>
            ))}
        </div>
    );
};