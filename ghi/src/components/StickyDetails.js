import React, { useState, useEffect } from "react";

const StickyDetails = ({ stickyId }) => { //may need ot pass props but I am not sure, depends on endpoint. ask john!
  const [sticky, setSticky] = useState(null);

  useEffect(() => {
    const fetchSticky = async () => {
      const response = await fetch(
        `http://localhost:8000/sticky` // correct urL? 
      );
      const data = await response.json();
      setSticky(data);
    //   console.log(data)
    };
    fetchSticky();
  }, [stickyId]);

  return (
    <div>
      {sticky ? (
        <div>
          <h2>{sticky.subject}</h2>
          <p>{sticky.content}</p>
          <p>{sticky.priority}</p>
          <p>{sticky.category}</p>
          <p>{sticky.start_date}</p>
          <p>{sticky.deadline}</p>
          <p>{sticky.account}</p>
          <p>{sticky.sticky_board}</p>
        </div>
      ) : (
        <p>No data</p>
      )}
    </div>
  );
};

export default StickyDetails;
