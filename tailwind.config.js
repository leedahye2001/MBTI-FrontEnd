/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-400": "#8234E5",
        "primary-300": "#798CF0",
        "primary-200": "#929BF0",
        "primary-100": "#A2BBEB",
        fontFamily: {
          custom: ["Noto Sans KR", "sans-serif"],
        },
      },
    },
  },
  plugins: [],
};
