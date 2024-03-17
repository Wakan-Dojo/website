module.exports = {
  content: [
    `./src/pages/**/*.{js,jsx,ts,tsx}`,
    `./src/components/**/*.{js,jsx,ts,tsx}`,
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Libre Franklin"',
          '"Helvetica Neue"',
          "helvetica",
          "arial",
          "sans-serif",
        ],
      },
      dropShadow: {
        sm: ".5px .5px 1px black",
        lg: "1px 1px 2px black",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
