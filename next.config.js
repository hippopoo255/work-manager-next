/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    allowMiddlewareResponseBody: true,
    appDir: true,
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
