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
    // No longer needed after removing Firebase
    return config;
  },
};

module.exports = nextConfig;