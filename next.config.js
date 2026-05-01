/**
 * @type {import('next').NextConfig}
 */

const withVercelAnalytics = require('@vercel/analytics/next');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Images optimisées
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // En-têtes de sécurité
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  // Redirections
  redirects: async () => {
    return [
      {
        source: '/old-dashboard',
        destination: '/',
        permanent: true,
      },
    ];
  },

  // Variables d'environnement
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },

  // Optimisations de compilation
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Support des expériences Vercel
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'chart.js',
    ],
  },
};

module.exports = withVercelAnalytics(nextConfig);
