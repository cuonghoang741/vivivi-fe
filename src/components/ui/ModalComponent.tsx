import React, {useMemo} from 'react'
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";

interface ModalProps {
    isOpen: boolean;
    handleClose: () => void;
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full",
    children: React.ReactNode;
    options?: any,
    isDismissable?: boolean,
    scrollBehavior?: "inside" | "outside" | 'normal',
    hideCloseButton?: boolean;
    dialogClassName?: string;
    placement?: "auto" | "top" | "center" | "bottom";
}

const ModalComponent: React.FC<ModalProps> = ({ isOpen, dialogClassName, handleClose, size, children, options = {}, isDismissable = true, scrollBehavior = "outside", hideCloseButton = false, placement = 'auto' }) => {
    const padding = useMemo(()=>{
        if (!size || size === "lg"){
            return "md:p-8 p-4"
        }
    },[size])

    return (
        <Modal
            size={(size ?? "md")}
            isOpen={isOpen}
            onClose={handleClose}
            scrollBehavior={scrollBehavior}
            isDismissable={isDismissable}
            className={dialogClassName}
            isKeyboardDismissDisabled={true}
            hideCloseButton={hideCloseButton}
            placement={placement}
            classNames={{
                backdrop: "bg-black/50 z-[10000]",
                wrapper: 'z-[10000] modal-component',
                ...options
            }}
        >
            <ModalContent className={`bg-white rounded-3xl ${padding}`}>
                {children}
            </ModalContent>
        </Modal>
    )
}

export default ModalComponent