import "./App.css";
import Sidebar from "./components/Sidebar";
// import Dashboard from "./pages/Dashboard";
// import StickyNote from "./components/StickyNote";
import React, { useContext, useState } from "react";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import StickyBoardListView from "./pages/StickyBoardListView";
import ResetPassword from "./pages/ResetPassword";
import AccountsPage from "./components/AccountsPage";

import Pricing from "./components/Pricing";
import PaymentForm from "./components/PaymentForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import BigCalendarPage from "./components/Calendar";

import ThemeContext from "./context/ThemeContext";


import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "@galvanize-inc/jwtdown-for-react";
import StickyBoard from "./pages/StickyBoard";
import { AccountProvider } from "./context/AccountContext";

function App() {
  const { token } = useContext(AuthContext);
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const stripeTestPromise = loadStripe(
    "pk_test_69syY2TnwXdp6O4emapTFnKP00QCtfnSTs"
  );


  console.log("token: ", token);

  const [accModalStatus, setAccModalStatus] = useState(false);
  const handleOpenAccModal = () => {
    setAccModalStatus(true);
  };
  const handleCloseAccModal = () => {
    setAccModalStatus(false);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <AccountProvider>
        <div>
          {!token ? (
            <Routes>
              <Route path="/" element={<Navigate to="/signin" />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/resetpassword" element={<ResetPassword />} />
              <Route
                path="/pricing"
                element={<Pricing theme={theme} toggleTheme={toggleTheme} />}
              />
              <Route path="/calendar" element={<BigCalendarPage />} />
              <Route
                path="/payment"
                element={
                  <Elements stripe={stripeTestPromise}>
                    <PaymentForm />
                  </Elements>
                }
              />
            </Routes>
          ) : (
            <div className="flex font-Sudo_Var">
              {console.log("token success")}
              <Sidebar
                openAcc={handleOpenAccModal}
                closeAcc={handleCloseAccModal}
              />
              <section className="bg-slate-100 h-screen flex-grow relative">
                <AccountsPage
                  accModalStatus={accModalStatus}
                  closeAcc={handleCloseAccModal}
                />
                <Routes>
                  <Route path="/dashboard">
                    <Route path=":stickyboard_id" element={<StickyBoard />} />
                    <Route index element={<StickyBoardListView />} />
                  </Route>
                  <Route path="*" element={<Navigate to="/dashboard" />} />
                  <Route path="/accountspage" element={<AccountsPage />} />
                </Routes>
              </section>
            </div>
          )}
        </div>
      </AccountProvider>
    </ThemeContext.Provider>
  );
}

export default App;
