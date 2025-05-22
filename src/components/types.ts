import type {
    AvatarProps,
    ButtonProps,
    CheckboxProps,
    DialogProps,
    DrawerProps,
    FooterProps,
    HeaderProps,
    HighlightProps,
    IconProps,
    IconButtonProps,
    ListProps,
    ListItemProps,
    ModalProps,
    OdometerProps,
    ScrollAreaProps,
    SwitchProps,
    TagProps,
    TextAreaProps,
    TextFieldProps,
    ToastProps,
    TooltipProps,
    ViewProps,
    ViewDrawerProps,
    ViewModalProps,
} from "../components";

export interface ComponentsProps {
    avatar?: Pick<AvatarProps, 'size' | 'radius' | 'cursorPointer' | 'delayMs'>;
    button?: Pick<ButtonProps, 'variant' | 'color' | 'size' | 'radius'>;
    checkbox?: Pick<CheckboxProps, 'variant' | 'size' | 'radius' | 'checkedIcon' | 'indeterminateIcon'>;
    dialog?: DialogProps;
    drawer?: DrawerProps;
    footer?: FooterProps;
    header?: Pick<HeaderProps, 'alignCenter' | 'before' | 'after'>;
    highlight?: HighlightProps;
    icon?: Omit<IconProps, 'name'>;
    iconButton?: Pick<IconButtonProps, 'variant' | 'size' | 'radius'>;
    list?: ListProps;
    listItem?: ListItemProps;
    modal?: ModalProps;
    odometer?: Pick<OdometerProps, 'auto' | 'format' | 'duration'>;
    scrollArea?: ScrollAreaProps;
    switch?: SwitchProps;
    tag?: Pick<TagProps, 'variant' | 'size' | 'color' | 'radius' | 'clickable'>;
    textArea?: TextAreaProps;
    textField?: TextFieldProps;
    toast?: Pick<ToastProps, 'side' | 'duration' | 'swipeDirection' | 'swipeThreshold' | 'closeProps' | 'closeIcon' | 'fullWidth' | 'sticky' | 'radius' | 'color'>;
    tooltip?: Pick<TooltipProps, 'side' | 'align' | 'delayDuration' | 'arrowHeight' | 'arrowWidth'>;
    view?: ViewProps;
    viewDrawer?: ViewDrawerProps;
    viewModal?: ViewModalProps;
}
