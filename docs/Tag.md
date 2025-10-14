### Tag

The Tag component displays a small labeled badge with style variants, theme colors, sizes, and corner radii. It supports theming via CSS variables and default props via `UIProvider`/`ui.config.ts`.

#### Import and basic usage

```tsx
import React from "react";
import {Tag, TagVariant, TagColor, TagSize, TagRadius} from "addon-ui";

export function Example() {
    return (
        <div style={{display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap"}}>
            {/* Basic */}
            <Tag>Default</Tag>

            {/* Variants */}
            <Tag variant={TagVariant.Contained}>Contained</Tag>
            <Tag variant={TagVariant.Outlined}>Outlined</Tag>
            <Tag variant={TagVariant.Soft}>Soft</Tag>

            {/* Colors */}
            <Tag color={TagColor.Primary}>Primary</Tag>
            <Tag color={TagColor.Secondary}>Secondary</Tag>
            <Tag color={TagColor.Accent}>Accent</Tag>

            {/* Sizes */}
            <Tag size={TagSize.Small}>Small</Tag>
            <Tag size={TagSize.Medium}>Medium</Tag>
            <Tag size={TagSize.Large}>Large</Tag>

            {/* Radii */}
            <Tag radius={TagRadius.Small}>Radius sm</Tag>
            <Tag radius={TagRadius.Medium}>Radius md</Tag>
            <Tag radius={TagRadius.Large}>Radius lg</Tag>

            {/* Clickable (applies active scale on press) */}
            <Tag clickable>Clickable</Tag>

            {/* Mixed */}
            <Tag variant={TagVariant.Outlined} color={TagColor.Primary} size={TagSize.Medium} radius={TagRadius.Medium}>
                Mixed
            </Tag>
        </div>
    );
}
```

#### Props

Only the prop name, type, and default are listed below.

| Prop            | Type                                                         | Default       |
| --------------- | ------------------------------------------------------------ | ------------- |
| `variant`       | `'contained' \| 'outlined' \| 'soft'`                        | `'contained'` |
| `color`         | `'primary' \| 'secondary' \| 'accent'`                       | —             |
| `size`          | `'small' \| 'medium' \| 'large'`                             | —             |
| `radius`        | `'small' \| 'medium' \| 'large'`                             | —             |
| `clickable`     | `boolean`                                                    | —             |
| HTML span attrs | all standard `span` attributes (e.g., `className`, `aria-*`) | —             |

Note: Defaults may also be provided globally via theme/config (`UIProvider`, `ui.config.ts`). Local props take precedence over global config.

#### Variants, colors, sizes, radii (enums)

```ts
// Variants
TagVariant.Contained;
TagVariant.Outlined;
TagVariant.Soft;

// Colors
TagColor.Primary;
TagColor.Secondary;
TagColor.Accent;

// Sizes
TagSize.Small;
TagSize.Medium;
TagSize.Large;

// Radius
TagRadius.Small;
TagRadius.Medium;
TagRadius.Large;
```

### CSS variables for Tag

Only variables actually referenced in `src/components/Tag/tag.module.scss` are listed, with their exact fallback chains. If a variable has no explicit fallback in the stylesheet, it is marked as “none (define in theme)”.

