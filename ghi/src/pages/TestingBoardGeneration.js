import { useEffect, useState } from "react";
import React from "react";

const TestingBoardGeneration = () => {
  const [board, setBoard] = useState("");
  const [stickies, setStickies] = useState([]);

  const fetchData = async () => {
    const board = await fetch(
      "http://localhost:8000/stickyboard/6427a08a6e5bfa3f7523e151"
    );
    const stickies = await fetch(
      "http://localhost:8000/stickyboard/6427a08a6e5bfa3f7523e151/sticky"
    );

    if (board.ok && stickies.ok) {
      console.log("success");
      const testBoard = await board.json();
      const testStickies = await stickies.json();
      // console.log(testStickies);
      setBoard(testBoard);
      setStickies(testStickies || []);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addSticky = () => {
    setStickies((prev) => [
      ...prev,
      { subject: `Subject_${stickies.length + 1}` },
    ]);
  };

  // mock submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      subject: `Subject_${stickies.length + 1}`,
      content: "string",
      priority: 0,
      status: "string",
      startDate: new Date().toISOString(),
      deadline: new Date().toISOString(),
      stickyBoard: "6427a08a6e5bfa3f7523e151",
      user: ["string"],
    };
    const url = "http://localhost:8000/sticky";
    const fetchConfig = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      console.log("yes");
      let res = await response.json();
      console.log(res);
      setStickies((prev) => [...prev, res]);
    }
  };

  return (
    <div className="bg-white h-screen">
      <button
        className="block border-solid border-2 border-black bg-white"
        onClick={handleSubmit}
      >
        Add sticky
      </button>
      <div>board name: {board["boardName"]}</div>
      {stickies.length > 0 &&
        stickies.map((sticky, index) => {
          return <div key={index}>{sticky["subject"]}</div>;
        })}
      <div>{console.log(stickies)}</div>
    </div>
  );
};

export default TestingBoardGeneration;
