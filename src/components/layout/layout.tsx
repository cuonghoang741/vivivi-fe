import React from "react";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import {NextUIProvider} from "@nextui-org/react";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from "@/auth/AuthContext";

const Layout = async ({
                          children,
                      }: Readonly<{
    children: React.ReactNode,
}>) => {

    return (
        <>
            <NextUIProvider>
                <AuthProvider>
                    <div>
                        <Header/>
                        {children}
                        <ToastContainer/>
                        <Footer/>
                    </div>
                </AuthProvider>
            </NextUIProvider>
        </>
    )
}

export default Layout