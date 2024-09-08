/** @type {import('next').NextConfig} */
import path from "path";

const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },
    experimental: {
        serverComponentsExternalPackages: ['@react-pdf/renderer'],
    },
    sassOptions: {
        includePaths: [path.join('/', 'styles')],
    },
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN',
                    },
                    {
                        key: 'Content-Security-Policy',
                        value: "frame-ancestors 'self';",
                    },
                ],
            },
        ];
    },
};

export default nextConfig;

