import React, {useState} from "react";
import {Meta} from "@storybook/react";

import {hideInTable} from "../../utils";

import {Header, Footer, Button, ScrollArea, IconButton, IconButtonVariant, IconButtonSize} from "../index";

import {LayoutProvider, useLayout} from "./index";

const meta: Meta<typeof LayoutProvider> = {
    title: "Components/Layout",
    component: LayoutProvider,
    tags: ["autodocs"],
    argTypes: {
        children: hideInTable,
    },
};

export default meta;

export const Layout = () => {
    return (
        <LayoutProvider>
            <App />
        </LayoutProvider>
    );
};

const App = () => {
    const [arr, setArr] = useState(Array.from(Array(5)));
    const {expand, collapse} = useLayout();

    return (
        <div
            style={{
                background: "var(--bg-secondary-color)",
                flex: 1,
                display: "flex",
                flexDirection: "column",
                borderRadius: "10px",
                overflow: "hidden",
            }}
        >
            <Header title={"Layout"} />
            <div style={{display: "flex", justifyContent: "space-evenly", alignItems: "center", padding: "5px 10px"}}>
                <IconButton
                    size={IconButtonSize.Medium}
                    variant={IconButtonVariant.Contained}
                    onClick={() => setArr([...arr, "item"])}
                >
                    ➕
                </IconButton>
                <Button onClick={() => expand()}>Expand</Button>
                <Button onClick={() => collapse()}>Collapse</Button>

                <IconButton
                    size={IconButtonSize.Medium}
                    variant={IconButtonVariant.Contained}
                    onClick={() => setArr(arr.slice(0, -1))}
                >
                    ➖
                </IconButton>
            </div>
            <div style={{display: "flex", justifyContent: "space-evenly", padding: "5px 10px"}}>
                <Button onClick={() => expand({height: 700})}>700px height</Button>
                <Button onClick={() => expand({height: 700, width: 500})}>700x500px</Button>
                <Button onClick={() => expand({width: 500})}>500px width</Button>
            </div>
            <ScrollArea
                xOffset={10}
                type="always"
                style={{flex: 1, display: "flex", flexDirection: "column", overflow: "hidden"}}
            >
                <div style={{flex: 1}}>
                    {arr.map((_, index) => (
                        <div
                            key={index}
                            style={{padding: "10px 20px", textAlign: "center", color: "var(--text-secondary-color)"}}
                        >
                            Item {++index}
                        </div>
                    ))}
                </div>
            </ScrollArea>
            <Footer left="❤️" right="⭐" shadow style={{paddingTop: "10px"}} />
        </div>
    );
};
