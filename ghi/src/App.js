import "./App.css";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import StickyNote from "./components/StickyNote";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StickyBoardCreateForm from "./components/StickyBoardCreateForm";

function App() {
  const [users, setUsers] = useState([]);
  const getUserData = async () => {
    const userUrl = "http://localhost:8000/user/";
    const userResponse = await fetch(userUrl);
    if (userResponse.ok) {
      const data = await userResponse.json();
      console.log(data);
      setUsers(data.users);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);

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
      <div className="flex font-Sudo_Var">
        {/* The sidebar takes up x amount of the space */}
        <Sidebar></Sidebar>
        {/* The dashboard represents everything else to the right of the sidebar */}
        <Dashboard></Dashboard>

        <Routes>
          <Route path="stickyboard">
            <Route
              path="new"
              element={<StickyBoardCreateForm accounts={accounts} />}
            />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
