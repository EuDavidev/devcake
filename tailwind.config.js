/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        rosecake: "var(--rosa-color)",
        rosecakeLight: "var(--rosa-light-color)",
        creamcake: "var(--creme-color)",
        orangecake: "var(--laranja-light-color)",
        browndev: "var(--marrom-color)",
        productbg: "var(--background-produtos)",
      },
      fontFamily: {
        title: ["Poppins", "sans-serif"],
        body: ["Raleway", "sans-serif"],
      },
      keyframes: {
        ripple: {
          "0%": { transform: "scale(0)", opacity: "0.55" },
          "100%": { transform: "scale(2.4)", opacity: "0" },
        },
      },
      animation: {
        ripple: "ripple 550ms ease-out",
      },
    },
  },
  plugins: [],
};
