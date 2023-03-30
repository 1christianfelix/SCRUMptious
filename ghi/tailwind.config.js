/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dark_mode_dark: "#272727",
        dark_mode_medium: "#333333",
        dark_mode_button_hover: "#4d4d4d",
        dark_mode_light: "#404040",
        dark_mode_text_white: "#FDFDFD",
        sticky_red: "#9C2C2C",
        sticky_red_header: "#AB3535",
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
  plugins: [],
};
