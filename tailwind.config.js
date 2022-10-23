/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mygrey: "#4D4C4E",
        mygreylight: "#636263",
      },
      fontFamily: {
        spectral: ["Spectral", "serif"],
      },
    },
  },
  plugins: [],
};
