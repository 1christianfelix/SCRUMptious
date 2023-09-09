import React, { useState } from "react";
import signup_signin_bg from "../images/signup-signin-bg.png";
// import signup_signin_bg_scaled from "../images/signup-signin-bg-scaled.png";
// import bg_scaled from "../images/bg-scaled.png";

import { Link } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useToken();

  const emptyInputCheck = () => {
    if (!email || !password) {
      console.log("Please");
    }
  };

  const handleSignin = (e) => {
    e.preventDefault();

    login(email, password);
  };

  return (
    <div className="relative flex h-screen w-screen items-center justify-center font-Sudo_Var text-black">
      <img
        alt="background"
        src={signup_signin_bg}
        className="absolute -z-10 h-screen w-screen"
      />
      <div className="SIGNIN z-10 flex h-[553px] w-[652px] flex-col items-center gap-10 rounded-[19px] bg-[#c1c1c1] 1080:scale-75 1440:scale-105">
        <p className="mb-[1rem] self-start p-[.5rem] pl-[1rem] text-[4rem] leading-none text-dark_mode_dark">
          Sign In
        </p>
        <form onSubmit={handleSignin} className="flex flex-col gap-8">
          <div className="EMAIL-FIELD flex h-[67px] w-[468px] rounded-[19px] border-[1px] border-solid border-dark_mode_medium bg-[#c0c0c0] bg-opacity-[.3] ">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-[100%] rounded-[19px] bg-transparent pl-5 text-2xl transition-colors placeholder:text-2xl placeholder:text-dark_mode_font focus:outline-none hover:bg-[#fff] hover:bg-opacity-[.15]"
              required
            />
          </div>
          <div className="flex h-[67px] w-[468px] rounded-[19px] border-[1px] border-solid border-dark_mode_medium bg-[#c0c0c0] bg-opacity-[.3]">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-[100%] rounded-[19px] bg-transparent pl-5 text-2xl transition-colors placeholder:text-2xl placeholder:text-dark_mode_font focus:rounded-[19px] focus:outline-none hover:bg-[#fff] hover:bg-opacity-[.15]"
              required
            />
          </div>
          <button
            onClick={handleSignin}
            className={`mt-[.5rem] w-[20rem] justify-center self-center rounded-[19px] ${
              !email || !password
                ? "bg-gray-600"
                : "bg-[#008193] hover:bg-[#039CB0]"
            } text-[2.5rem] text-dark_mode_text_white transition-colors `}
            disabled={!email || !password}
          >
            Sign In
          </button>
          <div className="inline text-2xl">
            <div className="text-dark_mode_text_dark flex items-center justify-center gap-2">
              <span> Don't have an account? </span>
              <Link
                to="/signup"
                className="inline-block self-center text-white underline hover:text-slate-700"
              >
                Sign up here!
              </Link>
            </div>
            <div className="flex justify-center">
              <Link
                to="/resetpassword"
                className="inline-block self-center text-white underline hover:text-slate-700"
                style={{ fontSize: "0.8em" }}
              >
                Reset Password
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
