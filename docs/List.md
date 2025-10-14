### List and ListItem

The List and ListItem components work together to render flexible, accessible lists. List is a semantic `<ul>` wrapper that enforces ListItem children. ListItem provides left/center/right slots and primary/secondary text areas with sensible defaults. Theming is supported via CSS variables for ListItem.

#### Import and basic usage

```tsx
import React from "react";
import {List, ListItem, Avatar, AvatarSize, Button} from "addon-ui";

export function Example() {
    return (
        <List>
            <ListItem
                left={<Avatar src="https://example.com/a1.jpg" alt="User" size={AvatarSize.Small} />}
                primary="Jane Doe"
                secondary="Administrator"
                right={<Button>View</Button>}
            />

            <ListItem
                left={<Avatar src="https://example.com/a2.jpg" alt="User" size={AvatarSize.Small} />}
                primary={<strong>John Smith</strong>}
                secondary={<span style={{opacity: 0.7}}>Member</span>}
                right={<Button variant="outlined">Message</Button>}
            />

            {/* Custom tags for slots */}
            <ListItem
                primary="Custom tags"
                secondary="Primary as h4, secondary as small"
                primaryTag="h4"
                secondaryTag="small"
            />
        </List>
    );
}
```

#### Props: List

Only the prop name, type, and default are listed below.

| Prop          | Type                                                           | Default |
| ------------- | -------------------------------------------------------------- | ------- |
| `children`    | `ReactElement<ListItemProps> \| ReactElement<ListItemProps>[]` | —       |
| HTML ul attrs | all standard `ul` attributes                                   | —       |

Note: Defaults may also be provided globally via theme/config (`UIProvider`, `ui.config.ts`). Local props take precedence over global config.

#### Props: ListItem

Only the prop name, type, and default are listed below.

| Prop                 | Type                          | Default       |
| -------------------- | ----------------------------- | ------------- |
| `left`               | `ReactNode`                   | —             |
| `right`              | `ReactNode`                   | —             |
| `primary`            | `ReactNode`                   | —             |
| `secondary`          | `ReactNode`                   | —             |
| `leftTag`            | `keyof JSX.IntrinsicElements` | `'div'`       |
| `rightTag`           | `keyof JSX.IntrinsicElements` | `'div'`       |
| `primaryTag`         | `keyof JSX.IntrinsicElements` | `'div'`       |
| `secondaryTag`       | `keyof JSX.IntrinsicElements` | `'div'`       |
| `primaryClassName`   | `string`                      | —             |
| `secondaryClassName` | `string`                      | —             |
| `centerClassName`    | `string`                      | —             |
| `leftClassName`      | `string`                      | —             |
| `rightClassName`     | `string`                      | —             |
| `role`               | `string`                      | `'list-item'` |
| HTML li attrs        | all standard `li` attributes  | —             |

Note: Defaults may also be provided globally via theme/config (`UIProvider`, `ui.config.ts`). Local props take precedence over global config.

### CSS variables

Only variables actually referenced in the corresponding `*.module.scss` files are listed, with their exact fallback chains. If a variable has no explicit fallback in the stylesheet, it is marked as “none (define in theme)”.

#### CSS variables for List

The List stylesheet (`src/components/List/list.module.scss`) does not reference any CSS variables.

#### CSS variables for ListItem

Variables from `src/components/ListItem/list-item.module.scss`:

| Variable                      | Fallback chain                                                  |
| ----------------------------- | --------------------------------------------------------------- |
| `--list-item-line-height`     | `var(--list-item-line-height, var(--line-height, 1 rem))`       |
| `--list-item-primary-color`   | `var(--list-item-primary-color, var(--text-primary-color))`     |
| `--list-item-secondary-color` | `var(--list-item-secondary-color, var(--text-secondary-color))` |

### Theming and global configuration

You can provide List and ListItem defaults via theme/config:

```ts
// ui.config.ts
import {defineConfig} from "addon-ui/config";

export default defineConfig({
    components: {
        list: {
            // Any default <ul> attributes you commonly use, e.g.:
            // role: "list",
            // style: { gap: 12 },
        },
        listItem: {
            // Common defaults for list items
            primaryTag: "div",
            secondaryTag: "small",
            // role: "listitem", // you can override the default if needed
        },
    },
});
```

Or at runtime with the provider:

```tsx
import {UIProvider} from "addon-ui";

<UIProvider
    components={{
        list: {
            // role: "list",
        },
        listItem: {
            primaryTag: "h4",
            secondaryTag: "small",
        },
    }}
>
    {/* ... */}
</UIProvider>;
```

### Accessibility (A11y)

- List renders a semantic `<ul>` and ListItem renders an `<li>`; this provides built‑in list semantics.
- Avoid overriding roles unless you have a specific accessibility reason; native semantics are preferred.
- Ensure interactive controls placed in `left`/`right` slots are keyboard accessible and labeled appropriately.
