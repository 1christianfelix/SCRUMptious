import React, { useState, useContext } from "react";
import signup_signin_bg from "../images/signup-signin-bg.png";
import { Link, useLocation, useToken } from "react-router-dom";
import { AuthContext } from "@galvanize-inc/jwtdown-for-react";


const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const { token } = useContext(AuthContext);
  console.log(token)


  // const = isSignIn = location.pathname.includes("signin");

  const handleSignin = async (e) => {
    e.preventDefault();

    const signinUrl = "http://localhost:8000/token";
    const response = await fetch(signinUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`
      },
      body: new URLSearchParams({
        // grant_type: "password",
        username: email,
        password: password,
        // scope: "",
        // client_id: "",
        // client_secret: "",
      }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data && data.access_token) {
        console.log(data);
        localStorage.setItem("access_token", data.access_token);
      } else {
        console.log("Invalid response from server");
      }
    } else {
      console.log("Signin failed");
    }
  };

  return (
    <div className="relative h-screen w-screen flex items-center justify-center font-Sudo_Var text-black">
      <img
        src={signup_signin_bg}
        className="absolute -z-10 w-screen h-screen"
      />
      <div className="SIGNUP z-10 h-[553px] w-[652px] backdrop-blur-[9.3px] bg-[#c1c1c1]/50 flex flex-col items-center gap-10 1080:scale-75 1440:scale-105">
        <p className="p-[.5rem] pl-[1rem] mb-[1rem] text-[4rem] leading-none self-start text-dark_mode_dark">
          Sign In
        </p>
        <form onSubmit={handleSignin}>
          <div className="EMAIL-FIELD w-[468px] h-[67px] bg-[#c0c0c0] bg-opacity-[.3] border-solid border-dark_mode_medium border-[1px] rounded-[19px] flex mb-4">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-[100%] pl-5 text-2xl bg-transparent transition-colors focus:outline-[#c1c1c1] focus:rounded-[19px] placeholder:text-dark_mode_font placeholder:text-2xl hover:bg-[#fff] hover:bg-opacity-[.15] rounded-[19px]"
              required
            />
          </div>
          <div className="w-[468px] h-[67px] bg-[#c0c0c0] bg-opacity-[.3] border-solid border-dark_mode_medium border-[1px] rounded-[19px] flex mt-7">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-[100%] pl-5 text-2xl bg-transparent transition-colors focus:outline-[#c1c1c1] focus:rounded-[19px] placeholder:text-dark_mode_font placeholder:text-2xl hover:bg-[#fff] hover:bg-opacity-[.15] rounded-[19px]"
              required
            />
          </div>

          <div className="flex">
            <div className="w-1/2" />
            <div className="container flex justify-between mx-auto">
              <Link to="/signup">
                <button className="mt-[1rem] text-[2.5rem] w-[15rem] bg-[#008193] rounded-[19px] transition-colors text-dark_mode_text_white hover:bg-[#039CB0] mx-2">
                  Sign Up
                </button>
              </Link>
              <div className="w-1/2">
                <Link to="/dashboard">
                  <button
                    onClick={handleSignin}
                    className="mt-[1rem] text-[2.5rem] w-[15rem] bg-[#008193] rounded-[19px] transition-colors text-dark_mode_text_white hover:bg-[#039CB0] mx-2"
                  >
                    Sign In
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;



// import  from "@galvanize-inc/jwtdown-for-react";
// import { useState } from "react";
// import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

// const Signin = () => {
//   const [email, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   // const { login } = useToken();
//   const { token } = useAuthContext();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await login(email, password);
//     e.target.reset();

//     const url = "http://localhost:8000/accounts/";
//     const response = await fetch(url, {
//       headers: { Authorization: `Bearer ${token}` },
//       // Other fetch options, like method and body, if applicable
//     });
//     if (response.ok) {
//       const data = await response.json();
//       console.log(data);
//     }
//   };

//   return (
//     <div className="card text-bg-light mb-3">
//       <h5 className="card-header">Login</h5>
//       <div className="card-body">
//         <form onSubmit={(e) => handleSubmit(e)}>
//           <div className="mb-3">
//             <label className="form-label">Username:</label>
//             <input
//               name="username"
//               type="text"
//               className="form-control"
//               onChange={(e) => setUsername(e.target.value)}
//             />
//           </div>
//           <div className="mb-3">
//             <label className="form-label">Password:</label>
//             <input
//               name="password"
//               type="password"
//               className="form-control"
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//           <div>
//             <input className="btn btn-primary" type="submit" value="Login" />
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Signin;



// import useToken from "@galvanize-inc/jwtdown-for-react";
// import { useState, useContext } from "react";
// import { AuthContext } from "@galvanize-inc/jwtdown-for-react";

// const Signin = () => {
//   const { token } = useContext(AuthContext);
//   const [email, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const { login } = useToken();

// const handleSubmit = (e) => {
//   e.preventDefault();
//   console.log(`email: ${email} password: ${password}`);
//   login(email, password, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   e.target.reset();
// };
//   return (
//     <div className="card text-bg-light mb-3">
//       <h5 className="card-header">Login</h5>
//       <div className="card-body">
//         <form onSubmit={(e) => handleSubmit(e)}>
//           <div className="mb-3">
//             <label className="form-label">Username:</label>
//             <input
//               name="email"
//               type="text"
//               className="form-control"
//               onChange={(e) => setUsername(e.target.value)}
//             />
//           </div>
//           <div className="mb-3">
//             <label className="form-label">Password:</label>
//             <input
//               name="password"
//               type="password"
//               className="form-control"
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//           <div>
//             <input className="btn btn-primary" type="submit" value="Login" />
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Signin;




// import useAuth from "@galvanize-inc/jwtdown-for-react";
// import { useState } from "react";

// const Signin = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const { login } = useAuth();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     login(username, password);
//     e.target.reset();
//   };

//   return (
//     <div className="card text-bg-light mb-3">
//       <h5 className="card-header">Login</h5>
//       <div className="card-body">
//         <form onSubmit={(e) => handleSubmit(e)}>
//           <div className="mb-3">
//             <label className="form-label">Username:</label>
//             <input
//               name="username"
//               type="text"
//               className="form-control"
//               onChange={(e) => setUsername(e.target.value)}
//             />
//           </div>
//           <div className="mb-3">
//             <label className="form-label">Password:</label>
//             <input
//               name="password"
//               type="password"
//               className="form-control"
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//           <div>
//             <input className="btn btn-primary" type="submit" value="Login" />
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Signin;
