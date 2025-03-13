import type {Meta, StoryObj} from "@storybook/react";
import ButtonComponent, {ButtonColor, ButtonRadius, ButtonSize, ButtonVariant} from "./Button";
import {capitalizeFirstLetter, hideInTable} from "../../utils";

const variants: ButtonVariant[] = [ButtonVariant.Contained, ButtonVariant.Outlined, ButtonVariant.Text]
const colors: (ButtonColor | 'default') [] = ['default', ButtonColor.Primary, ButtonColor.Secondary, ButtonColor.Accent]
const sizes: (ButtonSize | 'default')[] = [ButtonSize.Small, 'default', ButtonSize.Medium, ButtonSize.Large]
const radii: (ButtonRadius | 'default')[] = [ButtonRadius.Small, 'default', ButtonRadius.Medium, ButtonRadius.Large, ButtonRadius.Full]

const meta: Meta<typeof ButtonComponent> = {
    title: "Components/Button",
    component: ButtonComponent,
    tags: ['autodocs'],
    argTypes: {
        variant: {
            options: variants,
            control: {type: 'select'},
        },
        color: {
            options: colors,
            control: {type: 'select'},
        },
        size: {
            options: sizes,
            control: {type: 'select'},
        },
        radius: {
            options: radii,
            control: {type: 'select'},
        },

        after: hideInTable,
        before: hideInTable,
        textClassName: hideInTable
    },
};

export default meta;
type Story = StoryObj<typeof ButtonComponent>;

export const Button: Story = {
    args: {
        children: "Button",
    }
};

export const VariantColorGrid = () => {
    return (
        <div className='grid-wrapper' style={{gridTemplateColumns: 'repeat(4, auto)'}}>
            {variants.map((variant) => (
                colors.map((color) => (
                    <div key={`${variant}-${color}`}>
                        <ButtonComponent variant={variant} color={color !== 'default' ? color : undefined}>
                            {capitalizeFirstLetter(color)}
                        </ButtonComponent>
                    </div>
                ))
            ))}
        </div>
    );
};

export const VariantColorDisabledGrid = () => {
    return (
        <div className='grid-wrapper' style={{gridTemplateColumns: 'repeat(4, auto)'}}>
            {variants.map((variant) => (
                colors.map((color) => (
                    <div key={`${variant}-${color}`}>
                        <ButtonComponent disabled variant={variant} color={color !== 'default' ? color : undefined}>
                            {capitalizeFirstLetter(color)}
                        </ButtonComponent>
                    </div>
                ))
            ))}
        </div>
    );
};

export const VariantSizeGrid = () => {
    return (
        <div className='grid-wrapper' style={{gridTemplateColumns: 'repeat(4, auto)'}}>
            {variants.map((variant) => (
                sizes.map((size) => (
                    <div key={`${variant}-${size}`}>
                        <ButtonComponent variant={variant} size={size !== 'default' ? size : undefined}>
                            {capitalizeFirstLetter(size)}
                        </ButtonComponent>
                    </div>
                ))
            ))}
        </div>
    );
};

export const VariantRadiusGrid = () => {
    return (
        <div className='grid-wrapper' style={{gridTemplateColumns: 'repeat(5, auto)'}}>
            {variants.map((variant) => (
                radii.map((radius) => (
                    <div key={`${variant}-${radius}`}>
                        <ButtonComponent variant={variant} radius={radius !== 'default' ? radius : undefined}>
                            {capitalizeFirstLetter(radius)}
                        </ButtonComponent>
                    </div>
                ))
            ))}
        </div>
    );
};


