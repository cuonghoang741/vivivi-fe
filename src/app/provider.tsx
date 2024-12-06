'use client'

import { NextUIProvider } from "@nextui-org/react";
import { AuthProvider } from "@/auth/AuthContext";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { ToastContainer } from "react-toastify";
import { SessionProvider } from "next-auth/react";
import { useSession } from "next-auth/react";

const Provider = ({children}: {children: React.ReactNode}) => { 
    return (
        <SessionProvider>
            <AuthProvider>
                <NextUIProvider>
                    <div>   
                        <Header/>
                        {children}
                        <ToastContainer/>
                        <Footer/>
                    </div>
                </NextUIProvider>
            </AuthProvider>
        </SessionProvider>
    )
}

export default Provider;