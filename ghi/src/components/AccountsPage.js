import React, { useState, useEffect } from "react";
import AccountDetails from "./AccountDetails";
import Search_light from "../images/icons/Search_light.svg";
import close_out from "../images/icons/close_out_icon.svg";

const AccountsPage = ({ token, accModalStatus, closeAcc }) => {
  const [accounts, setAccounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [gridView, setGridView] = useState(true);
  //   const [isGridView, setIsGridView] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);

  const getAccountsData = async () => {
    const accountUrl = `${process.env.REACT_APP_SCRUMPTIOUS_SERVICE_API_HOST}/accounts`;
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
    const deleteUrl = `${process.env.REACT_APP_SCRUMPTIOUS_SERVICE_API_HOST}/accounts/${id}`;
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

  //   const toggleView = () => {
  //     setIsGridView(!isGridView);
  //   };

  const handleAccountDoubleClick = (account) => {
    setSelectedAccount(account);
  };

  const closeAccountDetails = () => {
    setSelectedAccount(null);
  };

  if (!accModalStatus) return null;

  return (
    <div
      className="flex justify-center items-center absolute z-10 backdrop-blur-md w-[100%] h-[100%]"
      onClick={() => {
        closeAcc();
      }}
    >
      <div
        className="bg-gray-100 border border-gray-300 p-4 rounded-[19px] mt-10 w-[46.3125rem] relative pt-[3rem]"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={close_out}
          alt="close"
          className="absolute top-3 right-5 hover:cursor-pointer expand-button h-[2rem] w-[2rem]"
          onClick={() => {
            closeAcc();
          }}
        />
        <h1 className="text-center text-2xl font-bold mb-8">Accounts List</h1>
        <div className="w-[100%] flex items-center gap-4  justify-center mb-6">
          <div className=" flex  rounded-[19px] bg-white w-[50%] h-[2.5rem] px-6 text-xl drop-shadow-md">
            <input
              className="focus:outline-none w-[100%]"
              type="text"
              placeholder="Search Accounts"
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <img src={Search_light} alt="" />
          </div>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            onClick={() => setGridView(!gridView)}
          >
            {gridView ? "List View" : "Grid View"}
          </button>
        </div>

        <div className="relative">
          <div className="account-listing h-96 overflow-y-auto scrollbar scrollbar-w-2 scrollbar-track-slate-600 scrollbar-track-rounded-lg px-3">
            {gridView ? (
              <div
                className="grid gap-4"
                style={{ gridTemplateColumns: "repeat(4, 1fr)" }}
              >
                {filteredAccounts.length > 0 ? (
                  filteredAccounts.map((account) => (
                    <div
                      key={account.id}
                      className="border border-gray-300 p-4 rounded-md flex flex-col h-36 w-48 overflow-hidden"
                      onDoubleClick={() => handleAccountDoubleClick(account)}
                    >
                      <div className="flex-grow">
                        <p className="text-lg font-bold mb-2 truncate break-words">
                          {account.first_name} {account.last_name}
                        </p>
                        <p className="text-gray-500 break-words">
                          {" "}
                          {account.email}
                        </p>
                      </div>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-auto mt-2"
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
