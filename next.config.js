/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/api-game\.bloque\.app\/game\/leaderboard/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'leaderboard-api',
        expiration: {
          maxEntries: 5,
          maxAgeSeconds: 300,
        },
      },
    },
    {
      urlPattern: /^\/$/,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'home-page',
        expiration: {
          maxEntries: 1,
          maxAgeSeconds: 3600,
        },
      },
    },
  ],
});

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production'
        ? {
            exclude: ['error', 'warn'],
          }
        : false,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=86400',
          },
          {
            key: 'Service-Worker-Allowed',
            value: '/',
          },
        ],
      },
    ];
  },
  webpack: (config) => {
    return config;
  },
};

module.exports = withPWA(nextConfig);