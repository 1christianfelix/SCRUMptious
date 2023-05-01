import React from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import "../App.css";

const ThemeSwitch = ({ theme, toggleTheme }) => {
  return (
    <div className="relative inline-flex items-center">
      <div className="rounded-full bg-gray-200 w-20 h-8 p-1">
        <button
          onClick={toggleTheme}
          className={`focus:outline-none w-16 h-6 rounded-full transition-colors duration-300 ease-in-out ${
            theme === "dark" ? "ml-8" : ""
          }`}
        >
          <div
            className={`w-6 h-6 rounded-full transition-transform duration-300 ease-in-out ${
              theme === "light"
                ? "bg-yellow-500 transform translate-x-0"
                : "bg-gray-700 transform translate-x-full"
            }`}
          >
            {theme === "dark" && (
              <div
                className={`focus:outline-none w-16 h-8 rounded-full p-1 transition-colors duration-300 ease-in-out ${
                  theme === "dark" ? "ml-8 transform translate-x-1" : ""
                }`}
              ></div>
            )}
          </div>
        </button>
      </div>
      <div
        className={`absolute ${
          theme === "dark" ? "left-0" : "right-0"
        } w-8 h-8 rounded-full transition-colors duration-300 ease-in-out`}
      >
        {theme === "light" ? (
          <FiSun className="w-5 h-5 m-1" />
        ) : (
          <FiMoon className="w-5 h-5 m-1" />
        )}
      </div>
    </div>
  );
};

export default ThemeSwitch;
