/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,html}"],
  theme: {
    extend: {
      colors: {
        primary: "#667788",
        primaryDark: "#435666",
        secondary: "#20262e",
        background: "#15171c",
        backgroundLight: "#ccdded",
        accent: "#05ab1e",
        accent2: "#42bcf5",
        orange: "#F27405",
        blue: "#40bcf4",
        text: "#99AABB",
        subText: "#8899AA",
        heading: "#d8e0e8",
      },
      fontFamily: {
        lato: ["Lato", "sans-serif"],
      },
      gridTemplateColumns: {
        layout: "40px, 1fr",
      },
    },
  },
  plugins: [],
};
