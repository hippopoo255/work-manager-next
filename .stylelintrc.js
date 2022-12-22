module.exports = {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-recess-order'],
  ignoreFiles: ['src/scss/Foundation/_tailwind.scss'],
  rules: {
    // allow blank in {css, scss} file
    'no-empty-source': null,
    // allow isEmpty in `.class-name { }`
    'block-no-empty': null,
    // classname: BEM / kebab(BE) + snake(M)
    'selector-class-pattern': /^[a-z\-][a-zA-Z0-9_\-]+$/,
    // variable: camelCase
    'scss/dollar-variable-pattern': /^[a-zA-Z0-9]+$/,
    // mixin: camelCase
    'scss/at-mixin-pattern': /^[a-z][a-zA-Z0-9]+$/,
    'scss/at-extend-no-missing-placeholder': null,
    // @
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'responsive',
          'extend',
          'media',
          'screen',
          'mixin',
          'include',
          'function',
          'return',
          'use',
          'each',
          'for',
          'if',
          'else',
          'else if',
        ],
      },
    ],
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'extend',
          'responsive',
          'media',
          'screen',
          'mixin',
          'include',
          'function',
          'return',
          'use',
          'each',
          'for',
          'if',
          'else',
          'else if',
        ],
      },
    ],
  },
}
