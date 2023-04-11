/** @type {import('tailwindcss').Config} */



module.exports = {
  content: [
    "projects/staff/src/**/*.html",
    "projects/staff/src/**/*.scss"
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

