const forms = require('@tailwindcss/forms');
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.js', './src/**/*.jsx'],
  theme: {
    extend: {
      colors: {
        primary: '#243665',
        grayText: '#ababab',
        thickGrayText: '#666666'
      },
      printColorAdjust: {
        exact: 'exact'
      },
      screens: {
        'screen-lg': { max: '1020px' },
        'screen-mid': { max: '800px' },
        'screen-base': { max: '540px' },
        'screen-sm': { max: '280px' }
      }
    },
    fontSize: {
      xs: '1rem',
      sm: '1.4rem',
      base: '1.6rem',
      lg: '1.8rem',
      xl: '2rem',
      '2xl': '3rem',
      '3xl': '3.5rem',
      '4xl': '4rem',
      '5xl': '4.5rem',
      '6xl': '5rem'
    }
  },
  plugins: [forms]
};
