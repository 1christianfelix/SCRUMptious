import React, { useState, useContext, useEffect } from "react";
import signup_signin_bg from "../images/signup-signin-bg.png";
// import signup_signin_bg_scaled from "../images/signup-signin-bg-scaled.png";
// import bg_scaled from "../images/bg-scaled.png";

import { useNavigate, Link } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { token, login } = useToken();
  // console.log(login);
  // console.log(token);
  // console.log("test", token);
  const handleSignin = (e) => {
    e.preventDefault();

    login(email, password);
  };

  return (
    <div className="relative h-screen w-screen flex items-center justify-center font-Sudo_Var text-black">
      <img
        src={signup_signin_bg}
        className="absolute -z-10 w-screen h-screen"
      />
      <div className="SIGNIN z-10 h-[553px] w-[652px] backdrop-blur-[9.3px] bg-[#c1c1c1]/60 flex flex-col items-center gap-10 rounded-[19px] 1080:scale-75 1440:scale-105">
        <p className="p-[.5rem] pl-[1rem] mb-[1rem] text-[4rem] leading-none self-start text-dark_mode_dark">
          Sign In
        </p>
        <form onSubmit={handleSignin} className="flex flex-col gap-8">
          <div className="EMAIL-FIELD w-[468px] h-[67px] bg-[#c0c0c0] bg-opacity-[.3] border-solid border-dark_mode_medium border-[1px] rounded-[19px] flex ">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-[100%] pl-5 text-2xl bg-transparent transition-colors focus:outline-[#c1c1c1] focus:rounded-[19px] placeholder:text-dark_mode_font placeholder:text-2xl hover:bg-[#fff] hover:bg-opacity-[.15] rounded-[19px]"
              required
            />
          </div>
          <div className="w-[468px] h-[67px] bg-[#c0c0c0] bg-opacity-[.3] border-solid border-dark_mode_medium border-[1px] rounded-[19px] flex">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-[100%] pl-5 text-2xl bg-transparent transition-colors focus:outline-[#c1c1c1] focus:rounded-[19px] placeholder:text-dark_mode_font placeholder:text-2xl hover:bg-[#fff] hover:bg-opacity-[.15] rounded-[19px]"
              required
            />
          </div>

          {/* <Link to="/dashboard"> */}
          <button
            onClick={handleSignin}
            className="self-center justify-center mt-[.5rem] text-[2.5rem] w-[20rem] bg-[#008193] rounded-[19px] transition-colors text-dark_mode_text_white hover:bg-[#039CB0]"
          >
            Sign In
          </button>
          {/* </Link> */}
          <div className="text-2xl inline">
            <div className="flex items-center justify-center gap-2 text-dark_mode_text_dark">
              <span> Don't have an account? </span>
              <Link
                to="/signup"
                className="text-white self-center inline-block underline hover:text-slate-700"
              >
                Sign up here!
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};


export default Signin;
