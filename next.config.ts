import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    images: {
        domains: ['skola77-3-pre-alfa.helenelund.org'],
    },
    experimental: {
        allowedDevOrigins: ['skola77-3-pre-alfa.helenelund.org'],
    },
};

export default nextConfig;