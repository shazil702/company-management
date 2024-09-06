/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        '393053': '#393053',
        '18122B': '#18122B',
        '635985': '#635985',
        'EEEEEE': '#EEEEEE',
      },
    },
  },
  plugins: [],
}