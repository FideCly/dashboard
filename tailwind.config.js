/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      fidbg: '#F5F5F5',
      fidgreen: '#5DB075',
      fidgray: '#424242',
      fidyellow: '#E5B824',
    },
    extend: {},
  },
  plugins: [require('flowbite/plugin')],
};
