/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.js', './src/**/*.jsx'],
  theme: {
    extend: {
      colors: {
        primary: '#243665'
      },
      screens: {
        'screen-lg': { max: '914px' },
        'screen-mid': { max: '724px' },
        'screen-base': { max: '540px' },
        'screen-sm': { max: '280px' }
      }
    }
  },
  plugins: []
};
