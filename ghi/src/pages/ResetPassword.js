import React, { useState, useContext } from "react";
import signup_signin_bg from "../images/signup-signin-bg.png";
import { useNavigate, Link, useToken } from "react-router-dom";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    const resetPasswordUrl = `${process.env.REACT_APP_SCRUMPTIOUS_SERVICE_API_HOST}/resetpassword}`;
    const response = await fetch(resetPasswordUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });

    if (response.ok) {
      alert("A password reset link has been sent to your email");
      navigate("/signin");
    } else {
      if (response.status === 400) {
        alert("Invalid email address");
      } else {
        console.log("Reset password request failed");
      }
    }
  };

  return (
    <div className="relative h-screen w-screen flex items-center justify-center font-Sudo_Var text-black">
      <img
        alt="background"
        src={signup_signin_bg}
        className="absolute -z-10 w-screen h-screen"
      />
      <div className="SIGNIN z-10 h-[fit-content] max-w-[90vw] backdrop-blur-[9.3px] bg-[#c1c1c1]/50 flex flex-col items-center gap-10 rounded-[19px] 1080:scale-75 1440:scale-105">
        <p className="p-[.5rem] pl-[1rem] mb-[1rem] text-[4rem] leading-none self-start text-dark_mode_dark">
          Forgot your password?
        </p>
        <form onSubmit={handleResetPassword} className="flex flex-col">
          <div className="EMAIL-FIELD w-[468px] h-[67px] bg-[#c0c0c0] bg-opacity-[.3] border-solid border-dark_mode_medium border-[1px] rounded-[19px] flex ">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-[100%] pl-5 text-2xl bg-transparent transition-colors focus:outline-[#c1c1c1] focus:rounded-[19px] placeholder:text-dark_mode_font placeholder:text-2xl hover:bg-[#fff] hover:bg-opacity-[.15] rounded-[19px]"
              required
            />
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <button
              onClick={handleResetPassword}
              className="text-lg bg-[#008193] rounded-[19px] transition-colors text-dark_mode_text_white hover:bg-[#039CB0] mx-2 px-6 py-3"
            >
              SEND RESET PASSWORD INSTRUCTIONS
            </button>
            <button
              onClick={() => navigate("/signin")}
              className="text-lg text-white hover:text-slate-700 mx-2 px-3 py-2 rounded-[19px] border-2 border-transparent transition-colors"
            >
              &lt; Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};



export default ResetPassword;
