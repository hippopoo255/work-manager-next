module.exports = {
  extends: ['next/core-web-vitals', 'plugin:storybook/recommended', 'prettier'],
  rules: {
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
        },
      },
    ],
  },
}
