import React, { useState, useEffect } from "react";
import Search_light from "../images/icons/Search_light.svg";
import sort_icon from "../images/icons/sort_icon.svg";
import filter_icon from "../images/icons/filter_icon.svg";
import trash from "../images/icons/trash.svg";
import pen from "../images/icons/pen.svg";
import "../App.css";

function StickyNoteCreateForm({ accounts, stickyBoard }) {
  // console.log(accounts);
  const [category, setCategory] = useState("Default");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [priority, setPriority] = useState(0);
  const [priorityColor, setPriorityColor] = useState("null");
  const [bodyColor, setBodyColor] = useState("");
  const [status, setStatus] = useState("");
  const [start_date, setStartDate] = useState("");
  const [deadline, setDeadline] = useState("");
  // const [stickyBoard, setStickyBoard] = useState("");
  const [headerColor, setHeaderColor] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStickyBoard, setSelectedStickyBoard] = useState("");
  const [members, setMembers] = useState([]);

  let type = accounts.type || "Create/Update -> pass in type as prop to set";

  const handleColorChange = (event) => {
    setCategory(event.target.value);
  };
  useEffect(() => {
    switch (category) {
      case "Backlog":
        console.log("Backlog");
        setHeaderColor("bg-sticky_blue_header");
        setBodyColor("bg-sticky_blue");
        break;
      case "Todo":
        console.log("Todo");

        setHeaderColor("bg-sticky_red_header");
        setBodyColor("bg-sticky_red");
        break;
      case "Doing":
        console.log("Doing");

        setHeaderColor("bg-sticky_yellow_header");
        setBodyColor("bg-sticky_yellow");
        break;
      case "Review":
        console.log("Review");

        setHeaderColor("bg-sticky_teal_header");
        setBodyColor("bg-sticky_teal");
        break;
      case "Done":
        console.log("Done");

        setHeaderColor("bg-sticky_green_header");
        setBodyColor("bg-sticky_green");
        break;
      default:
        console.log("Default");
        setHeaderColor("bg-white");
        setBodyColor("bg-slate-100");
    }
  }, [category]);

  const handleSubjectChange = (event) => {
    const value = event.target.value;
    setSubject(value);
  };

  const handleContentChange = (event) => {
    const value = event.target.value;
    setContent(value);
  };

  const handlePriorityChange = (event) => {
    const value = event.target.value;
    setPriority(value);
  };

  useEffect(() => {
    switch (priority) {
      case "1":
        console.log("1");
        setPriorityColor("bg-gradient-to-l from-[#EFFFF2] to-[#B8FFC3] ");
        break;
      case "2":
        console.log("2");
        setPriorityColor("bg-gradient-to-l from-[#F5FDFF] to-[#94ECFF]");
        break;
      case "3":
        console.log("3");
        setPriorityColor("bg-gradient-to-l from-[#FFECEC] to-[#FFCACA]");
        break;
      default:
        console.log("default");
        setPriorityColor("bg-white");
    }
  }, [priority]);

  // const handleStatusChange = (event) => {
  //   const value = event.target.value;
  //   setStatus(value);
  // };

  const handleStartDateChange = (event) => {
    const value = event.target.value;
    setStartDate(value);
  };

  const handleDeadlineChange = (event) => {
    const value = event.target.value;
    setDeadline(value);
  };

  const handleStickyBoardChange = (event) => {
    const value = event.target.value;
    setSelectedStickyBoard(value);
  };
  const handleSearchTermChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  // const handleMemberChange = (event) => {
  //   const value = event.target.value;
  //   setMembers(value);
  // };

  const filteredAccounts = accounts.filter(
    (account) =>
      account.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.first_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    // setIsStickyCreated(true);

    const data = {};
    data.subject = subject;
    data.content = content;
    data.priority = parseInt(priority);
    data.category = status;
    data.start_date = new Date(start_date + "T00:00:00");
    data.deadline = new Date(deadline + "T00:00:00");
    data.stickyBoard = selectedStickyBoard;
      // data.stickyBoard = JSON.stringify(stickyBoard);
      // data.stickyBoard = stickyBoardAsString;
    data.account = members;

    console.log(data);

    const url = "http://localhost:8000/sticky";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      console.log("ok");

      setSubject("");
      setContent("");
      setPriority("");
      setStatus("");
      setStartDate("");
      setDeadline("");
      setMembers("");
      setSelectedStickyBoard("");
    } else {
      console.error("Error:", response.status, await response.text());
    }
  };

  return (
    <>
      <form
        className="h-screen w-[100%] flex items-center justify-center absolute z-10"
        onSubmit={handleSubmit}
        id="create-form"
      >
        <div className="flex gap-5">
          <div className="sticky-container flex">
            <div className="STICKYNOTE w-[37.5rem] h-[39.375rem] ">
              <div
                className={`HEADER h-[22%] ${headerColor} rounded-t-[19px] flex flex-col`}
              >
                <span className="text-lg p-3 px-4">{type}</span>

                <div className="flex items-center justify-center gap-20">
                  <select
                    name=""
                    id=""
                    className={`w-[12.8125rem] h-[3.25rem] text-center text-[1.5rem] drop-shadow-sticky ${priorityColor} focus:outline-none`}
                    required
                    value={priority}
                    onChange={handlePriorityChange}
                  >
                    <option value="">Select Priority</option>
                    <option type="number" value="3">
                      High
                    </option>
                    <option type="number" value="2">
                      Medium
                    </option>
                    <option type="number" value="1">
                      Low
                    </option>
                  </select>
                  <div className="text-[1.2rem]">
                    <div className="grid grid-cols-calendar items-center">
                      <span className="">Start</span>
                      <input
                        onChange={handleStartDateChange}
                        value={start_date}
                        placeholder="date"
                        required
                        type="date"
                        name="date"
                        id="date"
                        className=" bg-transparent focus:outline-none hover:cursor-text w-[90%]"
                      ></input>
                    </div>
                    <div className="grid grid-cols-calendar items-center">
                      <span>Deadline</span>
                      <input
                        onChange={handleDeadlineChange}
                        value={deadline}
                        placeholder="date"
                        required
                        type="date"
                        name="date"
                        id="date"
                        className="bg-transparent focus:outline-none hover:cursor-text w-[90%]"
                      ></input>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`BODY h-[78%] ${bodyColor} rounded-b-[19px] flex flex-col`}
              >
                <div className="flex item-center justify-center mt-6 gap-20">
                  <div className="SUBJECT-INPUT border-solid border-b-text-dark_mode_text_white border -b-2 mb-[2rem]">
                    <div className="text-[2rem] flex">
                      <input
                        onChange={handleSubjectChange}
                        value={subject}
                        placeholder="Subject"
                        required
                        type="text"
                        maxLength="17"
                        name="text"
                        id="subject"
                        className="p-0 m-0 leading-none bg-transparent w-[16rem] placeholder:text-slate-700 focus:outline-none"
                      />
                      {/* <label htmlFor="Subject">SubjectName</label> */}
                      <img src={pen} className="ml-[.5rem]" />
                    </div>
                  </div>
                  <div>
                    <select
                      value={selectedStickyBoard}
                      onChange={handleStickyBoardChange}
                      className="..."
                    >
                      <option value="">Select Sticky Board</option>
                      {stickyBoard.map((board) => (
                        <option key={board.id} value={board.id}>
                          {board.board_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <select
                    name=""
                    id=""
                    className="CATEGORY-SELECTION inline-block h-[2rem] w-[8.5rem] drop-shadow-sticky text-center focus:outline-none"
                    required
                    value={category}
                    onChange={handleColorChange}
                  >
                    <option value="Default">Select Category</option>
                    <option value="Backlog">Backlog</option>
                    <option value="Todo">Todo</option>
                    <option value="Doing">Doing</option>
                    <option value="Review">Review</option>
                    <option value="Done">Done</option>
                  </select>
                </div>
                <textarea
                  onChange={handleContentChange}
                  value={content}
                  placeholder="content"
                  required
                  type="text"
                  name="text"
                  id="content"
                  className="CONTENT-BOX flex-grow overflow-auto scrollbar-card scrollbar-w-3 text-dark_mode_font focus:outline-none bg-transparent border-solid border-[1px] border-text-dark_mode_text_white resize-none mx-[3.2rem] text-[1.5rem] p-5]"
                ></textarea>
                <div className="BUTTONS flex justify-between m-5 pt-10">
                  <img src={trash} alt="" className="expand-button" />
                  <button className="button-hover-white-filled bg-white px-[1rem] py-[.1rem] rounded-[19px] text-dark_mode_font self-end drop-shadow-sticky">
                    Create
                  </button>
                </div>
              </div>
            </div>
            {/* <div> */}

            <div className="MEMBER-LIST w-[20.5625rem] h-[39.375rem] bg-[#CCCCCC] bg-opacity-60 backdrop-blur-[9.3px] rounded-[19px] flex flex-col text-dark_mode_font ml-[1rem]">
              <div className="flex items-center gap-[.5rem] m-5">
                <div className="SEARCH BAR w-[13.4375rem] h-[2.125rem] bg-white rounded-[19px] flex items-center justify-between px-3 ">
                  <input
                    onChange={handleSearchTermChange}
                    value={searchTerm}
                    placeholder="Search Member"
                    className="focus:outline-none w-[100%]"
                  ></input>
                  <img
                    src={Search_light}
                    alt=""
                    className="h-[1rem] w-[1rem]"
                  />
                </div>
                <div className="FILTER flex gap-[.2rem] items-center expand-button">
                  <img
                    src={filter_icon}
                    alt=""
                    className="h-[.6rem] w-[.56rem] expand-button"
                  />
                  <span className="text-[.8rem]">Filter</span>
                </div>
                <div className="SORT flex gap-[.2rem] items-center expand-button">
                  <img
                    src={sort_icon}
                    alt=""
                    className="h-[.6rem] w-[.56rem]"
                  />
                  <span className="text-[.8rem]">Sort</span>
                </div>
              </div>
              <ul className="mx-10 h-[75%] flex flex-col text-lg overflow-auto scrollbar-members-list">
                {filteredAccounts.map((filteredAccount) => {
                  return (
                    <li
                      key={filteredAccount.id}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        checked={members.includes(filteredAccount.id)}
                        onChange={(event) => {
                          if (event.target.checked) {
                            setMembers([...members, filteredAccount.id]);
                          } else {
                            setMembers(
                              members.filter((id) => id !== filteredAccount.id)
                            );
                          }
                        }}
                      />
                      <div>
                        {filteredAccount.last_name},{" "}
                        {filteredAccount.first_name} <br />
                        {filteredAccount.email} <br />
                      </div>
                    </li>
                  );
                })}
              </ul>
              <button className="btn btn-primary">Add</button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default StickyNoteCreateForm;
