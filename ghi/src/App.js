import "./App.css";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import StickyNote from "./components/StickyNote";
import React, { useEffect, useState, useContext } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import StickyBoardCreateForm from "./components/StickyBoardCreateForm";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { AccountProvider } from "./context/AccountContext";

import useToken, { AuthContext } from "@galvanize-inc/jwtdown-for-react";

function App() {
  const { token } = useContext(AuthContext);

  // const user = useUser(token);

  // console.log(user);
  console.log("token: ", token);

  return (
    <AccountProvider>
      <div>
        {false ? (
          <Routes>
            <Route path="/" element={<Navigate to="/signin" />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="*" element={<Navigate to="/signin" />} />
          </Routes>
        ) : (
          <div className="flex font-Sudo_Var">
            {console.log("token success")}
            <Sidebar />
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="stickyboard">
                <Route path="new" element={<StickyBoardCreateForm />} />
              </Route>
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </div>
        )}
      </div>
    </AccountProvider>
  );
}

export default App;
