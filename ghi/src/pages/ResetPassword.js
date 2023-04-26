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
    <div className="relative h-screen w-screen flex flex-col items-center justify-center font-Sudo_Var text-black">
      <img
        src={signup_signin_bg}
        className="absolute -z-10 object-cover h-full w-full"
      />
      <div className="SIGNUP z-10 h-[fit-content] max-w-[90vw] backdrop-blur-[9.3px] bg-[#c1c1c1]/50 justify-center gap-10 text-center rounded-[19px] 1080:scale-75 1440:scale-105">
        <p className="p-[.5rem] pl-[1rem] mb-[1rem] text-[4rem] leading-none self-start text-dark_mode_dark">
          Forgot your password?
        </p>
        <form onSubmit={handleResetPassword}>
          <div className="flex justify-center">
            <div className="EMAIL-FIELD w-[468px] h-[67px] bg-[#c0c0c0] bg-opacity-[.3] border-solid border-dark_mode_medium border-[1px] rounded-[19px] flex mb-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-[100%] pl-5 text-2xl bg-transparent transition-colors focus:outline-[#c1c1c1] focus:rounded-[19px] placeholder:text-dark_mode_font placeholder:text-2xl hover:bg-[#fff] hover:bg-opacity-[.15] rounded-[19px]"
                required
              />
            </div>
          </div>
          <button
            onClick={handleResetPassword}
            className="mt-[1rem] mb-4 text-lg bg-[#008193] rounded-[19px] transition-colors text-dark_mode_text_white hover:bg-[#039CB0] mx-2 px-6 py-3"
          >
            SEND ME RESET PASSWORD INSTRUCTIONS
          </button>
        </form>
      </div>
      <div className="back-button-container flex justify-center mt-6">
        <button
          onClick={() => navigate("/signin")}
          className="text-lg bg-[#008193] rounded-[19px] transition-colors text-dark_mode_text_white hover:bg-[#039CB0] mx-2 px-3 py-2"
        >
          &lt; Back
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
