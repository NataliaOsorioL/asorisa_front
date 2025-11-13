/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif']
      },
      colors: {
        primary: '#00FFB2',
        dark: '#000000',
        light: '#FFFFFF'
      }
    }
  },
  plugins: []
};
