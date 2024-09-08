import React from 'react'
import { Tooltip as TooltipUi } from "@nextui-org/react";

interface TooltipProps {
    content: string;
    className?: string;
    children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ className,children, content }) => {
    return (
        <TooltipUi
            content={content ?? ""}
            closeDelay={100}
            className={className}
            classNames={{
                content: `bg-black text-white font-medium ${!content && 'hidden'}`,
            }}
        >
            {children}
        </TooltipUi>
    )
}

export default Tooltip