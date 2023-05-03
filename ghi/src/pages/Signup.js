import React from "react";
import { useState } from "react";
import signup_signin_bg from "../images/signup-signin-bg.png";
import { useNavigate, Link } from "react-router-dom";
import TermsModal from "./TermsModal";

function Signup(props) {
  const navigate = useNavigate();

  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isTermsChecked, setIsTermsChecked] = useState(false);

  const handleAccept = () => setIsTermsChecked(true);


  const handleDecline = () => {
    setIsTermsChecked(false);
    // closeModal();
    if (isTermsChecked) {
      setIsTermsChecked(false);
    }
  };



  const handleTermsChange = () => {
    setIsTermsChecked(!isTermsChecked);
  };

  const openTermsModal = () => {
    setIsTermsModalOpen(true);
  };

  const closeTermsModal = () => {
    setIsTermsModalOpen(false);
  };

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

    if (!isTermsChecked) {
      alert("Please accept the Terms & Conditions before signing up.");
      return;
    }

    const response = await fetch(
      `${process.env.REACT_APP_SCRUMPTIOUS_SERVICE_API_HOST}/accounts`
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
      navigate("/pricing");
    }
  };

  return (
    <div className="relative h-screen w-screen flex items-center justify-center font-Sudo_Var text-black">
      <img
        alt="background"
        src={signup_signin_bg}
        className="absolute -z-10 w-screen h-screen "
      />

      <div className="SIGNUP z-10 h-[866px] w-[652px] backdrop-blur-[9.3px] bg-[#c1c1c1]/50 flex flex-col items-center gap-8 rounded-[19px] 1080:scale-75 1440:scale-105 p-[20px] pt-[40px]">
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
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={isTermsChecked}
            onChange={handleTermsChange}
            className="mr-2"
          />
          <label className="cursor-pointer">
            I agree to the{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={openTermsModal}
              style={{
                textDecoration: "none",
                transition: "text-decoration 0.2s",
                fontWeight: "bold",
              }}
              onMouseEnter={(e) => {
                e.target.style.textDecoration = "underline";
              }}
              onMouseLeave={(e) => {
                e.target.style.textDecoration = "none";
              }}
            >
              Terms and Conditions
            </span>
          </label>
        </div>
        <div className="text-2xl inline">
          <div className="flex items-center justify-center gap-2 text-dark_mode_text_dark">
            <span> Already have an account? </span>
            <Link
              to="/signin"
              className="text-white self-center inline-block underline hover:text-slate-700"
              style={{
                textDecoration: "none",
                transition: "text-decoration 0.2s",
                fontWeight: "bold",
                fontSize: "1.1em",
              }}
              onMouseEnter={(e) => {
                e.target.style.textDecoration = "underline";
                e.target.style.fontSize = "1.25em";
              }}
              onMouseLeave={(e) => {
                e.target.style.textDecoration = "none";
                e.target.style.fontSize = "1.1em";
              }}
            >
              Sign in here!
            </Link>
          </div>
        </div>
      </div>

      <TermsModal
        isOpen={isTermsModalOpen}
        closeModal={closeTermsModal}
        onAccept={handleAccept}
        onDecline={handleDecline}
      />
    </div>
  );
}

export default Signup;
