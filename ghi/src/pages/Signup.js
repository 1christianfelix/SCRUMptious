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

  const [validationDisplay, setValidationDisplay] = useState("");

  const validationCheck = (message) => {
    setValidationDisplay(message);
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
      setValidationDisplay("Please fill out all required fields!");
      return;
    } else if (password !== confirmPassword) {
      setValidationDisplay("Your passwords must match!");
      return;
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      setValidationDisplay("Invalid Email!");
    } else if (emails.includes(email)) {
      setValidationDisplay("This email already exists.");
    } else {
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
      <div className="SIGNUP z-10 flex w-[652px] flex-col items-center gap-4 rounded-[19px] bg-slate-200 p-10 1080:scale-75 1440:scale-105">
        <p className="text-[4rem] leading-none text-dark_mode_dark">Sign Up</p>
        {validationDisplay && (
          <div className=" bg-red-500/75 px-6 py-4 text-2xl text-white shadow-2xl">
            {validationDisplay}
          </div>
        )}
        <div className="EMAIL-FIELD flex flex-col">
          <label
            className="ml-2 text-2xl text-dark_mode_font text-opacity-50"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            placeholder=" "
            value={email}
            onChange={handleEmailChange}
            className="h-[54px] w-[468px] rounded-[19px] border-[1px] border-solid border-dark_mode_medium bg-transparent pl-5 text-2xl text-dark_mode_font transition-colors focus:border-[4px] focus:border-blue-500 focus:outline-none"
            required
          />
        </div>
        <div className="FirstName-FIELD flex flex-col">
          <label
            className="ml-2 text-2xl text-dark_mode_font text-opacity-50"
            htmlFor="firstName"
          >
            First Name
          </label>
          <input
            type="text"
            placeholder=" "
            value={firstName}
            onChange={handleFirstNameChange}
            className="h-[54px] w-[468px] rounded-[19px] border-[1px] border-solid border-dark_mode_medium bg-transparent pl-5 text-2xl text-dark_mode_font transition-colors focus:border-[4px] focus:border-blue-500 focus:outline-none"
            required
          />
        </div>

        <div className="LastName-FIELD flex flex-col">
          <label
            className="ml-2 text-2xl text-dark_mode_font text-opacity-50"
            htmlFor="lastName"
          >
            Last Name
          </label>
          <input
            type="text"
            placeholder=" "
            value={lastName}
            onChange={handleLastNameChange}
            className="h-[54px] w-[468px] rounded-[19px] border-[1px] border-solid border-dark_mode_medium bg-transparent pl-5 text-2xl text-dark_mode_font transition-colors focus:border-[4px] focus:border-blue-500 focus:outline-none"
            required
          />
        </div>

        <div className="Password-FIELD flex flex-col">
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
            onChange={handlePassword}
            className="h-[54px] w-[468px] rounded-[19px] border-[1px] border-solid border-dark_mode_medium bg-transparent pl-5 text-2xl text-dark_mode_font transition-colors focus:border-[4px] focus:border-blue-500 focus:outline-none"
            required
          />
        </div>

        <div className="ConfirmPassword-FIELD flex flex-col">
          <label
            className="ml-2 text-2xl text-dark_mode_font text-opacity-50"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            type="password"
            placeholder=" "
            value={confirmPassword}
            onChange={handleConfirmPassword}
            className="h-[54px] w-[468px] rounded-[19px] border-[1px] border-solid border-dark_mode_medium bg-transparent pl-5 text-2xl text-dark_mode_font transition-colors focus:border-[4px] focus:border-blue-500 focus:outline-none"
            required
          />
        </div>

        <button
          className={`mt-[1rem] w-[20rem] rounded-[19px] text-[2.5rem]
           ${
             !firstName || !lastName || !email || !password || !confirmPassword
               ? "bg-gray-400 text-gray-300"
               : "bg-blue-500 text-dark_mode_text_white hover:bg-blue-400"
           }
          text-dark_mode_text_white transition-colors`}
          onClick={handleFormSubmit}
          disabled={
            !firstName || !lastName || !email || !password || !confirmPassword
          }
        >
          Sign Up
        </button>
        <div className="inline text-2xl">
          <div className="text-dark_mode_text_dark flex items-center justify-center gap-2">
            <span> Already have an account? </span>
            <Link
              to="/signin"
              className="inline-block self-center text-blue-700 underline hover:text-slate-700"
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
