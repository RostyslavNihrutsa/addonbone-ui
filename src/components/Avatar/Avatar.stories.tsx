import type {Meta, StoryObj} from "@storybook/react";
import {Avatar as AvatarComponent, AvatarRadius, AvatarSize} from "./index";

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
        fallbackClassName: hideInTable,
        imageClassName: hideInTable,
        children: hideInTable
    },

};

export default meta;

type Story = StoryObj<typeof AvatarComponent>;

export const Avatar: Story = {
    args: {
        src: "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80",
        fallback: 'CT',
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
                        fallback='CT'
                    />
                </div>
            ))}
        </div>
    );
};

export const Size = () => {
    return (
        <div className='grid-wrapper' style={{gridTemplateColumns: 'repeat(4, auto)'}}>
            {sizes.map((size) => (
                <div key={size} className='item-card'>
                    <span className='item-card__title'>{capitalizeFirstLetter(size)}</span>
                    <AvatarComponent
                        src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
                        size={size !== 'default' ? size : undefined}
                        fallback='CT'
                    />
                </div>
            ))}
        </div>
    );
};

export const SizeWithSVG = () => {
    return (
        <div className='grid-wrapper' style={{gridTemplateColumns: 'repeat(4, auto)'}}>
            {sizes.map((size) => (
                <div key={size} className='item-card'>
                    <span className='item-card__title'>{capitalizeFirstLetter(size)}</span>
                    <AvatarComponent
                        src="https://freesvg.org/img/Female-Avatar-5.png"
                        size={size !== 'default' ? size : undefined}
                        fallback='CT'
                    />
                </div>
            ))}
        </div>
    );
};

export const SizeWithFallback = () => {
    return (
        <div className='grid-wrapper' style={{gridTemplateColumns: 'repeat(4, auto)'}}>
            {sizes.map((size) => (
                <div key={size} className='item-card'>
                    <span className='item-card__title'>{capitalizeFirstLetter(size)}</span>
                    <AvatarComponent
                        src=""
                        size={size !== 'default' ? size : undefined}
                        fallback='CT'
                    />
                </div>
            ))}
        </div>
    );
};

export const SizeRadius = () => {
    return (
        <div className='grid-wrapper' style={{gridTemplateColumns: 'repeat(4, auto)'}}>
            {sizes.map((size) => (
                radius.map((radius) => (
                    <div key={`${radius}-${size}`} className='item-card'>
                        <AvatarComponent
                            src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
                            radius={radius !== 'default' ? radius : undefined}
                            size={size !== 'default' ? size : undefined}
                        />
                    </div>
                ))
            ))}
        </div>
    );
};