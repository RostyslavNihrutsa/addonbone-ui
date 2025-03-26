import React, {
    ChangeEventHandler,
    ComponentProps,
    forwardRef,
    memo,
    useCallback,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from "react";

import classnames from "classnames";
import autosize from "autosize";

import {useDefaultProps} from "../../theme";

import styles from "./text-area.module.scss";

export enum TextAreaVariant {
    Regular = "regular",
    Outlined = "outlined",
    Filled = "filled",
}

export enum TextAreaSize {
    Small = "small",
    Medium = "medium",
    Large = "large",
}

export enum TextAreaRadius {
    None = "none",
    Small = "small",
    Medium = "medium",
    Large = "large",
}

export interface TextAreaActions {
    select(): void;

    focus(): void;

    setValue(value: string): void;
}

export interface TextAreaProps extends ComponentProps<'textarea'> {
    variant?: TextAreaVariant;
    radius?: TextAreaRadius;
    size?: TextAreaSize;
    fullWidth?: boolean;
    label?: string;
    children?: string | ReadonlyArray<string> | number | undefined;
}

const TextArea = forwardRef<TextAreaActions, TextAreaProps>((props, ref) => {
    const defaultProps = useDefaultProps('textArea');
    const mergedProps = {...defaultProps, ...props};
    const {
        variant = TextAreaVariant.Regular,
        radius,
        size,
        fullWidth,
        label,
        id,
        name,
        rows = 4,
        value: propValue = '',
        children,
        onChange,
        className,
        ...other
    } = mergedProps;

    const [value, setValue] = useState(propValue || children);

    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const handleChange = useCallback<ChangeEventHandler<HTMLTextAreaElement>>((event) => {
        onChange && onChange(event);
        setValue(event.currentTarget.value);
    }, [onChange]);

    useImperativeHandle(ref, () => ({
        select() {
            textareaRef.current?.select();
        },
        focus() {
            textareaRef.current?.focus();
        },
        setValue(value: string) {
            setValue(value);
        }
    }), []);

    useEffect(() => {
        textareaRef.current && autosize(textareaRef.current);

        return () => {
            textareaRef.current && autosize.destroy(textareaRef.current);
        }
    }, []);

    useEffect(() => {
        setValue(propValue || children);
    }, [propValue, children]);

    return (
        <textarea
            {...other}
            ref={textareaRef}
            id={id}
            name={name || id}
            value={value}
            rows={rows}
            aria-label={label}
            onChange={handleChange}
            className={classnames(styles["text-area"], {
                [styles[`text-area--${variant}`]]: variant,
                [styles[`text-area--${size}-size`]]: size,
                [styles[`text-area--${radius}-radius`]]: radius,
                [styles['text-area--full-width']]: fullWidth,
            }, className)}
        />
    );
});

export default memo(TextArea);
