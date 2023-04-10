import "./App.css";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import StickyNote from "./components/StickyNote";
import React, { useEffect, useState, useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import StickyBoardCreateForm from "./components/StickyBoardCreateForm";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

import useToken, { AuthContext } from "@galvanize-inc/jwtdown-for-react";
import useUser from "./hooks/useUser";

function App() {
  const { token } = useContext(AuthContext);
  const user = useUser(token);
  const { logout } = useToken();
  console.log(user);
  console.log(token);

  const [accounts, setAccounts] = useState([]);
  const getAccountsData = async () => {
    const accountUrl = "http://localhost:8000/accounts";
    const accountResponse = await fetch(accountUrl);
    if (accountResponse.ok) {
      const data = await accountResponse.json();
      setAccounts(data);
    }
  };
  useEffect(() => {
    getAccountsData();
  }, []);

  return (
    <div>
      {!token ? (
        <Routes>
          <Route path="/" element={<Navigate to="/signin" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      ) : (
        <div className="flex font-Sudo_Var">
          <Sidebar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="stickyboard">
              <Route
                path="new"
                element={<StickyBoardCreateForm accounts={accounts} />}
              />
            </Route>
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;
