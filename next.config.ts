import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        domains: ['skola77-3-pre-alfa.helenelund.org'],

        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: '',
                pathname: '/a/**',
            },],
    },
    experimental: {
        allowedDevOrigins: ['skola77-3-pre-alfa.helenelund.org'],
    },

};

export default nextConfig;