| Variable                                | Fallback chain                                                                             |
| --------------------------------------- | ------------------------------------------------------------------------------------------ |
| `--tag-font-size`                       | `var(--tag-font-size, 13px)`                                                               |
| `--tag-font-weight`                     | `var(--tag-font-weight, 500)`                                                              |
| `--tag-line-height`                     | `var(--tag-line-height, var(--line-height, 1 rem))`                                        |
| `--line-height`                         | `var(--line-height)` (none)                                                                |
| `--tag-letter-spacing`                  | `var(--tag-letter-spacing, 0.5px)`                                                         |
| `--tag-padding`                         | `var(--tag-padding, 4px 8px)`                                                              |
| `--tag-border-radius`                   | `var(--tag-border-radius, 999px)`                                                          |
| `--tag-color`                           | `var(--tag-color, var(--text-secondary-color))`                                            |
| `--text-secondary-color`                | `var(--text-secondary-color)` (none)                                                       |
| `--tag-bg-color`                        | `var(--tag-bg-color, var(--bg-secondary-color))`                                           |
| `--bg-secondary-color`                  | `var(--bg-secondary-color)` (none)                                                         |
| `--tag-scale`                           | `var(--tag-scale, 0.98)`                                                                   |
| `--tag-contained-color`                 | `var(--tag-contained-color, var(--tag-color, var(--text-secondary-color)))`                |
| `--tag-contained-bg-color`              | `var(--tag-contained-bg-color, var(--tag-bg-color, var(--bg-secondary-color)))`            |
| `--tag-contained-primary-color`         | `var(--tag-contained-primary-color, #fff)`                                                 |
| `--tag-contained-secondary-color`       | `var(--tag-contained-secondary-color, #fff)`                                               |
| `--tag-contained-accent-color`          | `var(--tag-contained-accent-color, #fff)`                                                  |
| `--tag-outlined-color`                  | `var(--tag-outlined-color, var(--tag-color, var(--text-secondary-color)))`                 |
| `--tag-border-width`                    | `var(--tag-border-width, 1px)`                                                             |
| `--tag-outlined-border-color`           | `var(--tag-outlined-border-color, var(--tag-outlined-color, var(--text-secondary-color)))` |
| `--tag-outlined-border-primary-color`   | `var(--tag-outlined-border-primary-color, var(--primary-color))`                           |
| `--primary-color`                       | `var(--primary-color)` (none)                                                              |
| `--tag-outlined-border-secondary-color` | `var(--tag-outlined-border-secondary-color, var(--secondary-color))`                       |
| `--secondary-color`                     | `var(--secondary-color)` (none)                                                            |
| `--tag-outlined-border-accent-color`    | `var(--tag-outlined-border-accent-color, var(--accent-color))`                             |
| `--accent-color`                        | `var(--accent-color)` (none)                                                               |
| `--tag-soft-color`                      | `var(--tag-soft-color, var(--tag-color, var(--text-secondary-color)))`                     |
| `--tag-soft-primary-color`              | `var(--tag-soft-primary-color, #fff)`                                                      |
| `--tag-soft-secondary-color`            | `var(--tag-soft-secondary-color, #fff)`                                                    |
| `--tag-soft-accent-color`               | `var(--tag-soft-accent-color, #fff)`                                                       |
| `--tag-font-size-sm`                    | Contextual defaults: `12px` (small), `14px` (medium), `16px` (large)                       |
| `--tag-border-radius-sm`                | `var(--tag-border-radius-sm, 5px)`                                                         |
| `--tag-border-radius-md`                | `var(--tag-border-radius-md, 8px)`                                                         |
| `--tag-border-radius-lg`                | `var(--tag-border-radius-lg, 10px)`                                                        |

Notes:

- In size modifiers, `padding` reuses the same `--tag-padding` variable with contextual defaults: `3px 6px` (small), `5px 10px` (medium), `6px 12px` (large). Defining `--tag-padding` once will override padding across all sizes.
- For color modifiers, backgrounds may use theme tokens directly (e.g., `--primary-color`, `--secondary-color`, `--accent-color`) and color-mix for the `soft` variant. These are not fallbacks but direct usages when a color modifier class is present.

### Theming and global configuration

You can provide Tag defaults via theme/config:

```ts
// ui.config.ts
import {defineConfig} from "addon-ui/config";
import {TagVariant, TagColor, TagSize, TagRadius} from "addon-ui";

export default defineConfig({
    components: {
        tag: {
            variant: TagVariant.Contained,
            color: TagColor.Primary,
            size: TagSize.Medium,
            radius: TagRadius.Medium,
            clickable: false,
        },
    },
});
```

Or at runtime with the provider:

```tsx
import {UIProvider} from "addon-ui";

<UIProvider
    components={{
        tag: {
            variant: "outlined",
            color: "secondary",
            size: "large",
            radius: "large",
            clickable: true,
        },
    }}
>
    {/* ... */}
</UIProvider>;
```

### Accessibility (A11y)

- Tag renders a non-interactive `<span>` by default. If you need interactive behavior (e.g., removable chips), wrap it in or replace with an appropriate interactive element (button/link) and ensure it is keyboard accessible.
- Provide sufficient color contrast for text and background, especially for `soft` and `contained` variants.
- If the Tag conveys status or category that is important for assistive technologies, include screen-reader text or ARIA attributes in the surrounding context.
