import type {Meta, StoryObj} from "@storybook/react";
import {Avatar as AvatarComponent, AvatarFallback, AvatarRadius, AvatarSize} from "./index";

import {capitalizeFirstLetter, hideInTable} from "../../utils";

const sizes: (AvatarSize | 'default')[] = [AvatarSize.Small, 'default', AvatarSize.Medium, AvatarSize.Large]
const radius: (AvatarRadius | 'default')[] = [AvatarRadius.Small, AvatarRadius.Medium, AvatarRadius.Large, 'default']

const meta: Meta<typeof AvatarComponent> = {
    title: "Components/Avatar",
    component: AvatarComponent,
    tags: ['autodocs'],
    argTypes: {
        size: {
            options: sizes,
            control: {type: 'select'},
        },
        radius: {
            options: radius,
            control: {type: 'select'},
        },
        imageClassname: hideInTable,
        children: hideInTable
    },

};

export default meta;

type Story = StoryObj<typeof AvatarComponent>;

export const Avatar: Story = {
    args: {
        src: "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80",
        children: <AvatarFallback>CT</AvatarFallback>,
    },
};

export const AvatarRadiusGrid = () => {
    return (
        <div className='grid-wrapper' style={{gridTemplateColumns: 'repeat(4, auto)'}}>
            {radius.map((radius) => (
                <div key={radius} className='item-card'>
                    <span className='item-card__title'>{capitalizeFirstLetter(radius)}</span>
                    <AvatarComponent
                        src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
                        radius={radius !== 'default' ? radius : undefined}
                    >
                        <AvatarFallback>CT</AvatarFallback>
                    </AvatarComponent>
                </div>
            ))
            }
        </div>
    );
};

export const AvatarSizeGrid = () => {
    return (
        <div className='grid-wrapper' style={{gridTemplateColumns: 'repeat(4, auto)'}}>
            {sizes.map((size) => (
                <div key={size} className='item-card'>
                    <span className='item-card__title'>{capitalizeFirstLetter(size)}</span>
                    <AvatarComponent
                        src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
                        size={size !== 'default' ? size : undefined}
                    >
                        <AvatarFallback>CT</AvatarFallback>
                    </AvatarComponent>
                </div>
            ))
            }
        </div>
    );
};

export const AvatarSizeSVGGrid = () => {
    return (
        <div className='grid-wrapper' style={{gridTemplateColumns: 'repeat(4, auto)'}}>
            {sizes.map((size) => (
                <div key={size} className='item-card'>
                    <span className='item-card__title'>{capitalizeFirstLetter(size)}</span>
                    <AvatarComponent
                        src="https://freesvg.org/img/Female-Avatar-5.png"
                        size={size !== 'default' ? size : undefined}

                    >
                        <AvatarFallback>CT</AvatarFallback>
                    </AvatarComponent>
                </div>
            ))
            }
        </div>
    );
};

export const AvatarSizeFallbackGrid = () => {
    return (
        <div className='grid-wrapper' style={{gridTemplateColumns: 'repeat(4, auto)'}}>
            {sizes.map((size) => (
                <div key={size} className='item-card'>
                    <span className='item-card__title'>{capitalizeFirstLetter(size)}</span>
                    <AvatarComponent
                        src=""
                        size={size !== 'default' ? size : undefined}
                    >
                        <AvatarFallback>CT</AvatarFallback>
                    </AvatarComponent>
                </div>
            ))
            }
        </div>
    );
};