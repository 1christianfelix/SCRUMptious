import "./App.css";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import StickyNote from "./components/StickyNote";
import React, { useEffect, useState, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StickyBoardCreateForm from "./components/StickyBoardCreateForm";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";


function App() {
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
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />

        <Route
          path="*"
          element={
            <div className="flex font-Sudo_Var">
              <Sidebar />
              <Dashboard />
              <Routes>
                <Route path="stickyboard">
                  <Route
                    path="new"
                    element={<StickyBoardCreateForm accounts={accounts} />}
                  />
                </Route>
              </Routes>
            </div>
          }
        />
      </Routes>
      <AuthProvider
        tokenUrl={`${process.env.REACT_APP_SCRUMPTIOUS_SERVICE_API_HOST}/token`}
      ></AuthProvider>
    </BrowserRouter>
  );
}

export default App;
