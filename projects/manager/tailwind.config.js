/** @type {import('tailwindcss').Config} */



module.exports = {
  content: [
    "projects/manager/src/**/*.html",
    "projects/manager/src/**/*.scss"
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

