import React from "react";
import signup_signin_bg from "../images/signup-signin-bg.png";

const Signin = () => {
  return (
    <div className="relative h-screen w-screen flex items-center justify-center font-Sudo_Var text-black">
      <img
        src={signup_signin_bg}
        className="absolute -z-10 w-screen h-screen "
      />
      <div className="SIGNUP z-10 h-[553px] w-[652px] backdrop-blur-[9.3px] bg-[#c1c1c1]/50 flex flex-col items-center gap-10 1080:scale-75 1440:scale-105">
        <p className="p-[.5rem] pl-[1rem] mb-[1rem] text-[4rem] leading-none self-start text-dark_mode_dark">
          Sign In
        </p>
        <div className="w-[468px] h-[67px] bg-[#c0c0c0] bg-opacity-[.3] border-solid border-dark_mode_medium border-[1px] rounded-[19px] flex">
          <input
            type="text"
            placeholder="Email"
            className="w-[100%] pl-5 text-2xl bg-transparent transition-colors focus:outline-[#c1c1c1] focus:rounded-[19px] placeholder:text-dark_mode_font placeholder:text-2xl hover:bg-[#fff] hover:bg-opacity-[.15] rounded-[19px]"
          />
        </div>
        <div className="w-[468px] h-[67px] bg-[#c0c0c0] bg-opacity-[.3] border-solid border-dark_mode_medium border-[1px] rounded-[19px] flex">
          <input
            type="text"
            placeholder="Password"
            className="w-[100%] pl-5 text-2xl bg-transparent transition-colors focus:outline-[#c1c1c1] focus:rounded-[19px] placeholder:text-dark_mode_font placeholder:text-2xl hover:bg-[#fff] hover:bg-opacity-[.15] rounded-[19px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Signin;
