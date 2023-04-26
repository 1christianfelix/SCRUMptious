import React, { useState, useEffect } from "react";
import AccountDetails from "./AccountDetails";
import Search_light from "../images/icons/Search_light.svg";

const AccountsPage = ({ token }) => {
  const [accounts, setAccounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [gridView, setGridView] = useState(false);
  const [isGridView, setIsGridView] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);

  const getAccountsData = async () => {
    const accountUrl = "http://localhost:8000/accounts";
    const accountResponse = await fetch(accountUrl);
    if (accountResponse.ok) {
      const data = await accountResponse.json();
      setAccounts(data);
      console.log("data", data);
    }
  };

  useEffect(() => {
    getAccountsData();
  }, [token]);

  const filteredAccounts = accounts.filter((account) =>
    `${account.first_name} ${account.last_name} ${account.email} ${account.id}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleDeleteAccount = async (id) => {
    const deleteUrl = `http://localhost:8000/accounts/${id}`;
    const deleteResponse = await fetch(deleteUrl, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (deleteResponse.ok) {
      getAccountsData();
      console.log("Account deleted successfully");
    } else {
      console.error("Failed to delete account");
    }
  };

  const toggleView = () => {
    setIsGridView(!isGridView);
  };

  const handleAccountDoubleClick = (account) => {
    setSelectedAccount(account);
  };

  const closeAccountDetails = () => {
    setSelectedAccount(null);
  };

  return (
    <div className="flex justify-center items-center bg-gray-800 min-h-screen">
      <div className="bg-gray-100 border border-gray-300 p-4 rounded-md mt-10 w-full max-w-screen-xl">
        <h1 className="text-center text-2xl font-bold mb-4">Accounts List</h1>
        <div className="mb-4">
          {/* <input
            className="border border-gray-300 p-2 rounded-[19px] w-full"
            type="text"
            placeholder="Search Accounts"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <img
            src={Search_light}
            alt=""
            className="absolute"
          /> */}
          <div className="SEARCH BAR w-[13.4375rem] h-[2.125rem] bg-white rounded-[19px] flex items-center justify-between px-3 ">
            <input
              value={searchTerm}
              placeholder="Search Member"
              className="focus:outline-none w-[100%]"

            ></input>
            <img src={Search_light} alt="" className="h-[1rem] w-[1rem]" />
          </div>
        </div>
        <div className="flex justify-end mb-4">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            onClick={() => setGridView(!gridView)}
          >
            {gridView ? "List View" : "Grid View"}
          </button>
        </div>
        <div className="relative">
          <div className="account-listing h-96 overflow-y-auto">
            {gridView ? (
              <div
                className="grid gap-4"
                style={{ gridTemplateColumns: "repeat(4, 1fr)" }}
              >
                {filteredAccounts.length > 0 ? (
                  filteredAccounts.map((account) => (
                    <div
                      key={account.id}
                      className="border border-gray-300 p-4 rounded-md"
                      onDoubleClick={() => handleAccountDoubleClick(account)}
                    >
                      <p className="text-lg font-bold mb-2">
                        {account.first_name} {account.last_name}
                      </p>
                      <p className="text-gray-500 mb-2"> {account.email}</p>
                      {/* <p className="text-gray-500 mb-2">Account ID: {account.id}</p> */}
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-auto"
                        onClick={() => handleDeleteAccount(account.id)}
                      >
                        Delete
                      </button>
                    </div>
                  ))
                ) : (
                  <p>No accounts found.</p>
                )}
              </div>
            ) : (
              <>
                {filteredAccounts.length > 0 ? (
                  filteredAccounts.map((account) => (
                    <div
                      key={account.id}
                      className="border-b border-gray-300 py-2 flex items-center justify-between"
                      onDoubleClick={() => handleAccountDoubleClick(account)}
                    >
                      <div>
                        <p className="text-lg font-medium">
                          {account.first_name} {account.last_name}
                        </p>
                        <p className="text-gray-500">{account.email}</p>
                        {/* <p className="text-gray-500">Account ID: {account.id}</p> */}
                      </div>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleDeleteAccount(account.id)}
                      >
                        Delete
                      </button>
                    </div>
                  ))
                ) : (
                  <p>No accounts found.</p>
                )}
              </>
            )}
          </div>
          {selectedAccount && (
            <AccountDetails
              account={selectedAccount}
              onClose={closeAccountDetails}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountsPage;
