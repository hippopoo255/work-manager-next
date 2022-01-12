// for transpiling all ESM @fullcalendar/* packages
// also, for piping fullcalendar thru babel (to learn why, see babel.config.js)
const withTM = require('next-transpile-modules')(['@fullcalendar'])

module.exports = withTM({
  i18n: {
    locales: ['en', 'ja'],
    defaultLocale: 'ja',
  },
  domains: [
    {
      domain: process.env.NEXT_PUBLIC_BASE_URL || 'localhost:3000',
      defaultLocale: 'ja',
    },
  ],
  // any other general next.js settings
  webpack5: false,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
})
