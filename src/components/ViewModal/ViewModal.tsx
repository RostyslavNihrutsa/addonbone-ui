import React, {FC, memo} from "react";

import {splitProps} from "../../utils";
import {useDefaultProps} from "../../theme";

import {Modal, ModalProps, modalPropsKeys} from "../Modal";
import {View, ViewProps, viewPropsKeys} from "../View";

export type ViewModalProps = Omit<ModalProps, 'title'> & ViewProps;

const ViewModal: FC<ViewModalProps> = (props) => {
    const defaultProps = useDefaultProps('viewModal');
    const mergedProps = {...defaultProps, ...props};
    const modalProps = splitProps<ModalProps>(mergedProps, modalPropsKeys);
    const viewProps = splitProps<ViewProps>(mergedProps, viewPropsKeys);

    return (
        <Modal {...modalProps} >
            <View {...viewProps}/>
        </Modal>
    )
}

export default memo(ViewModal);
