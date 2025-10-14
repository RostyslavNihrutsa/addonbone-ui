### Footer

The Footer component provides a flexible, themable page footer. You can render left/right areas via props or pass custom children for full control. It supports RTL layouts, optional shadow, and default props via UIProvider/ui.config.ts.

#### Import and basic usage

```tsx
import React from "react";
import {Footer, Button} from "addon-ui";

export function Example() {
    return (
        <>
            {/* Using children (spaced with justify-content: space-between) */}
            <Footer>
                <div>© 2025 My Company</div>
                <div style={{display: "flex", gap: 12}}>
                    <Button>Privacy</Button>
                    <Button>Terms</Button>
                </div>
            </Footer>

            {/* Using left/right props */}
            <Footer left={<span>Made with ❤️</span>} right={<Button>Settings</Button>} shadow />

            {/* Reversed order */}
            <Footer reverse left={<span>Left becomes right</span>} right={<span>Right becomes left</span>} />
        </>
    );
}
```

#### Props

Only the prop name, type, and default are listed below.

| Prop                | Type                             | Default |
| ------------------- | -------------------------------- | ------- |
| `left`              | `ReactNode`                      | —       |
| `right`             | `ReactNode`                      | —       |
| `shadow`            | `boolean`                        | `false` |
| `reverse`           | `boolean`                        | `false` |
| `leftClassName`     | `string`                         | —       |
| `rightClassName`    | `string`                         | —       |
| `childrenClassName` | `string`                         | —       |
| HTML footer attrs   | all standard `footer` attributes | —       |

Note: Defaults may also be provided globally via theme/config (`UIProvider`, `ui.config.ts`). Local props take precedence over global config.

### CSS variables for Footer

Only variables actually referenced in `src/components/Footer/footer.module.scss` are listed, with their exact fallback chains. If a variable has no explicit fallback in the stylesheet, it is marked as “none (define in theme)”.

| Variable              | Fallback chain                                                   |
| --------------------- | ---------------------------------------------------------------- |
| `--footer-padding`    | `var(--footer-padding, var(--side-padding-sm))`                  |
| `--footer-bg-color`   | `var(--footer-bg-color, transparent)`                            |
| `--footer-box-shadow` | `var(--footer-box-shadow, 0px -4px 4px 0px rgba(0, 0, 0, 0.03))` |
| `--footer-left-gap`   | `var(--footer-left-gap, var(--footer-gap, 15px))`                |
| `--footer-right-gap`  | `var(--footer-right-gap, var(--footer-gap, 15px))`               |
| `--footer-gap`        | `var(--footer-gap, 15px)`                                        |

Notes:

- RTL is supported via `[dir="rtl"]` selectors in styles; setting `reverse` also flips layout.

### Theming and global configuration

You can provide Footer defaults via theme/config:

```ts
// ui.config.ts
import {defineConfig} from "addon-ui/config";

export default defineConfig({
    components: {
        footer: {
            shadow: true,
            // reverse: false,
            // You can also predefine left/right content if desired
            // left: "© 2025 My Company",
            // right: "All rights reserved",
        },
    },
});
```

Or at runtime with the provider:

```tsx
import {UIProvider} from "addon-ui";

<UIProvider
    components={{
        footer: {
            shadow: true,
        },
    }}
>
    {/* ... */}
</UIProvider>;
```

### Accessibility (A11y)

- Footer renders a semantic `<footer>` landmark; this helps screen reader users navigate.
- If your page has multiple footers, add an `aria-label` or `aria-labelledby` to distinguish them.
- Ensure links and interactive elements within the footer are keyboard accessible and meet contrast requirements.
