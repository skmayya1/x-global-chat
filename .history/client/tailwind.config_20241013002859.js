/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.html',
    './src/**/*.vue',
    './src/**/*.tsx',

  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
    
  ],
}

