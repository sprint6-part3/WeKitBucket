/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontSize: {
        "xxs-regular": ["8px", { lineHeight: "10px", fontWeight: "400" }],
        "xxs-medium": ["8px", { lineHeight: "10px", fontWeight: "500" }],
        "xs-regular": ["8px", { lineHeight: "10px", fontWeight: "400" }],
        "xs-bold-10": ["10px", { lineHeight: "12px", fontWeight: "700" }],
        "xs-bold": ["10px", { lineHeight: "11.5px", fontWeight: "700" }],
        "sm-regular-12": ["12px", { lineHeight: "18px", fontWeight: "400" }],
        "sm-regular-14": ["14px", { lineHeight: "17px", fontWeight: "500" }],
        "sm-regular": ["16px", { lineHeight: "18.4px", fontWeight: "400" }],
        "sm-bold": ["16px", { lineHeight: "18.4px", fontWeight: "700" }],
        "md-bold-18": ["18px", { lineHeight: "32px", fontWeight: "bold" }],
        "md-bold-20": ["20px", { lineHeight: "32px", fontWeight: "bold" }],
        "md-semibold": ["20px", { lineHeight: "32px", fontWeight: "600" }],
        "md-medium": ["20px", { lineHeight: "32px", fontWeight: "500" }],
        "md-regular": ["20px", { lineHeight: "32px", fontWeight: "400" }],
        "lg-bold-24": ["24px", { lineHeight: "32px", fontWeight: "bold" }],
        "lg-semibold": ["24px", { lineHeight: "32px", fontWeight: "600" }],
        "lg-medium": ["24px", { lineHeight: "32px", fontWeight: "500" }],
        "lg-regular": ["24px", { lineHeight: "32px", fontWeight: "400" }],
        "xl-bold-24": ["24px", { lineHeight: "29px", fontWeight: "700" }],
        "xl-bold-32": ["32px", { lineHeight: "46px", fontWeight: "bold" }],
        "xl-regular-32": ["32px", { lineHeight: "36px", fontWeight: "400" }],
        "xl-bold-36": ["36px", { lineHeight: "46px", fontWeight: "bold" }],
        "lg-bold": ["40px", { lineHeight: "42px", fontWeight: "bold" }],
        "lg-light": ["40px", { lineHeight: "46px", fontWeight: "300" }],
        "2xl-semibold": ["48px", { lineHeight: "46px", fontWeight: "600" }],
        "2xl-regular-50": ["50px", { lineHeight: "57.5px", fontWeight: "400" }],
        "3xl-light": ["60px", { lineHeight: "69px", fontWeight: "300" }],
        "3xl-bold": ["60px", { lineHeight: "69px", fontWeight: "700" }],
        "5xl-bold": ["90px", { lineHeight: "103.5px", fontWeight: "700" }],
      },
      colors: {
        "primary-gray": {
          100: "#F7F7FA",
          200: "#E4E5F0",
          300: "#C8CADA",
          400: "#8F95B2",
          500: "#474D66",
          600: "#3B415B",
          800: "#A1A1A1",
          900: "#A4A1AA",
        },
        "primary-green": {
          100: "#EEF9F6",
          200: "#4CBFA4",
          300: "#32A68A",
        },
        "primary-red": {
          100: "#FBEBED",
          200: "#D14343",
          300: "#cf0422",
        },
        "primary-purple": {
          100: "#8E66FF",
        },
        "primary-yellow": {
          100: "#FDD181",
        },
        "primary-black": {
          100: "#111322",
          200: "#1B1B1B",
        },
      },
      fontFamily: {
        sans: ["Pretendard", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        "custom-shadow": "0px 4px 20px 0px #00000014",
        "custom-all": "0 0 10px rgba(0, 0, 0, 0.1)",
      },
      animation: {
        "fade-in": "fadeIn 0.25s ease-out forwards",
        "fade-out": "fadeOut 0.25s ease-in forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeOut: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
      },
    },
  },
  plugins: [],
};
