/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#f5a623",
        dark: "#0a0a0f",
        surface: "#12121a",
        card: "#1a1a26",
        muted: "#6b6b80",
      },
      fontFamily: {
        display: ["Bebas Neue", "cursive"],
        body: ["DM Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};