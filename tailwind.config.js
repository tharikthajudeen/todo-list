/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // or 'media' if you prefer using the user's system preference
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightBrown: '#f2c48a',
        darkBrown: '#b87734',
        midBrown: '#d68f47',
        darkbg: '#a16722',
        lightbg: '#e1a567'
      },
    },
  },
  plugins: [],
}

