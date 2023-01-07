const { i18n } = require('./next-i18next.config')

/** @type {import('next').NextConfig} */

const assetUrl = process.env.NEXT_PUBLIC_STORAGE_URL ?? 'http://localhost:3000'

const nextConfig = {
  i18n,
  images: {
    domains: ['asset.work-manager.site'],
  },
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    // allowMiddlewareResponseBody: true,
    // appDir: true,
    scrollRestoration: true,
  },
  webpack(config) {
    config.externals.push({
      encoding: 'encoding',
      'aws-crt': 'aws-crt',
    })
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
}

module.exports = nextConfig
