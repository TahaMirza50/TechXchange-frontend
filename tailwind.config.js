/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    fontFamily:{
      'sans':'system-ui',
    },
    extend: {
      spacing: {
        '112' : '28rem'
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

