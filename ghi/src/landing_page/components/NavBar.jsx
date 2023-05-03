import React from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <nav className="w-full fixed top-0 flex items-center justify-between p-4 text-black drop-shadow-2xl z-[100]">
      <div className="font-sudo text-2xl">SCRUMPTIOUS</div>
      <div className="flex items-center">
        <button
          className="px-4"
          onClick={() => {
            navigate("/signin");
          }}
        >
          Login
        </button>
        <button
          className="px-4"
          onClick={() => {
            navigate("/signup");
          }}
        >
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
