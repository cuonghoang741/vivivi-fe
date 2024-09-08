import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import { GoogleTagManager } from '@next/third-parties/google'
import Script from "next/script";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Statio.vn - Art of Data ",
    description: "BIẾN CON SỐ “CÂN NÃO” THÀNH BIỂU ĐỒ SỐNG ĐỘNG CÙNG VỚI STATIO",
};

export default async function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {


    return (
        <html lang="en" className={"light"}>
        <head>
            <meta property="og:image"
                  content="/meta-og-image.png"/>
        </head>
        <body className={inter.className}>
        {children}

        <GoogleTagManager gtmId="G-SSD0Z1FTX1" />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-SSD0Z1FTX1" />
        <Script id="google-analytics" strategy="afterInteractive">
            {`
                window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', 'G-SSD0Z1FTX1');
        `}
        </Script>
        </body>
        </html>
    );
}
