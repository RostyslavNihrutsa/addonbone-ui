# AddonBone UI (adnbn-ui)

[![npm version](https://img.shields.io/npm/v/adnbn-ui.svg)](https://www.npmjs.com/package/adnbn-ui)
[![npm downloads](https://img.shields.io/npm/dm/adnbn-ui.svg)](https://www.npmjs.com/package/adnbn-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A comprehensive UI component library designed for the AddonBone framework. This library provides a set of customizable React components with theming capabilities to build modern, responsive user interfaces.

## Features

- 🎨 **Customizable Theming**: Easily customize the look and feel of components through theme configuration
- 🧩 **Rich Component Set**: Includes buttons, forms, layouts, modals, and more
- 🔌 **AddonBone Integration**: Seamless integration with the AddonBone framework
- 📚 **Storybook Documentation**: Comprehensive component documentation with examples
- 🛠️ **TypeScript Support**: Full TypeScript support with type definitions

## Table of Contents

- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [Integration](#integration)
- [Customization](#customization)
- [Using Extra Props](#using-extra-props)
- [Component Examples](#component-examples)
- [Supported Components](#supported-components)
    - [Avatar](#avatar)
    - [BaseButton](#basebutton)
    - [Button](#button)
    - [Checkbox](#checkbox)
    - [Dialog](#dialog)
    - [Drawer](#drawer)
    - [Footer](#footer)
    - [Header](#header)
    - [Highlight](#highlight)
    - [Icon](#icon)
    - [IconButton](#iconbutton)
    - [Layout](#layout)
    - [List](#list)
    - [ListItem](#listitem)
    - [Modal](#modal)
    - [Odometer](#odometer)
    - [ScrollArea](#scrollarea)
    - [SvgSprite](#svgsprite)
    - [Switch](#switch)
    - [Tag](#tag)
    - [TextArea](#textarea)
    - [TextField](#textfield)
    - [Toast](#toast)
    - [Tooltip](#tooltip)
    - [View](#view)
    - [ViewDrawer](#viewdrawer)
    - [ViewModal](#viewmodal)
- [License](#license)

## Installation

Using npm:

```bash
npm install adnbn-ui
```

Using Yarn:

```bash
yarn add adnbn-ui
```

## Basic Usage

```jsx
import React from "react";
import {Button, ButtonColor, ButtonVariant, TextField, UIProvider} from "adnbn-ui";

function App() {
    return (
        <UIProvider>
            <div>
                <TextField label="Username" placeholder="Enter your username" />
                <Button color={ButtonColor.Primary} variant={ButtonVariant.Contained}>
                    Submit
                </Button>
            </div>
        </UIProvider>
    );
}

export default App;
```

## Integration

AddonBone UI is designed exclusively for the AddonBone framework and does not have a standalone build as it's connected as a plugin. This library is an integral part of the AddonBone ecosystem for developing browser extensions with a shared codebase.

AddonBone is a framework for developing browser extensions with a common codebase. This means you can create multiple extensions with the same functionality but with different designs, localizations, and feature sets depending on the needs of each extension while maintaining access to a shared codebase.

### Plugin Setup

```ts
// adnbn.config.ts
import {defineConfig} from "adnbn";
import uiPlugin from "adnbn-ui/plugin";

export default defineConfig({
    plugins: [
        uiPlugin({
            themeDir: "./theme", // Directory for theme files
            configFileName: "ui.config", // Name of config files
            styleFileName: "ui.style", // Name of style files
            mergeConfig: true, // Merge configs from different directories
            mergeStyles: true, // Merge styles from different directories
        }),
    ],
});
```

### Configuration Files

The `adnbn-ui` configuration is designed to retrieve configuration from each extension separately, allowing for different designs for different extensions without changing any code. You only need to modify the configuration, style variables, and icons.

The plugin looks for configuration files in specific directories within your project. By default, it searches in the following locations (in order of priority):

1. **App-specific directory**: `src/apps/[app-name]/[app-src-dir]/[theme-dir]`
2. **Shared directory**: `src/shared/[theme-dir]`

Where `[theme-dir]` is the directory specified in the `themeDir` option (defaults to the current directory).

The `mergeConfig` option (default: `true`) determines whether configurations from multiple directories should be merged. When enabled, configurations from both app-specific and shared directories will be combined, with app-specific values taking precedence in case of conflicts. If disabled, only the first configuration found will be used (with app-specific having priority).

You can create these files to customize the UI components:

#### ui.config.ts

You can use the `defineConfig` helper which provides type checking:

```ts
// src/shared/theme/ui.config.ts
import {defineConfig} from "adnbn-ui/config";
import {ButtonColor, ButtonRadius, ButtonVariant, TextFieldRadius, TextFieldSize} from "adnbn-ui";

import CloseIcon from "./icons/close.svg?react";

export default defineConfig({
    components: {
        button: {
            variant: ButtonVariant.Contained,
            color: ButtonColor.Primary,
            radius: ButtonRadius.Medium,
        },
        textField: {
            size: TextFieldSize.Medium,
            radius: TextFieldRadius.Small,
        },
        // ... other component configurations
    },
    icons: {
        close: CloseIcon,
        // Other custom icons
    },
});
```

The example above shows how to use the TypeScript configuration with the AddonBone framework. The `defineConfig` helper provides type checking and autocompletion for your configuration. You can import enum values from "adnbn-ui/config" to ensure type safety when configuring components. The configuration can also include SVG icons imported directly from your project files.

#### ui.style.scss

Similar to configuration files, style files are also searched for in the same directories with the same priority order. The `mergeStyles` option (default: `true`) works the same way as `mergeConfig`, allowing styles from multiple directories to be combined when enabled.

```scss
// src/shared/theme/ui.style.scss
// Custom CSS variables and mixins for theming
@import "adnbn-ui/theme";

@include light {
    // Base colors
    --primary-color: #3f51b5;
    --secondary-color: #f50057;
    --accent-color: #4caf50;

    // Text colors
    --text-primary-color: #212121;
    --text-secondary-color: #757575;

    // Background colors
    --bg-primary-color: #ffffff;
    --bg-secondary-color: #f5f5f5;

    // Font settings
    --font-family: "Roboto", sans-serif;
    --font-size: 14px;
    --line-height: 1.5;

    // Button specific variables
    --button-font-family: var(--font-family);
    --button-font-size: var(--font-size);
    --button-height: 34px;
    --button-border-radius: 10px;

    // Button size variants
    --button-height-sm: 24px;
    --button-height-md: 44px;
    --button-height-lg: 54px;

    // Button radius variants
    --button-border-radius-sm: 5px;
    --button-border-radius-md: 12px;
    --button-border-radius-lg: 15px;
}

@include dark {
    // Base colors for dark theme
    --primary-color: #7986cb;
    --secondary-color: #ff4081;
    --accent-color: #66bb6a;

    // Text colors for dark theme
    --text-primary-color: #ffffff;
    --text-secondary-color: #b0bec5;

    // Background colors for dark theme
    --bg-primary-color: #121212;
    --bg-secondary-color: #1e1e1e;
}
```

## Customization

The `adnbn-ui` library allows for extensive customization to create different designs for different extensions without changing code. This is particularly useful in the AddonBone framework where you might need to maintain multiple browser extensions with the same functionality but different visual appearances.

### Global Theme Customization

You can customize the theme globally by passing props to the UIProvider:

```jsx
import {UIProvider} from "adnbn-ui";

const customTheme = {
    components: {
        button: {
            variant: "outlined",
            color: "primary",
        },
        textField: {
            radius: "medium",
        },
    },
    icons: {
        // Custom icons
    },
};

function App() {
    return <UIProvider {...customTheme}>{/* Your application */}</UIProvider>;
}
```

### Using Extra Props

Extra Props is a powerful feature that allows you to extend component props with custom properties. This is particularly useful when you need to add custom functionality or data to components across your application without modifying the original component code.

#### What are Extra Props?

Extra Props provide a way to pass additional properties to components throughout your application using React Context. This allows you to:

- Add application-specific properties to UI components
- Share common data across multiple components
- Extend the library's components with your own custom properties

#### How to Use Extra Props

1. **Configure Extra Props in your theme configuration:**

```ts
// src/shared/theme/ui.config.ts
import {defineConfig} from "adnbn-ui/config";

export default defineConfig({
    components: {
        // Component configurations
    },
    extra: {
        // Your custom properties
        appName: "My Awesome App",
        version: "1.0.0",
        features: {
            darkMode: true,
            analytics: false,
        },
    },
    icons: {
        // Icon configurations
    },
});
```

2. **Access Extra Props in your components using the `useExtra` hook:**

```jsx
import {useExtra} from "adnbn-ui";

function AppHeader() {
    const extra = useExtra();

    return (
        <header>
            <h1>{extra.appName}</h1>
            <span>Version: {extra.version}</span>
        </header>
    );
}
```

#### Example Use Case

A common use case for Extra Props is to add application-specific configuration to UI components. For example, you might want to add custom analytics tracking to buttons:

```jsx
import {Button, useExtra} from "adnbn-ui";

function TrackableButton(props) {
    const extra = useExtra();

    const handleClick = e => {
        // Use extra props for analytics
        if (extra.features.analytics) {
            trackButtonClick(props.trackingId);
        }

        // Call the original onClick handler
        props.onClick?.(e);
    };

    return <Button {...props} onClick={handleClick} />;
}
```

#### Extending ExtraProps in TypeScript

To get proper type checking for your custom Extra Props, you can extend the `ExtraProps` interface:

```ts
// ui.d.ts or similar file
import "adnbn-ui";

declare module "adnbn-ui" {
    interface ExtraProps {
        appName: string;
        version: string;
        features: {
            darkMode: boolean;
            analytics: boolean;
        };
        // Add any other custom properties
    }
}
```

With this type definition, TypeScript will provide proper type checking and autocompletion when using the `useExtra` hook:

```tsx
import React from "react";
import {useExtra, Button} from "adnbn-ui";

const FeatureFlag: React.FC<{feature: keyof ExtraProps["features"]; children: React.ReactNode}> = ({
    feature,
    children,
}) => {
    const extra = useExtra();

    // TypeScript knows that extra.features exists and has the properties we defined
    if (extra.features[feature]) {
        return <>{children}</>;
    }

    return null;
};

// Usage
function App() {
    return (
        <div>
            <FeatureFlag feature="darkMode">
                <Button>Dark Mode Enabled</Button>
            </FeatureFlag>
        </div>
    );
}
```

## Component Examples

### Buttons

```jsx
import {Button, ButtonColor, ButtonSize, ButtonVariant} from 'adnbn-ui';

// Basic button
<Button>Click me</Button>

// Variants
<Button variant={ButtonVariant.Contained}>Contained</Button>
<Button variant={ButtonVariant.Outlined}>Outlined</Button>
<Button variant={ButtonVariant.Text}>Text</Button>

// Colors
<Button color={ButtonColor.Primary}>Primary</Button>
<Button color={ButtonColor.Secondary}>Secondary</Button>
<Button color={ButtonColor.Accent}>Accent</Button>

// Sizes
<Button size={ButtonSize.Small}>Small</Button>
<Button size={ButtonSize.Medium}>Medium</Button>
<Button size={ButtonSize.Large}>Large</Button>

// Disabled state
<Button disabled>Disabled</Button>
```

### Form Components

```jsx
import {TextField, TextArea, Checkbox, Switch} from 'adnbn-ui';

// Text input
<TextField label="Username" placeholder="Enter username" />

// Text area
<TextArea label="Description" placeholder="Enter description" />

// Checkbox
<Checkbox label="Remember me" />

// Switch
<Switch label="Enable notifications" />
```

### Layout Components

```jsx
import {Layout, Header, Footer} from "adnbn-ui";

<Layout>
    <Header>My Application</Header>
    <div>Content goes here</div>
    <Footer>© 2023 My Company</Footer>
</Layout>;
```

### Feedback Components

```jsx
import {Toast, Modal, Dialog, Drawer} from 'adnbn-ui';

// Toast notification
<Toast message="Operation successful!" />

// Modal dialog
<Modal open={isOpen} onClose={handleClose}>
  <h2>Modal Title</h2>
  <p>Modal content goes here</p>
</Modal>

// Confirmation dialog
<Dialog
  title="Confirm Action"
  content="Are you sure you want to proceed?"
  confirmText="Yes"
  cancelText="No"
  onConfirm={handleConfirm}
  onCancel={handleCancel}
/>

// Side drawer
<Drawer open={isOpen} onClose={handleClose} position="right">
  <h2>Drawer Content</h2>
  <p>Drawer content goes here</p>
</Drawer>
```

## Supported Components

### Button

The Button component provides a customizable button with various styles, colors, and sizes.

#### Props

| Prop              | Type          | Description                               |
| ----------------- | ------------- | ----------------------------------------- |
| variant           | ButtonVariant | Button style variant                      |
| color             | ButtonColor   | Button color                              |
| size              | ButtonSize    | Button size                               |
| radius            | ButtonRadius  | Button border radius                      |
| after             | ReactNode     | Content to display after the button text  |
| before            | ReactNode     | Content to display before the button text |
| afterClassName    | string        | Class name for the after content          |
| beforeClassName   | string        | Class name for the before content         |
| childrenClassName | string        | Class name for the children content       |

#### Enums

```jsx
// Available variants
ButtonVariant.Contained;
ButtonVariant.Outlined;
ButtonVariant.Text;

// Available colors
ButtonColor.Primary;
ButtonColor.Secondary;
ButtonColor.Accent;

// Available sizes
ButtonSize.Small;
ButtonSize.Medium;
ButtonSize.Large;

// Available radius options
ButtonRadius.Small;
ButtonRadius.Medium;
ButtonRadius.Large;
ButtonRadius.Full;
```

#### Example

```jsx
import {Button, ButtonVariant, ButtonColor, ButtonSize, ButtonRadius} from "adnbn-ui";

<Button
    variant={ButtonVariant.Contained}
    color={ButtonColor.Primary}
    size={ButtonSize.Medium}
    radius={ButtonRadius.Medium}
>
    Click me
</Button>;
```

### TextField

The TextField component provides a customizable text input field with various styles, sizes, and validation states.

#### Props

| Prop            | Type             | Description                              |
| --------------- | ---------------- | ---------------------------------------- |
| variant         | TextFieldVariant | Input style variant                      |
| accent          | TextFieldAccent  | Input accent color for validation states |
| radius          | TextFieldRadius  | Input border radius                      |
| customSize      | TextFieldSize    | Input size                               |
| label           | string           | Input label                              |
| fullWidth       | boolean          | Whether the input should take full width |
| before          | ReactNode        | Content to display before the input      |
| after           | ReactNode        | Content to display after the input       |
| inputClassName  | string           | Class name for the input element         |
| afterClassName  | string           | Class name for the after content         |
| beforeClassName | string           | Class name for the before content        |

#### Enums

```jsx
// Available variants
TextFieldVariant.Regular;
TextFieldVariant.Outlined;
TextFieldVariant.Filled;

// Available sizes
TextFieldSize.Small;
TextFieldSize.Medium;
TextFieldSize.Large;

// Available radius options
TextFieldRadius.None;
TextFieldRadius.Small;
TextFieldRadius.Medium;
TextFieldRadius.Large;
TextFieldRadius.Full;

// Available accent options
TextFieldAccent.Success;
TextFieldAccent.Error;
```

#### Example

```jsx
import {TextField, TextFieldVariant, TextFieldSize, TextFieldRadius, TextFieldAccent} from "adnbn-ui";

<TextField
    variant={TextFieldVariant.Outlined}
    customSize={TextFieldSize.Medium}
    radius={TextFieldRadius.Medium}
    accent={TextFieldAccent.Success}
    label="Username"
    placeholder="Enter your username"
    fullWidth
/>;
```

### TextArea

The TextArea component provides a customizable multi-line text input with auto-resizing capability.

#### Props

| Prop      | Type            | Description                                 |
| --------- | --------------- | ------------------------------------------- |
| variant   | TextAreaVariant | TextArea style variant                      |
| radius    | TextAreaRadius  | TextArea border radius                      |
| size      | TextAreaSize    | TextArea size                               |
| fullWidth | boolean         | Whether the textarea should take full width |
| label     | string          | TextArea label                              |

#### Enums

```jsx
// Available variants
TextAreaVariant.Regular;
TextAreaVariant.Outlined;
TextAreaVariant.Filled;

// Available sizes
TextAreaSize.Small;
TextAreaSize.Medium;
TextAreaSize.Large;

// Available radius options
TextAreaRadius.None;
TextAreaRadius.Small;
TextAreaRadius.Medium;
TextAreaRadius.Large;
```

#### Example

```jsx
import {TextArea, TextAreaVariant, TextAreaSize, TextAreaRadius} from "adnbn-ui";

<TextArea
    variant={TextAreaVariant.Outlined}
    size={TextAreaSize.Medium}
    radius={TextAreaRadius.Medium}
    label="Description"
    placeholder="Enter description"
    rows={4}
    fullWidth
/>;
```

### Checkbox

The Checkbox component provides a customizable checkbox with various styles and sizes.

#### Props

| Prop               | Type            | Description                          |
| ------------------ | --------------- | ------------------------------------ |
| indicatorClassName | string          | Class name for the indicator element |
| size               | CheckboxSize    | Checkbox size                        |
| radius             | CheckboxRadius  | Checkbox border radius               |
| variant            | CheckboxVariant | Checkbox style variant               |
| checkedIcon        | ReactElement    | Custom icon for checked state        |
| indeterminateIcon  | ReactElement    | Custom icon for indeterminate state  |

#### Enums

```jsx
// Available variants
CheckboxVariant.Classic;
CheckboxVariant.Soft;

// Available sizes
CheckboxSize.Small;
CheckboxSize.Medium;
CheckboxSize.Large;

// Available radius options
CheckboxRadius.Small;
CheckboxRadius.Large;
```

#### Example

```jsx
import {Checkbox, CheckboxVariant, CheckboxSize, CheckboxRadius} from "adnbn-ui";

<Checkbox variant={CheckboxVariant.Classic} size={CheckboxSize.Medium} radius={CheckboxRadius.Small} checked={true} />;
```

### Switch

The Switch component provides a toggle switch control.

#### Props

| Prop           | Type   | Description                      |
| -------------- | ------ | -------------------------------- |
| thumbClassName | string | Class name for the thumb element |

#### Example

```jsx
import {Switch} from "adnbn-ui";

<Switch checked={isEnabled} onCheckedChange={setIsEnabled} />;
```

### Avatar

The Avatar component displays a user's profile picture or a fallback when the image is not available.

#### Props

| Prop              | Type         | Description                                        |
| ----------------- | ------------ | -------------------------------------------------- |
| size              | AvatarSize   | Avatar size                                        |
| radius            | AvatarRadius | Avatar border radius                               |
| fallback          | ReactNode    | Content to display when the image is not available |
| fallbackClassName | string       | Class name for the fallback content                |
| imageClassName    | string       | Class name for the image element                   |
| cursorPointer     | boolean      | Whether the avatar should have a pointer cursor    |
| delayMs           | number       | Delay before showing the fallback content          |

#### Enums

```jsx
// Available sizes
AvatarSize.Small;
AvatarSize.Medium;
AvatarSize.Large;

// Available radius options
AvatarRadius.Small;
AvatarRadius.Medium;
AvatarRadius.Large;
```

#### Example

```jsx
import {Avatar, AvatarSize, AvatarRadius} from "adnbn-ui";

<Avatar
    src="https://example.com/avatar.jpg"
    alt="User Avatar"
    size={AvatarSize.Medium}
    radius={AvatarRadius.Medium}
    fallback="JD"
/>;
```

### BaseButton

The BaseButton component is a foundational button component that provides basic button functionality.

#### Props

| Prop              | Type      | Description                               |
| ----------------- | --------- | ----------------------------------------- |
| after             | ReactNode | Content to display after the button text  |
| before            | ReactNode | Content to display before the button text |
| afterClassName    | string    | Class name for the after content          |
| beforeClassName   | string    | Class name for the before content         |
| childrenClassName | string    | Class name for the children content       |

#### Example

```jsx
import {BaseButton} from "adnbn-ui";

<BaseButton before={<Icon name="star" />} after={<Icon name="arrow-right" />}>
    Click me
</BaseButton>;
```

### Dialog

The Dialog component displays a modal dialog that overlays the page content.

#### Props

| Prop              | Type        | Description                                                    |
| ----------------- | ----------- | -------------------------------------------------------------- |
| speed             | number      | Animation speed in milliseconds                                |
| description       | string      | Dialog description (for accessibility)                         |
| fullscreen        | boolean     | Whether the dialog should be fullscreen                        |
| overlayClassName  | string      | Class name for the overlay element                             |
| childrenClassName | string      | Class name for the children content                            |
| open              | boolean     | Whether the dialog is open                                     |
| onOpenChange      | function    | Callback when the open state changes                           |
| modal             | boolean     | Whether the dialog is modal (blocks interaction with the page) |
| container         | HTMLElement | Container element for the dialog                               |
| title             | string      | Dialog title (for accessibility)                               |

#### Example

```jsx
import {Dialog} from "adnbn-ui";

<Dialog open={isOpen} onOpenChange={setIsOpen} title="Confirmation" description="Please confirm your action">
    <div>
        <h2>Are you sure?</h2>
        <p>This action cannot be undone.</p>
        <div>
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button onClick={handleConfirm}>Confirm</Button>
        </div>
    </div>
</Dialog>;
```

### Drawer

The Drawer component displays a sliding panel that comes from the edge of the screen.

#### Props

| Prop     | Type                                   | Description                        |
| -------- | -------------------------------------- | ---------------------------------- |
| position | 'left' \| 'right' \| 'top' \| 'bottom' | Position of the drawer             |
| open     | boolean                                | Whether the drawer is open         |
| onClose  | function                               | Callback when the drawer is closed |

#### Example

```jsx
import {Drawer} from "adnbn-ui";

<Drawer open={isOpen} onClose={() => setIsOpen(false)} position="right">
    <div>Drawer content</div>
</Drawer>;
```

### Footer

The Footer component provides a consistent footer layout.

#### Example

```jsx
import {Footer} from "adnbn-ui";

<Footer>
    <div>© 2023 My Company</div>
</Footer>;
```

### Header

The Header component provides a consistent header layout.

#### Example

```jsx
import {Header} from "adnbn-ui";

<Header>
    <div>My Application</div>
</Header>;
```

### Highlight

The Highlight component highlights text matches within content.

#### Props

| Prop               | Type     | Description                     |
| ------------------ | -------- | ------------------------------- |
| searchWords        | string[] | Words to highlight              |
| textToHighlight    | string   | Text content to search within   |
| highlightClassName | string   | Class name for highlighted text |

#### Example

```jsx
import {Highlight} from "adnbn-ui";

<Highlight searchWords={["react", "component"]} textToHighlight="This is a React component library" />;
```

### Icon

The Icon component displays vector icons.

#### Props

| Prop  | Type   | Description |
| ----- | ------ | ----------- |
| name  | string | Icon name   |
| size  | number | Icon size   |
| color | string | Icon color  |

#### Example

```jsx
import {Icon} from "adnbn-ui";

<Icon name="star" size={24} color="#f5a623" />;
```

### IconButton

The IconButton component combines an icon with button functionality.

#### Props

| Prop  | Type                                 | Description     |
| ----- | ------------------------------------ | --------------- |
| icon  | ReactNode                            | Icon to display |
| size  | 'small' \| 'medium' \| 'large'       | Button size     |
| color | 'primary' \| 'secondary' \| 'accent' | Button color    |

#### Example

```jsx
import {IconButton, Icon} from "adnbn-ui";

<IconButton icon={<Icon name="star" />} size="medium" color="primary" onClick={handleClick} />;
```

### Layout

The Layout component provides a consistent page layout structure.

#### Example

```jsx
import {Layout, Header, Footer} from "adnbn-ui";

<Layout>
    <Header>My Application</Header>
    <div>Content goes here</div>
    <Footer>© 2023 My Company</Footer>
</Layout>;
```

### List

The List component displays a list of items.

#### Props

| Prop    | Type                               | Description           |
| ------- | ---------------------------------- | --------------------- |
| variant | 'ordered' \| 'unordered'           | List type             |
| spacing | 'compact' \| 'normal' \| 'relaxed' | Spacing between items |

#### Example

```jsx
import {List, ListItem} from "adnbn-ui";

<List variant="unordered" spacing="normal">
    <ListItem>Item 1</ListItem>
    <ListItem>Item 2</ListItem>
    <ListItem>Item 3</ListItem>
</List>;
```

### ListItem

The ListItem component represents an item in a List.

#### Example

```jsx
import {ListItem} from "adnbn-ui";

<ListItem>Item content</ListItem>;
```

### Modal

The Modal component displays content in a layer above the page.

#### Props

| Prop    | Type      | Description                       |
| ------- | --------- | --------------------------------- |
| open    | boolean   | Whether the modal is open         |
| onClose | function  | Callback when the modal is closed |
| title   | string    | Modal title                       |
| footer  | ReactNode | Modal footer content              |

#### Example

```jsx
import {Modal, Button} from "adnbn-ui";

<Modal
    open={isOpen}
    onClose={() => setIsOpen(false)}
    title="Modal Title"
    footer={<Button onClick={() => setIsOpen(false)}>Close</Button>}
>
    <p>Modal content goes here</p>
</Modal>;
```

### Odometer

The Odometer component displays animated number transitions.

#### Props

| Prop     | Type   | Description                        |
| -------- | ------ | ---------------------------------- |
| value    | number | Current value to display           |
| format   | string | Number format                      |
| duration | number | Animation duration in milliseconds |

#### Example

```jsx
import {Odometer} from "adnbn-ui";

<Odometer value={1234} format="(,ddd)" duration={1000} />;
```

### ScrollArea

The ScrollArea component provides a customizable scrollable area.

#### Props

| Prop            | Type                                      | Description                    |
| --------------- | ----------------------------------------- | ------------------------------ |
| type            | 'auto' \| 'always' \| 'scroll' \| 'hover' | When to show scrollbars        |
| scrollHideDelay | number                                    | Delay before hiding scrollbars |

#### Example

```jsx
import {ScrollArea} from "adnbn-ui";

<ScrollArea type="hover" scrollHideDelay={800} style={{height: 200}}>
    <div>Content that might overflow</div>
</ScrollArea>;
```

### SvgSprite

The SvgSprite component manages SVG sprite definitions.

#### Example

```jsx
import {SvgSprite} from "adnbn-ui";

<SvgSprite />;
```

### Tag

The Tag component displays a label or category tag.

#### Props

| Prop    | Type                                                          | Description                               |
| ------- | ------------------------------------------------------------- | ----------------------------------------- |
| color   | 'primary' \| 'secondary' \| 'success' \| 'warning' \| 'error' | Tag color                                 |
| size    | 'small' \| 'medium' \| 'large'                                | Tag size                                  |
| onClose | function                                                      | Callback when the close button is clicked |

#### Example

```jsx
import {Tag} from "adnbn-ui";

<Tag color="primary" size="medium" onClose={handleClose}>
    Featured
</Tag>;
```

### Toast

The Toast component displays brief notifications.

#### Props

| Prop     | Type                                                                              | Description              |
| -------- | --------------------------------------------------------------------------------- | ------------------------ |
| message  | string                                                                            | Toast message            |
| type     | 'info' \| 'success' \| 'warning' \| 'error'                                       | Toast type               |
| duration | number                                                                            | Duration in milliseconds |
| position | 'top' \| 'bottom' \| 'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right' | Toast position           |

#### Example

```jsx
import {Toast} from "adnbn-ui";

<Toast message="Operation successful!" type="success" duration={3000} position="top-right" />;
```

### Tooltip

The Tooltip component displays informative text when hovering over an element.

#### Props

| Prop     | Type                                   | Description                      |
| -------- | -------------------------------------- | -------------------------------- |
| content  | ReactNode                              | Tooltip content                  |
| position | 'top' \| 'bottom' \| 'left' \| 'right' | Tooltip position                 |
| delay    | number                                 | Delay before showing the tooltip |

#### Example

```jsx
import {Tooltip, Button} from "adnbn-ui";

<Tooltip content="More information" position="top" delay={300}>
    <Button>Hover me</Button>
</Tooltip>;
```

### View

The View component provides a container for content with consistent styling.

#### Example

```jsx
import {View} from "adnbn-ui";

<View>
    <h1>Page Title</h1>
    <p>Page content</p>
</View>;
```

### ViewDrawer

The ViewDrawer component combines View and Drawer components.

#### Example

```jsx
import {ViewDrawer} from "adnbn-ui";

<ViewDrawer open={isOpen} onClose={() => setIsOpen(false)} position="right">
    <h1>Drawer Title</h1>
    <p>Drawer content</p>
</ViewDrawer>;
```

### ViewModal

The ViewModal component combines View and Modal components.

#### Example

```jsx
import {ViewModal} from "adnbn-ui";

<ViewModal open={isOpen} onClose={() => setIsOpen(false)} title="Modal Title">
    <p>Modal content</p>
</ViewModal>;
```

## Component Props

All components accept standard HTML attributes in addition to their specific props. Here are some common props for key components:

### Button

| Prop     | Type                                     | Default     | Description                    |
| -------- | ---------------------------------------- | ----------- | ------------------------------ |
| variant  | 'contained' \| 'outlined' \| 'text'      | 'contained' | Button style variant           |
| color    | 'primary' \| 'secondary' \| 'accent'     | undefined   | Button color                   |
| size     | 'small' \| 'medium' \| 'large'           | undefined   | Button size                    |
| radius   | 'small' \| 'medium' \| 'large' \| 'full' | undefined   | Button border radius           |
| disabled | boolean                                  | false       | Whether the button is disabled |

### TextField

| Prop        | Type     | Default   | Description                    |
| ----------- | -------- | --------- | ------------------------------ |
| label       | string   | undefined | Input label                    |
| placeholder | string   | undefined | Input placeholder              |
| value       | string   | undefined | Input value                    |
| onChange    | function | undefined | Change event handler           |
| error       | boolean  | false     | Whether the input has an error |
| helperText  | string   | undefined | Helper text to display         |
| disabled    | boolean  | false     | Whether the input is disabled  |

## License

This project is licensed under the MIT License - see the LICENSE file for details.
