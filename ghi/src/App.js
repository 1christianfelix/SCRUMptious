import "./App.css";
import Sidebar from "./components/Sidebar";
import React, { useContext } from "react";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import StickyBoardListView from "./pages/StickyBoardListView";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "@galvanize-inc/jwtdown-for-react";
import StickyBoard from "./pages/StickyBoard";
import { AccountProvider } from "./context/AccountContext";
import { useLocation } from "react-router-dom";

function App() {
  // const { token } = useContext(AuthContext);
  const location = useLocation();
  const currentPath = location.pathname;

  console.log("token: ", currentPath);

  return (
    <AccountProvider>
      <div>
        {currentPath === "/signin" || currentPath === "signup" ? (
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
