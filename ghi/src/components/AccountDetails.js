import React from "react";

const AccountDetails = ({ account, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div className="bg-white p-4 rounded-md w-full max-w-screen-md relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-lg font-bold mb-2 truncate break-all">
          <i className="fa fa-user mr-2" aria-hidden="true"></i>
          {account.first_name} {account.last_name}
        </h2>

        <p>
          <i className="fa fa-envelope mr-2" aria-hidden="true"></i>{" "}
          {account.email}
        </p>
        <p>Account ID: {account.id}</p>
      </div>
    </div>
  );
};

export default AccountDetails;
