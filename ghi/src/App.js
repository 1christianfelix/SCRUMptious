import "./App.css";
import Sidebar from "./components/Sidebar";
// import Dashboard from "./pages/Dashboard";
// import StickyNote from "./components/StickyNote";
import React, { useEffect, useState, useContext } from "react";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
// import StickyNoteCreateForm from "./components/StickyNoteCreateForm";
// import StickyBoardCreateForm from "./components/StickyBoardCreateForm";
import StickyBoardListView from "./pages/StickyBoardListView";
// import ResetPassword from "./pages/ResetPassword";

import { Routes, Route, Navigate } from "react-router-dom";

import { AuthContext } from "@galvanize-inc/jwtdown-for-react";
import StickyBoard from "./pages/StickyBoard";
import { AccountProvider } from "./context/AccountContext";

function App() {
  const { token } = useContext(AuthContext);

  // const user = useUser(token);

  // console.log(user);
  console.log("token: ", token);

  useEffect(() => {
    getAccountsData();
    // getStickyBoardData();
  }, [token]);
  // const [accounts, setAccounts] = useState([]);
  // const getAccountsData = async () => {
  //   const accountUrl = "http://localhost:8000/accounts";
  //   const accountResponse = await fetch(accountUrl);
  //   if (accountResponse.ok) {
  //     const data = await accountResponse.json();
  //     setAccounts(data);
  //   }
  // };
  // useEffect(() => {
  //   getAccountsData();
  //   // getStickyBoardData();
  // }, [token]);

  return (
    <AccountProvider>
      <div>
        {!token ? (
          <Routes>
            <Route path="/" element={<Navigate to="/signin" />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            {/* <Route path="*" element={<Navigate to="/signin" />} /> */}
          </Routes>
        ) : (
          <div className="flex font-Sudo_Var">
            {console.log("token success")}
            <Sidebar />
            <section className="bg-dark_mode_medium h-screen flex-grow relative">
              <Routes>
                <Route path="/dashboard">
                  <Route path=":stickyboard_id" element={<StickyBoard />} />
                  <Route index element={<StickyBoardListView />} />
                </Route>
                <Route path="*" element={<Navigate to="/dashboard" />} />
              </Routes>
            </section>
          </div>
        )}
      </div>
    </AccountProvider>
  );
}

export default App;
