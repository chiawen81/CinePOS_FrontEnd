/** @type {import('tailwindcss').Config} */



module.exports = {
  content: [
    "projects/cine-back/src/**/*.html",
    "projects/cine-back/src/**/*.scss"
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        blue: {
          500: '#da42f5',
        }
      }
    },
  },
  plugins: [],
}

