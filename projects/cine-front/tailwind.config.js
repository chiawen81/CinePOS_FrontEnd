/** @type {import('tailwindcss').Config} */



module.exports = {
  content: [
    "projects/cine-front/src/**/*.html",
    "projects/cine-front/src/**/*.scss"
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        blue: {
          500: '#4287f5',
        }
      }
    },
  },
  plugins: [],
}

