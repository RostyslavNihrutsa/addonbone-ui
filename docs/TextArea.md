### TextArea

The TextArea component provides a customizable multi‑line text input with auto‑resizing. It supports style variants, sizes, corner radii, full‑width mode, theming via CSS variables, and default props via `UIProvider`/`ui.config.ts`.

#### Import and basic usage

```tsx
import React from "react";
import {TextArea, TextAreaVariant, TextAreaSize, TextAreaRadius} from "addon-ui";

export function Example() {
    const [value, setValue] = React.useState("Initial text");
    const ref = React.useRef<{focus(): void; select(): void; setValue(v: string): void}>(null);

    return (
        <div style={{display: "grid", gap: 16}}>
            {/* Uncontrolled (auto-resizes; rows is the minimum height) */}
            <TextArea placeholder="Type here..." />

            {/* Controlled */}
            <TextArea value={value} onChange={e => setValue(e.currentTarget.value)} rows={4} />

            {/* Variants */}
            <TextArea variant={TextAreaVariant.Regular} placeholder="Regular" />
            <TextArea variant={TextAreaVariant.Outlined} placeholder="Outlined" />
            <TextArea variant={TextAreaVariant.Filled} placeholder="Filled" />

            {/* Sizes */}
            <TextArea size={TextAreaSize.Small} placeholder="Small" />
            <TextArea size={TextAreaSize.Medium} placeholder="Medium" />
            <TextArea size={TextAreaSize.Large} placeholder="Large" />

            {/* Radii */}
            <TextArea radius={TextAreaRadius.None} placeholder="No radius" />
            <TextArea radius={TextAreaRadius.Small} placeholder="Small radius" />
            <TextArea radius={TextAreaRadius.Medium} placeholder="Medium radius" />
            <TextArea radius={TextAreaRadius.Large} placeholder="Large radius" />

            {/* Full width */}
            <TextArea fullWidth placeholder="Full width" />

            {/* Ref actions (focus/select/setValue) */}
            <div style={{display: "flex", gap: 8, alignItems: "center"}}>
                <TextArea ref={ref as any} placeholder="With ref actions" />
                <button onClick={() => ref.current?.focus()}>Focus</button>
                <button onClick={() => ref.current?.select()}>Select</button>
                <button onClick={() => ref.current?.setValue("Hello")}>Set value</button>
            </div>
        </div>
    );
}
```

#### Props

Only the prop name, type, and default are listed below.

| Prop                | Type                                                                                                                                                        | Default     |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `variant`           | `'regular' \| 'outlined' \| 'filled'`                                                                                                                       | `'regular'` |
| `radius`            | `'none' \| 'small' \| 'medium' \| 'large'`                                                                                                                  | —           |
| `size`              | `'small' \| 'medium' \| 'large'`                                                                                                                            | —           |
| `fullWidth`         | `boolean`                                                                                                                                                   | —           |
| `label`             | `string`                                                                                                                                                    | —           |
| HTML textarea attrs | all standard `textarea` attributes (e.g., `value`, `defaultValue`, `onChange`, `placeholder`, `rows`, `disabled`, `required`, `name`, `id`, `aria-*`, etc.) | —           |

Note: Defaults may also be provided globally via theme/config (`UIProvider`, `ui.config.ts`). Local props take precedence over global config.

#### Variants, sizes, radii (enums)

```ts
// Variants
TextAreaVariant.Regular;
TextAreaVariant.Outlined;
TextAreaVariant.Filled;

// Sizes
TextAreaSize.Small;
TextAreaSize.Medium;
TextAreaSize.Large;

// Radius
TextAreaRadius.None;
TextAreaRadius.Small;
TextAreaRadius.Medium;
TextAreaRadius.Large;
```

### CSS variables for TextArea

Only variables actually referenced in `src/components/TextArea/text-area.module.scss` are listed, with their exact fallback chains. If a variable has no explicit fallback in the stylesheet, it is marked as “none (define in theme)”.

