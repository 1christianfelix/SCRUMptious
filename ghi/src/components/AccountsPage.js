import React, { useState, useEffect } from "react";
import AccountDetails from "./AccountDetails";
import Search_light from "../images/icons/Search_light.svg";
import close_out from "../images/icons/close_out_icon.svg";
import AccountPageDeleteModal from "./AccountPageDeleteModal";

const AccountsPage = ({ token, accModalStatus, closeAcc }) => {
  const [accounts, setAccounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [gridView, setGridView] = useState(false);
  //   const [isGridView, setIsGridView] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [deleteModalForAccount, setDeleteModalForAccount] = useState(null);

  const getAccountsData = async () => {
    const accountUrl = `${process.env.REACT_APP_SCRUMPTIOUS_SERVICE_API_HOST}/accounts`;
    const accountResponse = await fetch(accountUrl);
    if (accountResponse.ok) {
      const data = await accountResponse.json();
      setAccounts(data);
      // console.log("data", data);
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

  const handleDeleteClick = (id) => {
    setDeleteModalForAccount(id);
  };

  const handleAccountDoubleClick = (account) => {
    setSelectedAccount(account);
  };

  const closeAccountDetails = () => {
    setSelectedAccount(null);
  };

  if (!accModalStatus) return null;

  return (
    <div
      className="flex justify-center items-center absolute backdrop-blur-md w-[100%] h-[100%] z-[1000]"
      onClick={() => {
        closeAcc();
      }}
    >
      <div
        className="bg-gray-100 border border-gray-300 p-4 rounded-[19px] mt-10 w-[56.3125rem] relative pt-[3rem]"
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
            className="no-hover bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            onClick={() => setGridView(!gridView)}
          >
            {gridView ? "List View" : "Grid View"}
          </button>
        </div>
        <div className="relative">
          <div
            className="account-listing h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 px-2"
            style={{ overflowX: "hidden" }}
          >
            {gridView ? (
              <div
                className="grid gap-4"
                style={{ gridTemplateColumns: "repeat(4, 1fr)" }}
              >
                {filteredAccounts.length > 0 ? (
                  filteredAccounts.map((account) => (
                    <div
                      key={account.id}
                      className="border border-gray-300 p-4 rounded-md flex flex-col h-36 w-48 overflow-hidden transform hover:scale-105 transition duration-300 my-2 shadow-md"
                      onDoubleClick={() => handleAccountDoubleClick(account)}
                    >
                      {deleteModalForAccount === account.id ? (
                        <AccountPageDeleteModal
                          className="z-10 flex-grow text-sm"
                          show={deleteModalForAccount === account.id}
                          onConfirm={() => handleDeleteAccount(account.id)}
                          onCancel={() => setDeleteModalForAccount(null)}
                          cancelButtonClassName="text-xs py-1 px-2"
                          confirmButtonClassName="text-xs py-1 px-2"
                        />
                      ) : (
                        <>
                          <div className="flex-grow">
                            <p className="text-lg font-bold mb-2 truncate break-all">
                              <i
                                className="fa fa-user mr-2"
                                aria-hidden="true"
                              ></i>
                              {account.first_name} {account.last_name}
                            </p>
                            <p
                              className="text-gray-500"
                              style={{ wordWrap: "break-word" }}
                            >
                              <i
                                className="fa fa-envelope mr-2"
                                aria-hidden="true"
                              ></i>
                              {account.email.slice(0, 15)}
                              {account.email.length > 15 &&
                              account.email[15] !== "."
                                ? "..."
                                : ""}
                            </p>
                          </div>
                          <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-auto mt-2"
                            onClick={() => handleDeleteClick(account.id)}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  ))
                ) : (
                  <p>No accounts found.</p>
                )}
              </div>
            ) : (
              <>
                <div className="list-container flex flex-col items-center">
                  {filteredAccounts.length > 0 ? (
                    filteredAccounts.map((account) => (
                      <div
                        key={account.id}
                        className="account-card bg-gray-100 border border-gray-300 p-4 w-full md:max-w-xl my-4 rounded shadow-md flex flex-wrap items-center justify-between transform hover:scale-105 hover:shadow-lg transition-all duration-300"
                        onDoubleClick={() => handleAccountDoubleClick(account)}
                      >
                        <div className="flex flex-wrap items-center">
                          <div className="mr-4">
                            <p className="text-lg font-bold mb-2 break-all">
                              <i
                                className="fa fa-user mr-2"
                                aria-hidden="true"
                              ></i>
                              {account.first_name} {account.last_name}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500">
                              <i
                                className="fa fa-envelope mr-2"
                                aria-hidden="true"
                              ></i>
                              {account.email}
                            </p>
                          </div>
                        </div>
                        {deleteModalForAccount !== account.id && (
                          <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-auto mt-2"
                            onClick={() => handleDeleteClick(account.id)}
                          >
                            Delete
                          </button>
                        )}
                        {deleteModalForAccount === account.id && (
                          <AccountPageDeleteModal
                            show={deleteModalForAccount === account.id}
                            onConfirm={() => handleDeleteAccount(account.id)}
                            onCancel={() => setDeleteModalForAccount(null)}
                          />
                        )}
                      </div>
                    ))
                  ) : (
                    <p>No accounts found.</p>
                  )}
                </div>
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
