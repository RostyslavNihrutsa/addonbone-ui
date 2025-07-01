import {useState} from "react";
import type {Meta, StoryObj} from "@storybook/react";
import ModalComponent, {ModalProps, ModalRadius} from "./Modal";
import {Button} from "../Button";
import {Header} from "../Header";
import {capitalizeFirstLetter, hideInTable} from "../../utils";

const radius: (ModalRadius | "default")[] = [
    ModalRadius.None,
    ModalRadius.Small,
    "default",
    ModalRadius.Medium,
    ModalRadius.Large,
];

const meta: Meta<typeof ModalComponent> = {
    title: "Components/Modal",
    component: ModalComponent,
    tags: ["autodocs"],
    argTypes: {
        radius: {
            options: radius,
            control: {type: "select"},
        },
        modal: {
            description:
                "The modality of the dialog. When set to true, interaction with outside elements will be disabled and only dialog content will be visible to screen readers.",
            control: {type: "boolean"},
            type: "boolean",
        },
        closeButton: {
            options: [true, false, {children: "❌"}],
            control: {type: "select"},
        },
        speed: {
            type: "number",
        },
        onClose: hideInTable,
        children: hideInTable,
        className: hideInTable,
        description: hideInTable,
        overlayClassName: hideInTable,
        childrenClassName: hideInTable,
    },
};

export default meta;

type Story = StoryObj<typeof ModalComponent>;

export const Modal = (props: ModalProps & {label?: string}) => {
    const [open, setOpen] = useState(false);
    const {label = "Open Modal", ...other} = props;
    return (
        <div>
            <Button onClick={() => setOpen(true)}>{label}</Button>
            <ModalComponent open={open} onOpenChange={setOpen} {...other}>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                        gap: "30px",
                    }}
                >
                    <Header
                        title="Volume Up Plus"
                        subtitle="Adjust the current tab's volume with the slider. Switch to any audio tab in one click."
                        before="❤️"
                    />
                    <Button style={{margin: "50px auto", maxWidth: "max-content"}} onClick={() => setOpen(false)}>
                        Close Modal
                    </Button>
                </div>
            </ModalComponent>
        </div>
    );
};

export const Radius = () => {
    return (
        <div className="grid-wrapper" style={{gridTemplateColumns: "repeat(5, auto)"}}>
            {radius.map(radius => (
                <div key={radius} className="item-card">
                    <Modal
                        radius={radius !== "default" ? radius : undefined}
                        fullscreen={false}
                        label={`${capitalizeFirstLetter(radius)} radius`}
                    />
                </div>
            ))}
        </div>
    );
};
