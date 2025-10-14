### SvgSprite

The SvgSprite component renders an invisible SVG sprite (`<svg><defs><symbol/></defs></svg>`) that is used by the Icon component via `<use href="#name" />`. In typical usage you don’t need to mount it manually: the UIProvider renders it for you through the internal IconsProvider.

#### Import and basic usage

```tsx
import React from "react";
import {UIProvider, Icon} from "addon-ui";

// Import your SVGs as React components (depending on your bundler's setup)
import CloseIcon from "./icons/close.svg?react";
import MenuIcon from "./icons/menu.svg?react";
import StarIcon from "./icons/star.svg?react";

export function Example() {
    return (
        <UIProvider
            // Provide icons mapping; UIProvider mounts the SvgSprite internally
            icons={{
                close: CloseIcon,
                menu: MenuIcon,
                star: StarIcon,
            }}
        >
            {/* Using Icon will lazily register needed symbols in the sprite */}
            <div style={{display: "flex", gap: 12, alignItems: "center"}}>
                <Icon name="close" />
                <Icon name="menu" />
                <Icon name="star" />
            </div>
        </UIProvider>
    );
}
```

If you must mount the sprite manually (advanced/edge cases), you can render SvgSprite with your icon map yourself. Note that the library Icon component expects icons from the provider context, so manual mounting is mainly for custom `<svg><use/>` workflows.

```tsx
import React from "react";
import {SvgSprite} from "addon-ui";
import CloseIcon from "./icons/close.svg?react";

const icons = {close: CloseIcon};

export function ManualSprite() {
    return (
        <>
            {/* Mount once near the root */}
            <SvgSprite icons={icons} />
            {/* Your app ... */}
        </>
    );
}
```

#### Props

Only the prop name, type, and default are listed below.

| Prop    | Type                                                    | Default |
| ------- | ------------------------------------------------------- | ------- |
| `icons` | `Record<string, React.FC<React.ComponentProps<'svg'>>>` | —       |

Notes:

- With UIProvider, you don’t pass `icons` to SvgSprite directly; provide them via the `icons` field in config/provider.
- Icons are lazily registered: a symbol is added only after an Icon with that `name` is rendered at least once.

### Theming and global configuration

Register icons via theme/config or directly via UIProvider.

```ts
// ui.config.ts
import {defineConfig} from "addon-ui/config";

// import SVGs as React components
import CloseIcon from "./icons/close.svg?react";
import MenuIcon from "./icons/menu.svg?react";
import StarIcon from "./icons/star.svg?react";

export default defineConfig({
    components: {
        // No component defaults needed for SvgSprite
    },
    icons: {
        close: CloseIcon,
        menu: MenuIcon,
        star: StarIcon,
    },
});
```

Or at runtime with the provider:

```tsx
import {UIProvider} from "addon-ui";
import CloseIcon from "./icons/close.svg?react";

<UIProvider icons={{close: CloseIcon}}>{/* ... */}</UIProvider>;
```

### Accessibility (A11y)

- SvgSprite renders an `<svg>` with `display: none` and `aria-hidden="true"`; it has no interactive semantics.
- Provide accessible names on actual Icon usage (e.g., `aria-label`, surrounding label, or `<title>` where appropriate).
- Ensure color contrast for rendered icons where they convey meaning.
