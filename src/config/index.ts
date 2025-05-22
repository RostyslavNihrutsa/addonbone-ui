import type {ComponentsProps} from '../components'
import type {Icons} from '../providers'

export {AvatarSize, AvatarRadius} from '../components/Avatar'
export {ButtonColor, ButtonSize, ButtonRadius, ButtonVariant} from '../components/Button'
export {CheckboxVariant, CheckboxRadius, CheckboxSize} from '../components/Checkbox'
export {DrawerSide} from '../components/Drawer'
export {HighlightColor} from '../components/Highlight'
export {IconButtonSize, IconButtonVariant, IconButtonRadius} from '../components/IconButton'
export {ModalRadius} from '../components/Modal'
export {TagVariant, TagColor, TagRadius, TagSize} from '../components/Tag'
export {TextAreaSize, TextAreaVariant} from '../components/TextArea'
export {TextFieldAccent, TextFieldSize, TextFieldVariant} from '../components/TextField'
export {ToastColor, ToastRadius, ToastSide} from '../components/Toast'

export type {ComponentsProps} from '../components'

export interface Config {
    props: ComponentsProps;
    icons: Icons;
}

export const defineConfig = (config: Partial<Config>): Config => {
    const {props = {}, icons = {}} = config
    return {props, icons}
}
