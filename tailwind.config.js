/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f4f6f8',
          100: '#e3e8f0',
          200: '#c2cedf',
          300: '#9db0cb',
          400: '#5475a8', // base navy light
          500: '#2c4f86', // Primary navy
          600: '#244270',
          700: '#1d345a', // Deep navy
          800: '#162843',
          900: '#0e192a',
        },
        gold: {
          50: '#fffbf0',
          100: '#fff4d6',
          200: '#ffe3a8',
          300: '#ffcd70',
          400: '#ffaf2e',
          500: '#f59300', // Primary gold
          600: '#d97700',
          700: '#b35900',
          800: '#8f4300',
          900: '#753500',
        }
      },
      backgroundImage: {
        'hero-pattern': "url('/hero-bg.jpg')",
      },
      fontFamily: {
        sans: ['"Pretendard Variable"', 'Pretendard', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
