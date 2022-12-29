const path = require('path')

/**
 * @type {import('next-i18next').UserConfig}
 */
module.exports = {
  i18n: {
    defaultLocale: 'ja',
    locales: ['ja', 'en'],
  },
  localeExtension: 'json',
  defaultNS: 'common',
  localePath: path.resolve('./src/config/locales'),
  localeStructure: '{{lng}}/{{ns}}',
  keySeparator: '.',
  reloadOnPrerender: true,
}
