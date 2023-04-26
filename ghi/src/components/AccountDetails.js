import React, { useState, useEffect } from "react";
import StickyDetails from "./StickyDetails";

import useToken from "@galvanize-inc/jwtdown-for-react";


const AccountDetails = ({ account, onClose }) => {
      const { token } = useToken();

  const [stickies, setStickies] = useState([]);
  const [stickyId, setStickyId] = useState(null);

useEffect(() => {
  async function fetchStickies() {
    const response = await fetch("http://localhost:8000/sticky");
    const data = await response.json();
    console.log(data);
    setStickies(data.filter((sticky) => sticky.account.includes(account.id)));
  }
  fetchStickies();
}, [account.id]);

  const handleStickyClick = (stickyId) => {
    setStickyId(stickyId);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div className="bg-white p-4 rounded-md w-full max-w-screen-md relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-center text-2xl font-bold mb-4">
          {account.first_name} {account.last_name}
        </h2>
        <p>Email: {account.email}</p>
        <p>Account ID: {account.id}</p>
        {stickies.map((sticky) => (
          <div key={sticky.id} onClick={() => handleStickyClick(sticky.id)}>
            <p>{sticky.subject}</p>
            <p>{sticky.content}</p>
          </div>
        ))}
        {stickyId && <StickyDetails stickyId={stickyId} />}
      </div>
    </div>
  );
};

export default AccountDetails;
