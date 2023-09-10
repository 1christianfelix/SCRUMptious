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
      .includes(searchTerm.toLowerCase()),
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
      className="absolute z-[10] flex h-[100%] w-[100%] items-center justify-center backdrop-blur-md"
      onClick={() => {
        closeAcc();
      }}
    >
      <div
        className="relative mt-10 w-[56.3125rem] rounded-[19px] border border-gray-300 bg-gray-100 p-4 pt-[3rem]"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={close_out}
          alt="close"
          className="expand-button absolute right-5 top-3 h-[2rem] w-[2rem] hover:cursor-pointer"
          onClick={() => {
            closeAcc();
          }}
        />
        <h1 className="mb-8 text-center text-2xl font-bold">Accounts List</h1>
        <div className="mb-6 flex w-[100%] items-center  justify-center gap-4">
          <div className=" flex  h-[2.5rem] w-[50%] rounded-[19px] bg-white px-6 text-xl drop-shadow-md">
            <input
              className="w-[100%] focus:outline-none"
              type="text"
              placeholder="Search Accounts"
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <img src={Search_light} alt="" />
          </div>
          <button
            className="no-hover rounded bg-gray-300 px-4 py-2 font-bold text-gray-800 hover:bg-gray-400"
            onClick={() => setGridView(!gridView)}
          >
            {gridView ? "List View" : "Grid View"}
          </button>
        </div>
        <div className="relative">
          <div
            className="account-listing h-96 overflow-y-auto px-2 scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-400"
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
                      className="my-2 flex h-36 w-48 transform flex-col overflow-hidden rounded-md border border-gray-300 p-4 shadow-md transition duration-300 hover:scale-105"
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
                            <p className="mb-2 truncate break-all text-lg font-bold">
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
                            className="mx-auto mt-2 rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
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
                        className="account-card my-4 flex w-full transform flex-wrap items-center justify-between rounded border border-gray-300 bg-gray-100 p-4 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg md:max-w-xl"
                        onDoubleClick={() => handleAccountDoubleClick(account)}
                      >
                        <div className="flex flex-wrap items-center">
                          <div className="mr-4">
                            <p className="mb-2 break-all text-lg font-bold">
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
                            className="ml-auto mt-2 rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
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
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountsPage;
