import { createContext, useState, useEffect } from "react";

const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
  const [accounts, setAccounts] = useState([]);
  const getAccountsData = async () => {
    const accountUrl = `${process.env.REACT_APP_SCRUMPTIOUS_SERVICE_API_HOST}/accounts`;
    const accountResponse = await fetch(accountUrl);
    if (accountResponse.ok) {
      const data = await accountResponse.json();
      setAccounts(data);
    }
  };
  useEffect(() => {
    getAccountsData();
  }, []);
  console.log("From AccountContext.js:", accounts);
  return (
    <AccountContext.Provider value={{ accounts, setAccounts }}>
      {children}
    </AccountContext.Provider>
  );
};

export default AccountContext;
