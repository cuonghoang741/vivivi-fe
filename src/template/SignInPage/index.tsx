"use client";

import SignInModal from "@/components/modals/SignInModal";
import { useDisclosure } from "@nextui-org/modal";
import { useEffect } from "react";
const SignInPage = () => {
    const {isOpen, onOpen, onClose} = useDisclosure();

    useEffect(() => {
        onOpen();
    }, []);

    return (
        <div>
            <SignInModal isOpen={isOpen} onClose={onClose}/>
        </div>
    );
};

export default SignInPage;
