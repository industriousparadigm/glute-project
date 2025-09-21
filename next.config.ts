import type { NextConfig } from "next";
import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: false,
    // Optimize module resolution for better HMR
    optimizePackageImports: ['framer-motion']
  },
  // Webpack configuration to handle vendor chunks better
  webpack: (config, { isServer }) => {
    // Disable splitting vendor chunks for framer-motion to avoid HMR issues
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          ...config.optimization?.splitChunks,
          cacheGroups: {
            ...config.optimization?.splitChunks?.cacheGroups,
            'framer-motion': {
              test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
              name: 'framer-motion',
              priority: 10,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default withPayload(nextConfig);
