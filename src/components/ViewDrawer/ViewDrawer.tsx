import React, {FC, memo} from "react";

import {splitProps} from "../../utils";
import {useDefaultProps} from "../../theme";

import {Drawer, DrawerProps, drawerPropsKeys} from "../Drawer";
import {View, ViewProps, viewPropsKeys} from "../View";

export type ViewDrawerProps = Omit<DrawerProps, 'title'> & ViewProps;

const ViewDrawer: FC<ViewDrawerProps> = (props) => {
    const defaultProps = useDefaultProps('viewDrawer');
    const mergedProps = {...defaultProps, ...props};
    const drawerProps = splitProps<DrawerProps>(mergedProps, drawerPropsKeys);
    const viewProps = splitProps<ViewProps>(mergedProps, viewPropsKeys);

    return (
        <Drawer {...drawerProps}>
            <View {...viewProps}/>
        </Drawer>
    )
}

export default memo(ViewDrawer);
