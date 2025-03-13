import React, {FC, memo, ReactNode,} from "react";
import classnames from "classnames";
import {
    Arrow,
    Content,
    Portal,
    Provider,
    Root,
    TooltipContentProps,
    TooltipProps as TooltipRootProps,
    Trigger
} from '@radix-ui/react-tooltip';

import styles from "./tooltip.module.scss"

export interface TooltipProps extends TooltipRootProps, TooltipContentProps {
    description: ReactNode;
    arrowWidth?: number;
    arrowHeight?: number;
    matchTriggerWidth?: boolean;
    arrowClassName?: string;
    contentClassName?: string;
}

const TooltipComponent: FC<TooltipProps> = (props) => {
    const {
        open,
        defaultOpen,
        disableHoverableContent,
        delayDuration,
        onOpenChange,

        arrowWidth,
        arrowHeight,
        matchTriggerWidth,
        description,
        arrowClassName,
        contentClassName,
        children,
        ...other
    } = props;

    return (
        <Provider>
            <Root
                open={open}
                defaultOpen={defaultOpen}
                disableHoverableContent={disableHoverableContent}
                onOpenChange={onOpenChange}
                delayDuration={delayDuration}
            >
                <Trigger asChild>
                    {children}
                </Trigger>
                <Portal>
                    <Content
                        className={classnames(styles["tooltip-content"],
                            {
                              [styles["tooltip-content--trigger-width"]]: matchTriggerWidth
                            },
                            contentClassName
                        )}
                        {...other}
                    >
                        {description}
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

export const Tooltip = memo(TooltipComponent);
