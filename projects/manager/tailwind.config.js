/** @type {import('tailwindcss').Config} */

module.exports = {
  purge: {
    enabled: true, // 每次編譯都觀測(若沒寫預設false則只會在正式機時才會偵測)
    content: [ // 偵測哪幾種檔案類型，其餘的會捨去
      "projects/manager/src/**/*.{html,ts,scss}",
      "projects/share-libs/src/**/*.{html,ts,scss}",
    ],
  },
  darkMode: true, // or 'media' or 'class'
  theme: {
    extend: {
      borderRadius: {
        large: '12px'
      },
      screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
      },
      colors: {
        text: {
          white: '#DDDDDD'
        },
        primary: {
          100: '#DABDFF',
          200: '#C39BFF',
          300: '#AD79FF',
          400: '#9756FF',
          500: '#9C6DFF',
          600: '#8346FF',
          700: '#6A1EFF',
          800: '#5900E6',
          900: '#4700BF',
        },
        secondary: {
          100: '#B3F3FF',
          200: '#99E9FF',
          300: '#7FDFFF',
          400: '#66D5FF',
          500: '#71DDFF',
          600: '#4DC6E6',
          700: '#29AFCC',
          800: '#0087A3',
          900: '#00627A',
        },
        dark: {
          100: '#313131',
          200: '#222222',
          300: '#1A1A1A',
          400: '#151515',
        },
        light: {
          100: 'rgba(255, 255, 255, 1)',
          200: 'rgba(255, 255, 255, 0.8)',
          300: 'rgba(255, 255, 255, 0.6)',
          400: 'rgba(255, 255, 255, 0.4)',
          500: 'rgba(255, 255, 255, 0.2)',
          600: 'rgba(255, 255, 255, 0.1)',
        },
        warn: {
          100: '#DD6A76',
          200: '#39282B'
        }
      },
      fontFamily: {
        sans: ['Graphik', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      fontSize: (() => {
        const result = {};
        for (let i = 1; i <= 100; i++) {
          result[`${i}`] = `${i}px`;
        }
        return result;
      })(),
      spacing: Object.fromEntries(Array.from({ length: 1000 }, (_, i) => [(i + 1).toString(), `${i + 1}px`])),
    },
  },
  plugins: [],
}

