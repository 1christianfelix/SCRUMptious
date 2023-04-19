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
import StickyBoardUpdateForm from "./components/StickyBoardUpdateForm";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

import useToken, { AuthContext } from "@galvanize-inc/jwtdown-for-react";

function App() {
  const { token } = useContext(AuthContext);

  // const user = useUser(token);

  // console.log(user);
  console.log("token: ", token);

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
              <Route
                path="new"
                element={<StickyBoardCreateForm accounts={accounts} />}
              />
              <Route
                path="update"
                // element={<StickyBoardUpdateForm accounts={accounts} />}
              />
            </Route>
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;
