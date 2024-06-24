/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "primary-gray": {
          100: "#F7F7FA",
          200: "#E4E5F0",
          300: "#C6CADA",
          400: "#8F95B2",
          500: "#474D66",
          600: "#3B415B",
        },
        "primary-green": {
          100: "#EEF9F6",
          200: "#4CBFA4",
          300: "#32A68A",
        },
        "primary-red": {
          100: "#FBEBED",
          200: "#D14343",
        },
        "primary-purple": {
          100: "#8E66FF",
        },
        "primary-yellow": {
          100: "#FDD181",
        },
      },
      fontFamily: {
        sans: ["Pretendard", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};
