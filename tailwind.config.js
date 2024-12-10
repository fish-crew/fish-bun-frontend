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
      fontFamily: {
        hakgyo: ['HakgyoansimGeurimilgiTTF-R', 'sans-serif'],
        kyoboHand: ['KyoboHand', 'sans-serif'],
      },
      fontSize: {
        title: '5dvh',
        sz25: '2.5dvh',
        sz30: '3dvh',
        sz35: '3.5dvh',
        sz40: '4dvh',
        sz45: '4.5dvh',
        lg: '3dvh'
      },
    },
  },
  plugins: [],
};
