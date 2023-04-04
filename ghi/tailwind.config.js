/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        1440: "2560px",
        1080: "1920px",
      },
      colors: {
        dark_mode_dark: "#272727",
        dark_mode_medium: "#333333",
        dark_mode_font: "#3a3a3a",
        dark_mode_button_hover: "#4d4d4d",
        dark_mode_light: "#404040",
        dark_mode_text_white: "#FDFDFD",
        sticky_red: "#9C2C2C",
        sticky_red_header: "#AB3535",
        sticky_blue: "#273D8B",
        sticky_blue_header: "#304AA7",
        sticky_yellow: "#BABE00",
        sticky_yellow_header: "#D3D716",
        sticky_teal: "#00A3A3",
        sticky_teal_header: "#18BABA",
        sticky_green: "#009456",
        sticky_green_header: "#3AB983",
      },
      fontFamily: {
        Sudo_Var: ["Sudo-Var"],
      },
      borderRadius: {
        button: "1rem",
      },
      borderWidth: {
        button: ".1rem",
      },
      dropShadow: {
        sticky: "0 3px 3px rgba(0,0,0, 1)",
        sticky: "0 2px 3px rgba(0,0,0, .5)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
