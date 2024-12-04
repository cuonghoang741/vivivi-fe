import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import { GoogleTagManager } from '@next/third-parties/google'
import Script from "next/script";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "VIVIVI - AI DIGITAL GIRLFRIENDS",
    description: "AI DIGITAL GIRLFRIENDS - Your soulmate, anytime, anywehre",
};

export default async function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {


    return (
        <html lang="en" className={"dark"}>
        <head>
            <meta property="og:image"
                  content="/meta-og-image.png"/>
        </head>
        <body className={inter.className}>
        {children}
        </body>
        </html>
    );
}
