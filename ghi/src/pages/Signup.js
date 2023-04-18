import React from "react";
import { useState, useEffect } from "react";
import signup_signin_bg from "../images/signup-signin-bg.png";
import { useNavigate, Link } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";

function Signup(props) {
  const navigate = useNavigate();
  const { token, register, login } = useToken();

  const [email, setEmail] = useState("");
  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };
  // const [userName, setUserName] = useState("");
  // const handleUserNameChange = (event) => {
  //   const value = event.target.value;
  //   setUserName(value);
  // };
  const [firstName, setFirstName] = useState("");
  const handleFirstNameChange = (event) => {
    const value = event.target.value;
    setFirstName(value);
  };
  const [lastName, setLastName] = useState("");
  const handleLastNameChange = (event) => {
    const value = event.target.value;
    setLastName(value);
  };
  const [password, setPassword] = useState("");
  const handlePassword = (event) => {
    const value = event.target.value;
    setPassword(value);
  };
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleConfirmPassword = (event) => {
    const value = event.target.value;
    setConfirmPassword(value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      alert("Please fill out all required fields!");
      return;
    }
    if (password !== confirmPassword) {
      alert("Your passwords must match!");
      return;
    }
    const data = {
      email: email,
      first_name: firstName,
      last_name: lastName,
      password: password,
    };

    // const accountUrl = "http://localhost:8000/accounts";
    // const fetchConfig = {
    //   method: "post",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // };

    // const response = await fetch(accountUrl, fetchConfig);
    // if (response.ok) {
    //   navigate("/signin");
    // }
    console.log("hello");
    register(
      data,
      `${process.env.REACT_APP_SCRUMPTIOUS_SERVICE_API_HOST}/accounts`,
      "POST"
    );
    console.log("token", token);
  };

  return (
    <div className="relative h-screen w-screen flex items-center justify-center font-Sudo_Var text-black">
      <img
        src={signup_signin_bg}
        className="absolute -z-10 w-screen h-screen "
      />
      {/* Form Box */}
      <div className="SIGNUP z-10 h-[866px] w-[652px] backdrop-blur-[9.3px] bg-[#c1c1c1]/60 flex flex-col items-center gap-8 1080:scale-75 1440:scale-105">
        <p className="p-[.5rem] pl-[1rem] mb-[1rem] text-[4rem] leading-none self-start text-dark_mode_dark">
          Sign Up
        </p>
        <div className="EMAIL-FIELD w-[468px] h-[67px] bg-[#c0c0c0] bg-opacity-[.3] border-solid border-dark_mode_medium border-[1px] rounded-[19px] flex">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            className="w-[100%] pl-5 text-2xl bg-transparent transition-colors focus:outline-[#c1c1c1] focus:rounded-[19px] placeholder:text-dark_mode_font placeholder:text-2xl hover:bg-[#fff] hover:bg-opacity-[.15] rounded-[19px]"
            required
          />
        </div>
        {/* <div className="UserName-FIELD w-[468px] h-[67px] bg-[#c0c0c0] bg-opacity-[.3] border-solid border-dark_mode_medium border-[1px] rounded-[19px] flex">
          <input
            type="text"
            placeholder="Username"
            value={userName}
            onChange={handleUserNameChange}
            className="w-[100%] pl-5 text-2xl bg-transparent transition-colors focus:outline-[#c1c1c1] focus:rounded-[19px] placeholder:text-dark_mode_font placeholder:text-2xl hover:bg-[#fff] hover:bg-opacity-[.15] rounded-[19px]"
          />
        </div> */}
        <div className="FirstName-FIELD w-[468px] h-[67px] bg-[#c0c0c0] bg-opacity-[.3] border-solid border-dark_mode_medium border-[1px] rounded-[19px] flex">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={handleFirstNameChange}
            className="w-[100%] pl-5 text-2xl bg-transparent transition-colors focus:outline-[#c1c1c1] focus:rounded-[19px] placeholder:text-dark_mode_font placeholder:text-2xl hover:bg-[#fff] hover:bg-opacity-[.15] rounded-[19px]"
          />
        </div>
        <div className="LastName-FIELD w-[468px] h-[67px] bg-[#c0c0c0] bg-opacity-[.3] border-solid border-dark_mode_medium border-[1px] rounded-[19px] flex">
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={handleLastNameChange}
            className="w-[100%] pl-5 text-2xl bg-transparent transition-colors focus:outline-[#c1c1c1] focus:rounded-[19px] placeholder:text-dark_mode_font placeholder:text-2xl hover:bg-[#fff] hover:bg-opacity-[.15] rounded-[19px]"
          />
        </div>
        <div className="Password-FIELD w-[468px] h-[67px] bg-[#c0c0c0] bg-opacity-[.3] border-solid border-dark_mode_medium border-[1px] rounded-[19px] flex">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePassword}
            className="w-[100%] pl-5 text-2xl bg-transparent transition-colors focus:outline-[#c1c1c1] focus:rounded-[19px] placeholder:text-dark_mode_font placeholder:text-2xl hover:bg-[#fff] hover:bg-opacity-[.15] rounded-[19px]"
          />
        </div>
        <div className="ConfirmPassword-FIELD w-[468px] h-[67px] bg-[#c0c0c0] bg-opacity-[.3] border-solid border-dark_mode_medium border-[1px] rounded-[19px] flex">
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPassword}
            className="w-[100%] pl-5 text-2xl bg-transparent transition-colors focus:outline-[#c1c1c1] focus:rounded-[19px] placeholder:text-dark_mode_font placeholder:text-2xl hover:bg-[#fff] hover:bg-opacity-[.15] rounded-[19px]"
          />
        </div>
        <button
          className="mt-[1rem] text-[2.5rem] w-[20rem] bg-[#008193] rounded-[19px] transition-colors text-dark_mode_text_white hover:bg-[#039CB0]"
          onClick={handleFormSubmit}
        >
          Sign Up
        </button>
        <div className="text-2xl inline">
          <div className="flex items-center justify-center gap-2 text-dark_mode_text_dark">
            <span> Already have an account? </span>
            <Link
              to="/signin"
              className="text-white self-center inline-block underline hover:text-slate-700"
            >
              Sign in here!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
