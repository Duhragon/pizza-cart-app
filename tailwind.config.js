/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: "Roboto Mono, monospace",
    },

    extend: {
      height: {
        screen: "100dvh",
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        purple: "#3f3cbb",
        "h-purple": "#4d4bca",
        "input-outline": "#706fd2",
        metal: "#565584",
        "highlight-font": "#F4EEE0",
        "font-link": "#aea9e9",
        "h-font-link": "#c9c5f3",
        font: "#ecebff",
        "light-font": "#cac9dc",
        "header-bg": "#3a3f53",
        "primary-bg": "#2d2f3e",
        "header-font": "#F4EEE0",
        "secondary-bg": "#313343",
        outline: "#42455a",
        "font-dark": "#b8b7c9",
      },
      rotate: {
        315: "315deg",
      },
    },
  },
  plugins: [
    // ...
    require("tailwind-scrollbar"),
  ],
};
