import "./App.css";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import StickyNote from "./components/StickyNote";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StickyBoardCreateForm from "./components/StickyBoardCreateForm";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";


function App() {
  const [accounts, setUsers] = useState([]);
  const getAccountsData = async () => {
    const userUrl = "http://localhost:8000/accounts/";
    const userResponse = await fetch(userUrl);
    if (userResponse.ok) {
      const data = await userResponse.json();
      console.log(data);
      setUsers(data.users);
    }
  };
  useEffect(() => {
    getAccountsData ();
  }, []);

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
  // }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/signup"
          element={<Signup accounts={accounts} getAccountsData={getAccountsData} />}
        />
        <Route path="/signin" element={<Signin />} />
      </Routes>
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
          <Route path="/signup" element={<Signup accounts={accounts} />} />
          <Route path="/Signin" element={<Signin />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
