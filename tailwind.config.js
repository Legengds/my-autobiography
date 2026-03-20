/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#8B7355',
        secondary: '#C4A77D',
        accent: '#D4AF37',
        surface: '#FFFDF7',
        muted: '#8B7D6B',
      },
    },
  },
  plugins: [],
}
