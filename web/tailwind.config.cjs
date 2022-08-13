const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,svelte,ts,tsx,vue}'],
  corePlugins: {
    container: false
  },
  theme: {
    screens: {
      'xl': { 'max': '1600px' },
      'md': { 'max': '1024px' },
      'sm': { 'max': '768px' },
      'portrait': { 'raw': '(orientation: portrait)' },
    },
    colors:{
      'current': 'currentColor',
      'transparent': 'transparent',
      'black': '#151515',
      'gray': '#EAEAEA',
      'white': '#FFF'
    },
    fontFamily: {
      'body': ['InterVariable', 'sans-serif']
    },
    fontSize: {
      'base': ['1rem', {
        letterSpacing: '-0.01em',
        lineHeight: '1.2'
      }],
      'lg': ['1.6rem', {
        lineHeight: '1.2'
      }],
      'xl': ['2.4rem', {
        letterSpacing: '-0.01em',
        lineHeight: '1.2'
      }],
      '2xl': ['4rem', {
        letterSpacing: '-0.07em',
        lineHeight: '1.2'
      }],
      '3xl': ['16.75vmin', {
        letterSpacing: '-0.07em',
        lineHeight: '0.9'
      }],
      '4xl': ['15.625vw', {
        letterSpacing: '-0.07em',
        lineHeight: '0.9'
      }],
      '5xl': ['50vh', {
        letterSpacing: '-0.07em',
        lineHeight: '1'
      }]
    },
    fontVariation: {
      'thin': "'wght' 100",
      'extralight': "'wght' 200",
      'light': "'wght' 300",
      'normal': "'wght' 400",
      'medium': "'wght' 500",
      'semibold': "'wght' 600",
      'bold': "'wght' 700",
      'extrabold': "'wght' 800",
      'black': "'wght' 900"
    },
    writingMode: {
      'v-rl': 'vertical-rl',
      'h-tb': 'horizontal-tb'
    },
    extend: {
      gridRowStart: {
        7: '7',
        8: '8',
        9: '9',
        10: '10',
        11: '11',
        12: '12',
        13: '13'
      },
      gridRowEnd: {
        7: '7',
        8: '8',
        9: '9',
        10: '10',
        11: '11',
        12: '12',
        13: '13'
      },
      transitionDuration: {
        DEFAULT: '500ms'
      },
      spacing: {
        'custom-space': 'var(--custom-space)',
        'custom-space-double': 'calc(var(--custom-space) * 2)'
      }
    }
  },
  plugins: [
    plugin(({ addBase, addVariant, matchUtilities, theme }) => {
      addBase({
        ':root': {
          '--custom-space': 'min(6.099vw, 5rem)',
          '--grid': 'var(--custom-space) repeat(10, 1fr) var(--custom-space)'
        },
        'html': {
          'font-size': 'clamp(14px, 1.05vw, 18px)'
        },
        'button, a': {
          'cursor': 'none'
        },
        'small': {
          'font-size': 'inherit'
        },
        'strong': {
          'font-weight': 'inherit'
        }
      })

      matchUtilities(
        {
          variation: value => ({
            'font-variation-settings': value
          })
        },
        { values: theme('fontVariation') }
      )

      matchUtilities(
        {
          writing: value => ({
            'writing-mode': value
          })
        },
        { values: theme('writingMode') }
      )

      addVariant('children', '& > *')
      addVariant('owl', '& > * + *')
      addVariant('is-hover', '[data-is-hover] &')
    })
  ]
}
