### Icon

The Icon component renders a vector icon from the library’s SVG sprite by name. It supports default props via `UIProvider`/`ui.config.ts` and theming via CSS variables.

#### Import and basic usage

```tsx
import React from "react";
import {Icon, SvgSprite} from "addon-ui";

export function Example() {
    return (
        <>
            {/* Render the sprite once in your app, typically near the root */}
            <SvgSprite />

            {/* Basic */}
            <Icon name="close" />

            {/* Size (width/height default to `size`) */}
            <Icon name="menu" size={28} />

            {/* Custom width/height (overrides size-derived values) */}
            <Icon name="star" width={20} height={16} />

            {/* Styling color via CSS (uses currentColor) */}
            <Icon name="heart" size={24} style={{color: "#e91e63"}} />
        </>
    );
}
```

#### Props

Only the prop name, type, and default are listed below.

| Prop              | Type                   | Default |
| ----------------- | ---------------------- | ------- |
| `name`            | `string`               | —       |
| `size`            | `number`               | `24`    |
| `width`           | `number`               | `size`  |
| `height`          | `number`               | `size`  |
| SVG `<svg>` attrs | all standard SVG props | —       |

Notes:

- `width` and `height` default to the value of `size` unless provided explicitly.
- When an icon `name` is not found in the sprite, a fallback square with a placeholder symbol is rendered and a warning is logged in the console.

### CSS variables for Icon

Only variables actually referenced in `src/components/Icon/icon.module.scss` are listed, with their exact fallback chains. If a variable has no explicit fallback in the stylesheet, it is marked as “none (define in theme)”.

| Variable                | Fallback chain                      |
| ----------------------- | ----------------------------------- |
| `--icon-color`          | `var(--icon-color)` (none)          |
| `--transition-speed-sm` | `var(--transition-speed-sm)` (none) |
| `--icon-color-hover`    | `var(--icon-color-hover)` (none)    |
| `--icon-scale`          | `var(--icon-scale, 1)`              |

### Theming and global configuration

Provide Icon defaults and register icons via theme/config:

```ts
// ui.config.ts
import {defineConfig} from "addon-ui/config";

// import SVGs as React components (via your bundler's ?react or svgr setup)
import CloseIcon from "./icons/close.svg?react";
import MenuIcon from "./icons/menu.svg?react";
import StarIcon from "./icons/star.svg?react";

export default defineConfig({
    components: {
        icon: {
            size: 24,
            // You can also predefine common SVG props here (except name), e.g.:
            // role: "img",
            // focusable: false,
        },
    },
    icons: {
        close: CloseIcon,
        menu: MenuIcon,
        star: StarIcon,
        // ... more icons
    },
});
```

Or at runtime with the provider:

```tsx
import {UIProvider} from "addon-ui";
import CloseIcon from "./icons/close.svg?react";

<UIProvider
    components={{
        icon: {
            size: 20,
        },
    }}
    icons={{
        close: CloseIcon,
    }}
>
    {/* ... */}
</UIProvider>;
```

### Accessibility (A11y)

- Prefer providing an accessible name using one of:
    - `aria-label` directly on the Icon
    - a `<title>` element (e.g., via `children` inside Icon if you customize) or surrounding label
- Mark purely decorative icons as `aria-hidden="true"`.
- Icons inherit `color` from CSS. Ensure sufficient contrast for meaningful icons.
