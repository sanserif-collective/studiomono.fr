const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,svelte,ts,tsx,vue}'],
  corePlugins: {
    container: false
  },
  theme: {
    colors:{
      'current': 'currentColor',
      'transparent': 'transparent',
      'black': '#151515',
      'gray': '#EAEAEA',
      'white': '#FFF'
    },
    fontFamily: {
      'body': ['Inter Variable', 'sans-serif']
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
      '3xl': ['12rem', {
        letterSpacing: '-0.07em',
        lineHeight: '1.13'
      }],
      '4xl': ['15rem', {
        letterSpacing: '-0.07em',
        lineHeight: '0.9'
      }],
      '5xl': ['40rem', {
        letterSpacing: '-0.07em',
        lineHeight: '1'
      }]
    },
    extend: {}
  },
  plugins: [
    plugin(({ addBase }) => {
      addBase({
        'html': {
          'font-size': 'clamp(14px, 1.05vw, 18px)'
        }
      })
    })
  ]
}
