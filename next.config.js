/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true,
    domains: ['localhost'],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Prevent undici from being bundled on the client side
      config.resolve.alias = {
        ...config.resolve.alias,
        undici: false,
      };
    }
    
    // Fix for undici module parsing issues
    config.module.rules.push({
      test: /node_modules\/undici/,
      use: 'null-loader',
    });
    
    return config;
  },
};

module.exports = nextConfig;