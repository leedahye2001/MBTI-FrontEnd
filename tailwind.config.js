/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        teal: {
          DEFAULT: '#008080',
        },
        indigo: {
          DEFAULT: '#4B0082',
        },
        // Add more custom colors here
        fontFamily: {
          custom: ['My Font', 'sans-serif'],
        },
      },
    },
  },
  plugins: [],
};
