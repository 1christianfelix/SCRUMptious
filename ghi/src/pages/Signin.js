import React, { useState } from "react";
import signup_signin_bg from "../images/signup-signin-bg.png";
// import signup_signin_bg_scaled from "../images/signup-signin-bg-scaled.png";
// import bg_scaled from "../images/bg-scaled.png";

import { Link } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, token } = useToken();
  const [invalidUserDisplay, setInvalidUserDisplay] = useState(false);

  const validUserCheck = () => {
    setTimeout(() => {
      if (token == null) {
        setInvalidUserDisplay(true);
      } else {
        setInvalidUserDisplay(false);
      }
    }, 500);
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    login(email, password);
    validUserCheck();
  };

  return (
    <div className="relative flex h-screen w-screen items-center justify-center font-Sudo_Var text-black">
      <img
        alt="background"
        src={signup_signin_bg}
        className="absolute -z-10 h-screen w-screen"
      />
      <div className="SIGNIN z-10 flex w-[652px] flex-col items-center gap-10 rounded-[19px] bg-slate-200 p-10 1080:scale-75 1440:scale-105">
        <p className="text-[4rem] leading-none text-dark_mode_dark">Sign In</p>
        {invalidUserDisplay && (
          <div className=" bg-red-500/75 px-6 py-4 text-2xl text-white shadow-2xl">
            Invalid Credentials!
          </div>
        )}

        <form onSubmit={handleSignin} className="flex flex-col gap-8">
          <div className="EMAIL-FIELD2 flex flex-col">
            <label
              className="ml-2 text-2xl text-dark_mode_font text-opacity-50"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="text"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-[67px] w-[468px] rounded-[19px] border-[1px] border-solid border-dark_mode_medium bg-transparent pl-5 text-2xl text-dark_mode_font transition-colors focus:border-[4px] focus:border-blue-500 focus:outline-none"
              required
            />
          </div>

          <div className="PASSWORD-FIELD2 flex flex-col">
            <label
              className="ml-2 text-2xl text-dark_mode_font text-opacity-50"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-[67px] w-[468px] rounded-[19px] border-[1px] border-solid border-dark_mode_medium bg-transparent pl-5 text-2xl text-dark_mode_font transition-colors focus:border-[4px] focus:border-blue-500 focus:outline-none"
              required
            />
          </div>

          <button
            onClick={handleSignin}
            className={`mt-[.5rem] w-[20rem] justify-center self-center rounded-[19px] ${
              !email || !password
                ? "bg-gray-400 text-gray-300"
                : "bg-blue-500 text-dark_mode_text_white hover:bg-blue-400"
            } text-[2.5rem]  transition-colors `}
            disabled={!email || !password}
          >
            Sign In
          </button>
          <div className="inline text-2xl">
            <div className="text-dark_mode_text_dark flex items-center justify-center gap-2">
              <span> Don't have an account? </span>
              <Link
                to="/signup"
                className="inline-block self-center text-blue-700 underline hover:text-slate-700"
              >
                Sign up here!
              </Link>
            </div>
            {/* <div className="flex justify-center">
              <Link
                to="/resetpassword"
                className="inline-block self-center text-white underline hover:text-slate-700"
                style={{ fontSize: "0.8em" }}
              >
                Reset Password
              </Link>
            </div> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
