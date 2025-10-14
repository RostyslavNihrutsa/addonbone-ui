### Highlight

The Highlight component marks matching words/phrases inside text. It wraps the react-highlight-words Highlighter and adds a color modifier and themed styles via CSS variables. Defaults can be provided via `UIProvider`/`ui.config.ts`.

#### Import and basic usage

```tsx
import React from "react";
import {Highlight, HighlightColor} from "addon-ui";

export function Example() {
    return (
        <div>
            <Highlight
                searchWords={["React", "UI"]}
                textToHighlight="Addon UI is a React UI library with theming."
                autoEscape
            />

            {/* With color modifier and custom class names */}
            <Highlight
                color={HighlightColor.Primary}
                searchWords={["Primary"]}
                textToHighlight="Primary colored highlight example"
                highlightClassName="my-highlight"
                activeClassName="my-highlight-active"
            />
        </div>
    );
}
```

#### Props

Only the prop name, type, and default are listed below.

| Prop                 | Type                                          | Default |
| -------------------- | --------------------------------------------- | ------- |
| `color`              | `'primary' \| 'secondary' \| 'accent'`        | —       |
| `highlightClassName` | `string`                                      | —       |
| `activeClassName`    | `string`                                      | —       |
| Highlighter props    | All `react-highlight-words` Highlighter props | —       |

Note: Defaults may also be provided globally via theme/config (`UIProvider`, `ui.config.ts`). Local props take precedence over global config.

#### Colors (enum)

```ts
HighlightColor.Primary;
HighlightColor.Secondary;
HighlightColor.Accent;
```

#### react-highlight-words props

This component is built on the Highlighter from react-highlight-words. Commonly used props include:

- `searchWords` (array of strings or regex) – words/chunks to highlight
- `textToHighlight` (string) – full text
- `autoEscape` (boolean) – escape special characters in `searchWords`
- `caseSensitive` (boolean)
- `highlightStyle`, `unhighlightStyle`
- `findChunks`, `sanitize`

Full reference:
https://github.com/bvaughn/react-highlight-words

### CSS variables for Highlight

Only variables actually referenced in `src/components/Highlight/highlight.module.scss` are listed, with their exact fallback chains. If a variable has no explicit fallback in the stylesheet, it is marked as “none (define in theme)”.

| Variable                             | Fallback chain                                                                    |
| ------------------------------------ | --------------------------------------------------------------------------------- |
| `--highlight-font-size`              | `var(--highlight-font-size, inherit)`                                             |
| `--highlight-font-weight`            | `var(--highlight-font-weight, inherit)`                                           |
| `--highlight-font-family`            | `var(--highlight-font-family, inherit), sans-serif`                               |
| `--highlight-line-height`            | `var(--highlight-line-height, var(--line-height, 1 rem))`                         |
| `--highlight-color`                  | `var(--highlight-color, #fff)`                                                    |
| `--highlight-bg-color`               | `var(--highlight-bg-color, #ffd60a)`                                              |
| `--highlight-y-padding`              | `var(--highlight-y-padding, 2px)`                                                 |
| `--highlight-x-padding`              | `var(--highlight-x-padding, 3px)`                                                 |
| `--highlight-border-radius`          | `var(--highlight-border-radius, 2px)`                                             |
| `--highlight-primary-color`          | `var(--highlight-primary-color, #fff)`                                            |
| `--highlight-secondary-color`        | `var(--highlight-secondary-color, #fff)`                                          |
| `--highlight-accent-color`           | `var(--highlight-accent-color, #fff)`                                             |
| `--highlight-active-color`           | `var(--highlight-active-color, var(--highlight-color, #fff))`                     |
| `--highlight-active-bg-color`        | `var(--highlight-active-bg-color, #ff801f)`                                       |
| `--highlight-active-primary-color`   | `var(--highlight-active-primary-color, var(--highlight-primary-color, #fff))`     |
| `--highlight-active-secondary-color` | `var(--highlight-active-secondary-color, var(--highlight-secondary-color, #fff))` |
| `--highlight-active-accent-color`    | `var(--highlight-active-accent-color, var(--highlight-accent-color, #fff))`       |

Notes:

- Color modifiers use theme tokens directly for backgrounds: `--primary-color`, `--secondary-color`, `--accent-color`.
- Active state for color modifiers uses `color-mix(in srgb, black 40%, <token>)` with the corresponding theme token.

### Theming and global configuration

You can provide Highlight defaults via theme/config:

```ts
// ui.config.ts
import {defineConfig} from "addon-ui/config";
import {HighlightColor} from "addon-ui";

export default defineConfig({
    components: {
        highlight: {
            color: HighlightColor.Primary,
            autoEscape: true,
            caseSensitive: false,
        },
    },
});
```

Or at runtime with the provider:

```tsx
import {UIProvider} from "addon-ui";

<UIProvider
    components={{
        highlight: {
            color: "secondary",
            autoEscape: true,
        },
    }}
>
    {/* ... */}
</UIProvider>;
```

### Accessibility (A11y)

- Highlighting changes visual presentation only; it does not modify text semantics.
- Ensure sufficient color contrast for highlighted and active states.
- Avoid using highlight colors as the sole means of conveying meaning; pair with text where appropriate.
