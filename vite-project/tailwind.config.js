/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Serif: ["DM Serif Text", 'serif'], 
        Noto: ["Noto Sans", 'serif']
      },
    },
  },
  plugins: [],
}

