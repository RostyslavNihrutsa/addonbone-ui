import React, {memo, ReactNode, forwardRef, ForwardRefRenderFunction} from "react";
import classnames from "classnames";
import {
    Arrow,
    Content,
    Portal,
    Provider,
    Root,
    TooltipContentProps,
    TooltipProps as TooltipRootProps,
    Trigger,
} from "@radix-ui/react-tooltip";

import {useComponentProps} from "../../providers";

import styles from "./tooltip.module.scss";

export interface TooltipProps extends TooltipRootProps, Omit<TooltipContentProps, "content"> {
    content: ReactNode;
    arrowWidth?: number;
    arrowHeight?: number;
    matchTriggerWidth?: boolean;
    arrowClassName?: string;
    contentClassName?: string;
}

const Tooltip: ForwardRefRenderFunction<HTMLDivElement, TooltipProps> = (props, ref) => {
    const {
        open,
        defaultOpen,
        disableHoverableContent,
        delayDuration,
        onOpenChange,

        arrowWidth,
        arrowHeight,
        matchTriggerWidth,
        content,
        arrowClassName,
        contentClassName,
        children,
        ...other
    } = {...useComponentProps("tooltip"), ...props};

    return (
        <Provider>
            <Root
                open={open}
                defaultOpen={defaultOpen}
                disableHoverableContent={disableHoverableContent}
                onOpenChange={onOpenChange}
                delayDuration={delayDuration}
            >
                <Trigger asChild>{children}</Trigger>
                <Portal>
                    <Content
                        ref={ref}
                        className={classnames(
                            styles["tooltip-content"],
                            {
                                [styles["tooltip-content--trigger-width"]]: matchTriggerWidth,
                            },
                            contentClassName
                        )}
                        {...other}
                    >
                        {content}
                        <Arrow
                            width={arrowWidth}
                            height={arrowHeight}
                            className={classnames(styles["tooltip-arrow"], arrowClassName)}
                        />
                    </Content>
                </Portal>
            </Root>
        </Provider>
    );
};

export default memo(forwardRef(Tooltip));
