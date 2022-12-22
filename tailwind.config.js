const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */

const minimum = 0.125 // default: 2px
const resize = 0.875 //

const extendColors = {
  // darkMode:classにはしない
  // テーマによって動的変わる色の定義は、CSS変数で決める
  fc: {
    primary: 'var(--font-color-primary)',
    basis: 'var(--font-color-basis)',
    secondary: 'var(--font-color-secondary)',
    link: 'var(--font-color-link)',
    hint: 'var(--font-color-hint)',
  },
  bc: {
    basis: 'var(--bg-color-basis)',
    sheet: 'var(--bg-color-sheet)',
    header: 'var(--bg-color-header)',
  },
  accent: {
    DEFAULT: '#1a2b55',
    blind: '#445061',
  },
  primary: {
    natural: colors.emerald[100],
    light: colors.emerald[300],
    DEFAULT: colors.emerald[400],
    dark: colors.emerald[500],
  },
  secondary: {
    natural: colors.pink[100],
    light: colors.pink[300],
    DEFAULT: colors.pink[400],
    dark: colors.pink[500],
  },
  disabled: {
    natural: colors.gray[200],
    light: colors.gray[200],
    DEFAULT: colors.gray[300],
    dark: colors.gray[400],
  },
  success: {
    natural: '#e6f4d5',
    light: '#3FDF83',
    DEFAULT: '#00a241',
    dark: '#008A00',
  },
  danger: {
    natural: '#FFEFF2',
    light: '#FF7670',
    DEFAULT: '#FD444A',
    dark: '#eb272e',
  },
  warning: {
    natural: '#FFE99B',
    light: '#FFD815',
    DEFAULT: '#F7CA00',
    dark: '#cc8c04',
  },
  white: {
    light: '#fff',
    DEFAULT: '#fff',
    dark: '#f3f4f6',
  },
  black: {
    light: '#393939',
    DEFAULT: '#393939',
    dark: '#1f2937',
  },
  task: {
    // オレンジ
    natural: colors.orange['100'],
    light: colors.orange['400'],
    DEFAULT: '#FF7800',
    dark: colors.orange['600'],
  },
  minutes: {
    // 緑
    natural: colors.green['100'],
    light: colors.green['400'],
    DEFAULT: '#00B901',
    dark: colors.green['600'],
  },
  schedule: {
    // 青
    natural: colors.blue['100'],
    light: colors.blue['400'],
    DEFAULT: colors.blue['500'],
    dark: colors.blue['600'],
  },
  chat: {
    // 紫
    natural: colors.purple['100'],
    light: colors.purple['400'],
    DEFAULT: colors.purple['500'],
    dark: colors.purple['600'],
  },
}

module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/stories/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: extendColors,
      minHeight: {
        screen: '100dvh',
        header: '4rem',
      },
      height: {
        screen: '100dvh',
        header: '4rem',
      },
      transitionDuration: {
        basis: '200ms',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
