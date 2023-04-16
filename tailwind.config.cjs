/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {}
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        dark: {
          ...require("daisyui/src/colors/themes")["[data-theme=dark]"],
          "base-300": "#1b2123",
          "base-100": "#1b2123",
          primary: "#2c363a",
          "--btn-text-case": "normal",
          warning: "#751b37"
        }
      }
    ]
  }
};
