import "./App.css";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
// import StickyNote from "./components/StickyNote";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StickyBoardCreateForm from "./components/StickyBoardCreateForm";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

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
