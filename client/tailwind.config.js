/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary:  '#8A1B61',
        dark:     '#252335',
        navy:     '#3F3D56',
        'light-bg': '#F2F2F2',
      },
      fontFamily: {
        gilda:     ['"Gilda Display"', 'serif'],
        josefin:   ['"Josefin Sans"', 'sans-serif'],
        delafield: ['"Mrs Saint Delafield"', 'cursive'],
      },
    },
  },
  plugins: [],
}
