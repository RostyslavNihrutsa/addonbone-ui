### Avatar

The Avatar component displays a user image with optional fallback content. It supports sizes and corner radii variants, theming via CSS variables, and default props via `UIProvider`/`ui.config.ts`.

#### Import and basic usage

```tsx
import React from "react";
import {Avatar, AvatarSize, AvatarRadius} from "addon-ui";

export function Example() {
    return (
        <>
            <Avatar src="https://example.com/avatar.jpg" alt="User avatar" />

            <Avatar
                src=""
                alt="Fallback initials"
                size={AvatarSize.Medium}
                radius={AvatarRadius.Medium}
                fallback="JD"
            />

            <Avatar
                src="https://example.com/avatar2.jpg"
                alt="Clickable avatar"
                size={AvatarSize.Large}
                radius={AvatarRadius.Small}
                cursorPointer
            />
        </>
    );
}
```

#### Props

Only the prop name, type, and default are listed below.

| Prop                | Type                             | Default |
| ------------------- | -------------------------------- | ------- |
| `size`              | `'small' \| 'medium' \| 'large'` | —       |
| `radius`            | `'small' \| 'medium' \| 'large'` | —       |
| `fallback`          | `ReactNode`                      | —       |
| `fallbackClassName` | `string`                         | —       |
| `imageClassName`    | `string`                         | —       |
| `cursorPointer`     | `boolean`                        | —       |
| `delayMs`           | `number`                         | `600`   |
| HTML img attrs      | all standard `img` attributes    | —       |

Note: Defaults may also be provided globally via theme/config (`UIProvider`, `ui.config.ts`). Local props take precedence over global config.

#### Radix UI props

This component wraps Radix UI Avatar pieces under the hood. You can use relevant Radix props in addition to the props above.

Commonly used Radix Avatar props:

- Image: `src`, `srcSet`, `alt`, `referrerPolicy`, `onLoadingStatusChange`
- Fallback: `delayMs` (already exposed as `delayMs` in this component)

For the complete list, see Radix UI Avatar documentation:
https://www.radix-ui.com/primitives/docs/components/avatar

#### Sizes and radii (enums)

```ts
// Sizes
AvatarSize.Small;
AvatarSize.Medium;
AvatarSize.Large;

// Radius
AvatarRadius.Small;
AvatarRadius.Medium;
AvatarRadius.Large;
```

### CSS variables for Avatar

Only variables actually referenced in `src/components/Avatar/avatar.module.scss` are listed, with their exact fallback chains. If a variable has no explicit fallback in the stylesheet, it is marked as “none (define in theme)”.

| Variable                         | Fallback chain                                                    |
| -------------------------------- | ----------------------------------------------------------------- |
| `--avatar-size`                  | `var(--avatar-size, 45px)`                                        |
| `--avatar-bg-color`              | `var(--avatar-bg-color, transparent)`                             |
| `--avatar-border-radius`         | `var(--avatar-border-radius, 100%)`                               |
| `--avatar-border-width`          | `var(--avatar-border-width)`                                      |
| `--avatar-border-color`          | `var(--avatar-border-color)`                                      |
| `--avatar-border-style`          | `var(--avatar-border-style)`                                      |
| `--avatar-font-size`             | `var(--avatar-font-size, 18px)`                                   |
| `--avatar-font-weight`           | `var(--avatar-font-weight, 500)`                                  |
| `--avatar-size-sm`               | `var(--avatar-size-sm, 35px)`                                     |
| `--avatar-font-size-sm`          | `var(--avatar-font-size-sm, 14px)`                                |
| `--avatar-size-md`               | `var(--avatar-size-md, 55px)`                                     |
| `--avatar-font-size-md`          | `var(--avatar-font-size-md, 22px)`                                |
| `--avatar-size-lg`               | `var(--avatar-size-lg, 65px)`                                     |
| `--avatar-font-size-lg`          | `var(--avatar-font-size-lg, 26px)`                                |
| `--avatar-border-radius-sm`      | `var(--avatar-border-radius-sm, 20%)`                             |
| `--avatar-border-radius-md`      | `var(--avatar-border-radius-md, 30%)`                             |
| `--avatar-border-radius-lg`      | `var(--avatar-border-radius-lg, 40%)`                             |
| `--avatar-fallback-color`        | `var(--avatar-fallback-color)`                                    |
| `--fallback-line-height`         | `var(--fallback-line-height, var(--line-height, 1 rem))`          |
| `--avatar-fallback-bg-color`     | `var(--avatar-fallback-bg-color, var(--avatar-bg-color))`         |
| `--avatar-fallback-border-width` | `var(--avatar-fallback-border-width, var(--avatar-border-width))` |
| `--avatar-fallback-border-color` | `var(--avatar-fallback-border-color, var(--avatar-border-color))` |
| `--avatar-fallback-border-style` | `var(--avatar-fallback-border-style, var(--avatar-border-style))` |

Notes:

- The `line-height` inside fallback uses a nested chain: `var(--fallback-line-height, var(--line-height, 1 rem))`.
- The fallback-specific variables default to their base counterparts (e.g., `--avatar-fallback-bg-color` → `--avatar-bg-color`).

### Theming and global configuration

You can provide Avatar defaults via theme/config:

```ts
// ui.config.ts
import {defineConfig} from "addon-ui/config";
import {AvatarRadius, AvatarSize} from "addon-ui";

export default defineConfig({
    components: {
        avatar: {
            size: AvatarSize.Medium,
            radius: AvatarRadius.Medium,
            cursorPointer: true,
            delayMs: 600,
        },
    },
});
```

Or at runtime with the provider:

```tsx
import {UIProvider} from "addon-ui";

<UIProvider
    components={{
        avatar: {
            size: "medium",
            radius: "small",
            cursorPointer: true,
            delayMs: 500,
        },
    }}
>
    {/* ... */}
</UIProvider>;
```

### Accessibility (A11y)

- Provide meaningful `alt` text for the image for screen readers.
- When using a fallback (e.g., initials), ensure it conveys enough context.
- Avatar is not interactive by default; if you make it clickable (e.g., `cursorPointer`), ensure it is wrapped in an interactive element (button/link) with proper accessibility attributes.
