import "./App.css";
import Sidebar from "./components/Sidebar"
import Dashboard from "./pages/Dashboard";
import StickyNote from "./components/StickyNote";
import React, { useEffect, useState, useContext } from "react";
import StickyBoardCreateForm from "./components/StickyBoardCreateForm";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import StickyNoteCreateForm from "./components/StickyNoteCreateForm";
import ResetPassword from "./pages/ResetPassword";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";


import useToken, { AuthContext } from "@galvanize-inc/jwtdown-for-react";

function App() {

  const { token } = useContext(AuthContext);

  // const user = useUser(token);

  // console.log(user);
  console.log("token: ", token);
const [stickyBoard, setStickyBoard] = useState([]);
const getStickyBoardData = async () => {
  const stickyBoardUrl = "http://localhost:8000/stickyboard/";
  const stickyBoardResponse = await fetch(stickyBoardUrl, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (stickyBoardResponse.ok) {
    const data = await stickyBoardResponse.json();
    console.log(data);
    setStickyBoard(data);
  } else {
    console.error("Failed to fetch sticky board data");
  }
};


  const [accounts, setAccounts] = useState([]);
  const getAccountsData = async () => {
    const accountUrl = "http://localhost:8000/accounts";
    const accountResponse = await fetch(accountUrl);
    if (accountResponse.ok) {
      const data = await accountResponse.json();
      setAccounts(data);
      console.log(data)
    }
  };
  useEffect(() => {
    getAccountsData();
    getStickyBoardData();
  }, [token]);

return (
  <div>
    {!token ? (
      <Routes>
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        {/* <Route path="*" element={<Navigate to="/signin" />} /> */}
      </Routes>
    ) : (
      <div className="flex font-Sudo_Var">
        {console.log("token success")}
        <Sidebar />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/stickyboard/new"
            element={<StickyBoardCreateForm accounts={accounts} />}
          />
          <Route
            path="/sticky/new"
            element={
              <StickyNoteCreateForm
                accounts={accounts}
                stickyBoard={stickyBoard}
              />
            }
          />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    )}
  </div>
);

}

export default App;
