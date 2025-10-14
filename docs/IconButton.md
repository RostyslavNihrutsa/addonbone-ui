### IconButton

The IconButton component renders a button optimized for icons. It wraps BaseButton, supports style variants, sizes, and corner radii, and can optionally show a Tooltip. Theming is available via CSS variables, and default props can be provided via UIProvider/ui.config.ts.

#### Import and basic usage

```tsx
import React from "react";
import {IconButton, Icon, IconButtonVariant, IconButtonSize, IconButtonRadius} from "addon-ui";

export function Example() {
    const [enabled, setEnabled] = React.useState(false);

    return (
        <div style={{display: "flex", gap: 12, alignItems: "center"}}>
            {/* Basic */}
            <IconButton aria-label="Close">
                <Icon name="close" />
            </IconButton>

            {/* With tooltip */}
            <IconButton aria-label="Menu" tooltip={{content: "Open menu"}}>
                <Icon name="menu" />
            </IconButton>

            {/* Variants */}
            <IconButton variant={IconButtonVariant.Contained} aria-label="Star">
                <Icon name="star" />
            </IconButton>
            <IconButton variant={IconButtonVariant.Outlined} aria-label="Heart">
                <Icon name="heart" />
            </IconButton>
            <IconButton variant={IconButtonVariant.Ghost} aria-label="More">
                <Icon name="more" />
            </IconButton>

            {/* Sizes */}
            <IconButton size={IconButtonSize.Small} aria-label="Small">
                <Icon name="close" />
            </IconButton>
            <IconButton size={IconButtonSize.Medium} aria-label="Medium">
                <Icon name="close" />
            </IconButton>
            <IconButton size={IconButtonSize.Large} aria-label="Large">
                <Icon name="close" />
            </IconButton>

            {/* Radii */}
            <IconButton radius={IconButtonRadius.Small} aria-label="Rounded sm">
                <Icon name="close" />
            </IconButton>
            <IconButton radius={IconButtonRadius.Medium} aria-label="Rounded md">
                <Icon name="close" />
            </IconButton>
            <IconButton radius={IconButtonRadius.Large} aria-label="Rounded lg">
                <Icon name="close" />
            </IconButton>

            {/* Example controlled state (just for demo) */}
            <IconButton
                aria-pressed={enabled}
                onClick={() => setEnabled(v => !v)}
                tooltip={{content: enabled ? "On" : "Off"}}
                aria-label="Toggle"
            >
                <Icon name="star" />
            </IconButton>
        </div>
    );
}
```

#### Props

Only the prop name, type, and default are listed below.

| Prop                | Type                                                                 | Default |
| ------------------- | -------------------------------------------------------------------- | ------- |
| `variant`           | `'contained' \| 'outlined' \| 'ghost'`                               | —       |
| `size`              | `'small' \| 'medium' \| 'large'`                                     | —       |
| `radius`            | `'small' \| 'medium' \| 'large'`                                     | —       |
| `tooltip`           | `Omit<TooltipProps, 'children'>`                                     | —       |
| `before`            | `ReactNode`                                                          | —       |
| `after`             | `ReactNode`                                                          | —       |
| `beforeClassName`   | `string`                                                             | —       |
| `afterClassName`    | `string`                                                             | —       |
| `childrenClassName` | `string`                                                             | —       |
| HTML button attrs   | all standard `button` attributes (e.g., `onClick`, `type`, `aria-*`) | —       |

Note: Defaults may also be provided globally via theme/config (`UIProvider`, `ui.config.ts`). Local props take precedence over global config.

#### Variants, sizes, radii (enums)

```ts
// Variants
IconButtonVariant.Contained;
IconButtonVariant.Outlined;
IconButtonVariant.Ghost;

// Sizes
IconButtonSize.Small;
IconButtonSize.Medium;
IconButtonSize.Large;

// Radius
IconButtonRadius.Small;
IconButtonRadius.Medium;
IconButtonRadius.Large;
```

### CSS variables for IconButton

Only variables actually referenced in `src/components/IconButton/icon-button.module.scss` are listed, with their exact fallback chains. If a variable has no explicit fallback in the stylesheet, it is marked as “none (define in theme)”.

