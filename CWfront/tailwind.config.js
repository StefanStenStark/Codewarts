const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Poppins"', ...defaultTheme.fontFamily.sans],
        serif: ['"Bluu Next"', ...defaultTheme.fontFamily.serif],
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      {
        cw: {
          primary: "#4647AD",

          secondary: "#ECBF77",
          "base-100": "#0B062A",
          "base-200": "#090523",
          "base-300": "#050315",
          "base-content": "#FFFFFF",
          "primary-content": "#FFFFFF",
        },
      },
    ],
  },
};
