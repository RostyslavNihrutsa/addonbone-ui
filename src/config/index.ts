import {ComponentsProps, Config, ExtraProps, Icons} from "../types/config";

export {AvatarSize, AvatarRadius} from "../components/Avatar";
export {ButtonColor, ButtonSize, ButtonRadius, ButtonVariant} from "../components/Button";
export {CheckboxVariant, CheckboxRadius, CheckboxSize} from "../components/Checkbox";
export {DrawerSide} from "../components/Drawer";
export {HighlightColor} from "../components/Highlight";
export {IconButtonSize, IconButtonVariant, IconButtonRadius} from "../components/IconButton";
export {ModalRadius} from "../components/Modal";
export {TagVariant, TagColor, TagRadius, TagSize} from "../components/Tag";
export {TextAreaSize, TextAreaVariant} from "../components/TextArea";
export {TextFieldAccent, TextFieldSize, TextFieldVariant} from "../components/TextField";
export {ToastColor, ToastRadius, ToastSide} from "../components/Toast";

export type {ComponentsProps, Config, ExtraProps, Icons};

export const defineConfig = (config: Partial<Config>): Config => {
    const {components = {}, extra = {}, icons = {}} = config;
    return {components, extra, icons};
};
