/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,html}"],
  theme: {
    extend: {
      colors: {
        primary: "#667788",
        secondary: "#20262e",
        background: "#15171c",
        backgroundLight: "#ccdded",
        accent: "#05ab1e",
        orange: "#F27405",
        text: "#99AABB",
        subText: "#8899AA",
      },
      fontFamily: {
        lato: ["Lato", "sans-serif"],
      },
    },
  },
  plugins: [],
};
