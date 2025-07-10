import {SvgSpriteProps} from "../components";
import {ComponentsProps} from "../components/types";

export type {ComponentsProps};

export type Icons = SvgSpriteProps["icons"];

export interface ExtraProps {}

export interface Config {
    components: ComponentsProps;
    extra: ExtraProps;
    icons: Icons;
}