| Variable                                 | Fallback chain                                                                   |
| ---------------------------------------- | -------------------------------------------------------------------------------- |
| `--icon-button-border-radius`            | `var(--icon-button-border-radius, 100%)`                                         |
| `--icon-button-padding`                  | `var(--icon-button-padding, 5px)`                                                |
| `--icon-button-size`                     | `var(--icon-button-size, 25px)`                                                  |
| `--icon-button-color`                    | `var(--icon-button-color)` (none)                                                |
| `--icon-button-color-hover`              | `var(--icon-button-color-hover)` (none)                                          |
| `--icon-button-scale`                    | `var(--icon-button-scale, 0.95)`                                                 |
| `--icon-button-disabled-opacity`         | `var(--icon-button-disabled-opacity, 0.75)`                                      |
| `--icon-button-contained-color`          | `var(--icon-button-contained-color, var(--icon-button-color))`                   |
| `--icon-button-contained-bg-color`       | `var(--icon-button-contained-bg-color, var(--icon-button-bg-color))`             |
| `--icon-button-bg-color`                 | `var(--icon-button-bg-color)` (none)                                             |
| `--icon-button-contained-color-hover`    | `var(--icon-button-contained-color-hover, var(--icon-button-color-hover))`       |
| `--icon-button-contained-bg-color-hover` | `var(--icon-button-contained-bg-color-hover, var(--icon-button-bg-color-hover))` |
| `--icon-button-bg-color-hover`           | `var(--icon-button-bg-color-hover)` (none)                                       |
| `--icon-button-outlined-color`           | `var(--icon-button-outlined-color, var(--icon-button-color))`                    |
| `--icon-button-border-width`             | `var(--icon-button-border-width, 1px)`                                           |
| `--icon-button-border-color`             | `var(--icon-button-border-color)` (none)                                         |
| `--icon-button-outlined-color-hover`     | `var(--icon-button-outlined-color-hover, var(--icon-button-color-hover))`        |
| `--icon-button-outlined-bg-color-hover`  | `var(--icon-button-outlined-bg-color-hover, var(--icon-button-bg-color-hover))`  |
| `--icon-button-ghost-color`              | `var(--icon-button-ghost-color, var(--icon-button-color))`                       |
| `--icon-button-ghost-color-hover`        | `var(--icon-button-ghost-color-hover, var(--icon-button-color-hover))`           |
| `--icon-button-ghost-bg-color-hover`     | `var(--icon-button-ghost-bg-color-hover, var(--icon-button-bg-color-hover))`     |
| `--icon-button-size-sm`                  | `var(--icon-button-size-sm, 20px)`                                               |
| `--icon-button-size-md`                  | `var(--icon-button-size-md, 35px)`                                               |
| `--icon-button-size-lg`                  | `var(--icon-button-size-lg, 45px)`                                               |
| `--icon-button-border-radius-sm`         | `var(--icon-button-border-radius-sm, 20%)`                                       |
| `--icon-button-border-radius-md`         | `var(--icon-button-border-radius-md, 30%)`                                       |
| `--icon-button-border-radius-lg`         | `var(--icon-button-border-radius-lg, 40%)`                                       |

### Theming and global configuration

You can provide IconButton defaults via theme/config:

```ts
// ui.config.ts
import {defineConfig} from "addon-ui/config";
import {IconButtonVariant, IconButtonSize, IconButtonRadius} from "addon-ui";

export default defineConfig({
    components: {
        iconButton: {
            variant: IconButtonVariant.Contained,
            size: IconButtonSize.Medium,
            radius: IconButtonRadius.Medium,
        },
    },
});
```

Or at runtime with the provider:

```tsx
import {UIProvider} from "addon-ui";

<UIProvider
    components={{
        iconButton: {
            variant: "outlined",
            size: "large",
            radius: "large",
        },
    }}
>
    {/* ... */}
</UIProvider>;
```

### Radix UI props

IconButton itself is not built on a Radix primitive; it renders a native `<button>` via BaseButton. If you pass the `tooltip` prop, it uses the library Tooltip component internally (based on Radix UI Tooltip). For common Radix Tooltip props, see:
https://www.radix-ui.com/primitives/docs/components/tooltip

### Accessibility (A11y)

- Provide an accessible name via `aria-label` when the button contains only an icon.
- Ensure focus styles are visible and that the button is reachable via keyboard.
- When using `tooltip`, do not rely solely on hover text to convey critical actions; tooltips aren’t always read by assistive tech.
