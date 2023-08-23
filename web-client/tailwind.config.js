/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#EBEEFA",
          100: "#D7DCF4",
          200: "#AFB9E9",
          300: "#8695DD",
          400: "#5E72D2",
          500: "#364FC7",
          600: "#293B95",
          700: "#1B2864",
          800: "#0E1432",
          900: "#050814",
        },
        secondary: {
          50: "#FAEAEA",
          100: "#F4D4D4",
          200: "#E9AAAA",
          300: "#DF7F7F",
          400: "#D45555",
          500: "#C92A2A",
          600: "#972020",
          700: "#651515",
          800: "#320B0B",
          900: "#140404",
        },
      },
    },
  },
  plugins: [],
};
