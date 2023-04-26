import React, { useState, useEffect } from "react";

const AccountsPage = ({ token }) => {
  const [accounts, setAccounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [gridView, setGridView] = useState(false);
  const [isGridView, setIsGridView] = useState(false);  // Add state for grid view

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

  return (
    <div className="flex justify-center bg-gray-800">
      <div className="bg-gray-100 border border-gray-300 p-4 rounded-md mt-10 w-full max-w-screen-xl">
        <h1 className="text-center text-2xl font-bold mb-4">Accounts List</h1>
        <div className="mb-4">
          <input
            className="border border-gray-300 p-2 rounded-md w-full"
            type="text"
            placeholder="Search accounts"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex justify-end mb-4">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            onClick={() => setGridView(!gridView)}
          >
            {gridView ? "List View" : "Grid View"}
          </button>
        </div>
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
                >
                  <p className="text-lg font-bold mb-2">
                    {account.first_name} {account.last_name}
                  </p>
                  <p className="text-gray-500 mb-2"> {account.email}</p>
                  <p className="text-gray-500 mb-2">Account ID: {account.id}</p>
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
                >
                  <div>
                    <p className="text-lg font-medium">
                      {account.first_name} {account.last_name}
                    </p>
                    <p className="text-gray-500">{account.email}</p>
                    <p className="text-gray-500">Account ID: {account.id}</p>
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
    </div>
  );
};
export default AccountsPage;
