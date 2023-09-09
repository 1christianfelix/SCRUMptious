import React from "react";
import { useState } from "react";
import signup_signin_bg from "../images/signup-signin-bg.png";
import { useNavigate, Link } from "react-router-dom";

function Signup(props) {
  const navigate = useNavigate();

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

    const response = await fetch(
      `${process.env.REACT_APP_SCRUMPTIOUS_SERVICE_API_HOST}/accounts`,
    );
    const data = await response.json();
    const emails = data.map((user) => user.email);

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
    if (emails.includes(email)) {
      alert("This email already exists. Please use a different email address.");
      return;
    }

    const formData = {
      email: email,
      first_name: firstName,
      last_name: lastName,
      password: password,
    };

    const accountUrl = `${process.env.REACT_APP_SCRUMPTIOUS_SERVICE_API_HOST}/accounts`;
    const fetchConfig = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    const postResponse = await fetch(accountUrl, fetchConfig);
    if (postResponse.ok) {
      navigate("/signin");
    }
  };

  return (
    <div className="relative flex h-screen w-screen items-center justify-center font-Sudo_Var text-black">
      <img
        alt="background"
        src={signup_signin_bg}
        className="absolute -z-10 h-screen w-screen "
      />
      {/* Form Box */}
      <div className="SIGNUP z-10 flex h-[866px]  w-[652px] flex-col items-center gap-8 rounded-[19px] bg-[#c1c1c1] 1080:scale-75 1440:scale-105">
        <p className="mb-[1rem] self-start p-[.5rem] pl-[1rem] text-[4rem] leading-none text-dark_mode_dark">
          Sign Up
        </p>
        <div className="EMAIL-FIELD flex h-[67px] w-[468px] rounded-[19px] border-[1px] border-solid border-dark_mode_medium bg-[#c0c0c0] bg-opacity-[.3]">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            className="w-[100%] rounded-[19px] bg-transparent pl-5 text-2xl transition-colors placeholder:text-2xl placeholder:text-dark_mode_font focus:rounded-[19px] focus:outline-[#c1c1c1] hover:bg-[#fff] hover:bg-opacity-[.15]"
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
        <div className="FirstName-FIELD flex h-[67px] w-[468px] rounded-[19px] border-[1px] border-solid border-dark_mode_medium bg-[#c0c0c0] bg-opacity-[.3]">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={handleFirstNameChange}
            className="w-[100%] rounded-[19px] bg-transparent pl-5 text-2xl transition-colors placeholder:text-2xl placeholder:text-dark_mode_font focus:rounded-[19px] focus:outline-[#c1c1c1] hover:bg-[#fff] hover:bg-opacity-[.15]"
          />
        </div>
        <div className="LastName-FIELD flex h-[67px] w-[468px] rounded-[19px] border-[1px] border-solid border-dark_mode_medium bg-[#c0c0c0] bg-opacity-[.3]">
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={handleLastNameChange}
            className="w-[100%] rounded-[19px] bg-transparent pl-5 text-2xl transition-colors placeholder:text-2xl placeholder:text-dark_mode_font focus:rounded-[19px] focus:outline-[#c1c1c1] hover:bg-[#fff] hover:bg-opacity-[.15]"
          />
        </div>
        <div className="Password-FIELD flex h-[67px] w-[468px] rounded-[19px] border-[1px] border-solid border-dark_mode_medium bg-[#c0c0c0] bg-opacity-[.3]">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePassword}
            className="w-[100%] rounded-[19px] bg-transparent pl-5 text-2xl transition-colors placeholder:text-2xl placeholder:text-dark_mode_font focus:rounded-[19px] focus:outline-[#c1c1c1] hover:bg-[#fff] hover:bg-opacity-[.15]"
          />
        </div>
        <div className="ConfirmPassword-FIELD flex h-[67px] w-[468px] rounded-[19px] border-[1px] border-solid border-dark_mode_medium bg-[#c0c0c0] bg-opacity-[.3]">
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPassword}
            className="w-[100%] rounded-[19px] bg-transparent pl-5 text-2xl transition-colors placeholder:text-2xl placeholder:text-dark_mode_font focus:rounded-[19px] focus:outline-[#c1c1c1] hover:bg-[#fff] hover:bg-opacity-[.15]"
          />
        </div>
        <button
          className="mt-[1rem] w-[20rem] rounded-[19px] bg-[#008193] text-[2.5rem] text-dark_mode_text_white transition-colors hover:bg-[#039CB0]"
          onClick={handleFormSubmit}
        >
          Sign Up
        </button>
        <div className="inline text-2xl">
          <div className="text-dark_mode_text_dark flex items-center justify-center gap-2">
            <span> Already have an account? </span>
            <Link
              to="/signin"
              className="inline-block self-center text-white underline hover:text-slate-700"
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
