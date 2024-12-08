/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        "point-color": "#E54731",
      },
      spacing: {
        dvh: "100dvh",
      },
    },
  },
  plugins: [],
};