| Variable                            | Fallback chain                                                                             |
| ----------------------------------- | ------------------------------------------------------------------------------------------ |
| `--text-area-font-family`           | `var(--text-area-font-family, var(--font-family)), sans-serif`                             |
| `--font-family`                     | `var(--font-family)` (none)                                                                |
| `--text-area-font-weight`           | `var(--text-area-font-weight, 400)`                                                        |
| `--text-area-font-size`             | `var(--text-area-font-size, 14px)`                                                         |
| `--text-area-letter-spacing`        | `var(--text-area-letter-spacing, 0.5px)`                                                   |
| `--text-area-line-height`           | `var(--text-area-line-height, var(--line-height, 1 rem))`                                  |
| `--line-height`                     | `var(--line-height)` (none)                                                                |
| `--text-area-padding`               | `var(--text-area-padding, 8px 12px)`                                                       |
| `--text-area-border-radius`         | `var(--text-area-border-radius, 8px)`                                                      |
| `--text-area-min-width`             | `var(--text-area-min-width, 200px)`                                                        |
| `--transition-speed-sm`             | `var(--transition-speed-sm)` (none)                                                        |
| `--text-area-focus-border-color`    | `var(--text-area-focus-border-color, color-mix(in srgb, white 40%, var(--primary-color)))` |
| `--text-area-focus-shadow`          | `var(--text-area-focus-shadow, 0 0 4px var(--primary-color))`                              |
| `--primary-color`                   | `var(--primary-color)` (none)                                                              |
| `--text-area-disabled-opacity`      | `var(--text-area-disabled-opacity, 0.7)`                                                   |
| `--text-area-regular-color`         | `var(--text-area-regular-color, var(--text-area-color, var(--text-primary-color)))`        |
| `--text-area-color`                 | `var(--text-area-color)` (none)                                                            |
| `--text-primary-color`              | `var(--text-primary-color)` (none)                                                         |
| `--text-area-regular-bg-color`      | `var(--text-area-regular-bg-color, var(--text-area-bg-color, var(--bg-secondary-color)))`  |
| `--text-area-bg-color`              | `var(--text-area-bg-color)` (none)                                                         |
| `--bg-secondary-color`              | `var(--bg-secondary-color)` (none)                                                         |
| `--text-area-regular-border-width`  | `var(--text-area-regular-border-width, var(--text-area-border-width, 1px))`                |
| `--text-area-border-width`          | `var(--text-area-border-width, 1px)`                                                       |
| `--text-area-regular-border-color`  | `var(--text-area-regular-border-color, var(--border-color))`                               |
| `--border-color`                    | `var(--border-color)` (none)                                                               |
| `--text-area-outlined-color`        | `var(--text-area-outlined-color, var(--text-area-color, var(--text-primary-color)))`       |
| `--text-area-outlined-border-width` | `var(--text-area-outlined-border-width, var(--text-area-border-width, 1px))`               |
| `--text-area-outlined-border-color` | `var(--text-area-outlined-border-color, var(--border-color))`                              |
| `--text-area-filled-color`          | `var(--text-area-filled-color, var(--text-area-color, var(--text-primary-color)))`         |
| `--text-area-filled-bg-color`       | `var(--text-area-filled-bg-color, var(--text-area-bg-color, var(--bg-secondary-color)))`   |
| `--text-area-border-radius-sm`      | `var(--text-area-border-radius-sm, 5px)`                                                   |
| `--text-area-border-radius-md`      | `var(--text-area-border-radius-md, 10px)`                                                  |
| `--text-area-border-radius-lg`      | `var(--text-area-border-radius-lg, 15px)`                                                  |
| `--text-area-padding-sm`            | `var(--text-area-padding-sm, 6px 10px)`                                                    |
| `--text-area-padding-md`            | `var(--text-area-padding-md, 10px 14px)`                                                   |
| `--text-area-padding-lg`            | `var(--text-area-padding-lg, 12px 16px)`                                                   |
| `--text-area-font-size-sm`          | Contextual defaults: `12px` (small), `16px` (medium), `18px` (large)                       |

Notes:

- Auto-resizing is handled by the component (using `autosize`) and is not controlled by a CSS variable; `rows` sets the initial/minimum number of visible lines.
- Several theme tokens may be used in fallbacks: `--font-family`, `--line-height`, `--text-primary-color`, `--bg-secondary-color`, `--border-color`, `--primary-color`.

### Theming and global configuration

You can provide TextArea defaults via theme/config:

```ts
// ui.config.ts
import {defineConfig} from "addon-ui/config";
import {TextAreaVariant, TextAreaSize, TextAreaRadius} from "addon-ui";

export default defineConfig({
    components: {
        textArea: {
            variant: TextAreaVariant.Outlined,
            size: TextAreaSize.Medium,
            radius: TextAreaRadius.Small,
            fullWidth: false,
            // You may also set common textarea attributes as defaults
            rows: 4,
            placeholder: "Enter text",
        },
    },
});
```

Or at runtime with the provider:

```tsx
import {UIProvider} from "addon-ui";

<UIProvider
    components={{
        textArea: {
            variant: "filled",
            size: "large",
            radius: "medium",
            fullWidth: true,
        },
    }}
>
    {/* ... */}
</UIProvider>;
```

### Accessibility (A11y)

- Provide a programmatic label. You can use the `label` prop (mapped to `aria-label`) or connect a visible `<label htmlFor>` to the textarea via `id`.
- Ensure sufficient color contrast for text and backgrounds, including disabled states.
- `rows` sets the minimum number of lines; the field grows as the user types due to auto-resizing.
