import React, { useState } from "react";
import signup_signin_bg from "../images/signup-signin-bg.png";
import { useNavigate } from "react-router-dom";

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
    <div className="relative flex h-screen w-screen items-center justify-center font-Sudo_Var text-black">
      <img
        alt="background"
        src={signup_signin_bg}
        className="absolute -z-10 h-screen w-screen"
      />
      <div className="SIGNIN z-10 flex h-[fit-content] max-w-[90vw] flex-col items-center gap-10 rounded-[19px] bg-[#c1c1c1]/50 backdrop-blur-[9.3px] 1080:scale-75 1440:scale-105">
        <p className="mb-[1rem] self-start p-[.5rem] pl-[1rem] text-[4rem] leading-none text-dark_mode_dark">
          Forgot your password?
        </p>
        <form onSubmit={handleResetPassword} className="flex flex-col">
          <div className="EMAIL-FIELD flex h-[67px] w-[468px] rounded-[19px] border-[1px] border-solid border-dark_mode_medium bg-[#c0c0c0] bg-opacity-[.3] ">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-[100%] rounded-[19px] bg-transparent pl-5 text-2xl transition-colors placeholder:text-2xl placeholder:text-dark_mode_font focus:rounded-[19px] focus:outline-[#c1c1c1] hover:bg-[#fff] hover:bg-opacity-[.15]"
              required
            />
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <button
              onClick={handleResetPassword}
              className="mx-2 rounded-[19px] bg-[#008193] px-6 py-3 text-lg text-dark_mode_text_white transition-colors hover:bg-[#039CB0]"
            >
              SEND RESET PASSWORD INSTRUCTIONS
            </button>
            <button
              onClick={() => navigate("/signin")}
              className="mx-2 rounded-[19px] border-2 border-transparent px-3 py-2 text-lg text-white transition-colors hover:text-slate-700"
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
