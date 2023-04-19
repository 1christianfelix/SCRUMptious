import React, { useState, useContext } from "react";
import StickyBoardCard from "./StickyBoardCard";
import pen from "../images/icons/pen.svg";
import calendar_dark from "../images/icons/calendar_dark.svg";
import Search_light from "../images/icons/Search_light.svg";
import sort_icon from "../images/icons/sort_icon.svg";
import filter_icon from "../images/icons/filter_icon.svg";
import close_out from "../images/icons/close_out_icon.svg";
import useToken from "@galvanize-inc/jwtdown-for-react";
import AccountContext from "../context/AccountContext";


// The prop being passed in will determine if it's a Create or Update
const StickyBoardUpdateForm = (props) => {
  let type = props.type || "Update the Sticky Board";



  const { token } = useToken();
  const { accounts, setAccounts } = useContext(AccountContext);
  const [boardName, setBoardName] = useState(props.stickyboard.board_name);
  const [description, setDescription] = useState(props.stickyboard.description);
  const [priority, setPriority] = useState(props.stickyboard.priority);
  const newDateFormats = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
  }
  const [start, setStart] = useState(new Date(props.stickyboard.start_date).toLocaleDateString("fr-CA", newDateFormats));
  const [deadline, setDeadline] = useState(new Date(props.stickyboard.deadline).toLocaleDateString("fr-CA", newDateFormats));
  const [members, setMembers] = useState(props.stickyboard.account);
  const [searchTerm, setSearchTerm] = useState("");
  let id = props.stickyboard.id

  const handleBoardNameChange = (event) => {
    const value = event.target.value;
    setBoardName(value);
  }
  const handleDescriptionChange = (event) => {
    const value = event.target.value;
    setDescription(value);
  }
  const handlePriorityChange = (event) => {
    const value = event.target.value;
    setPriority(value);
  };
  const handleStartChange = (event) => {
    const value = event.target.value;
    setStart(value);
  };
  const handleDeadlineChange = (event) => {
    const value = event.target.value;
    setDeadline(value);
  };
  const handleSearchTermChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  let filteredAccounts = accounts.filter(
    (account) =>
      account.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.first_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  if (!props.open) {
    return null;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};
    data.board_name = boardName;
    data.description = description;
    data.priority = parseFloat(priority);
    data.start_date = new Date(start + "T00:00:00");
    data.deadline = new Date(deadline + "T00:00:00");
    data.account = members;
    const url = `http://localhost:8000/stickyboard/${id}/`;
    const fetchConfig = {
      method: "put",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      props.getStickyboardsData();
      props.close();
    }
  };

  return (
    <div
      className="h-screen w-[100%] flex items-center justify-center absolute  z-10 backdrop-blur-md "
      onClick={props.close}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        className="flex gap-5 backdrop-blur-[9.3px]"
      >
        {/* Input Section */}
        <div className="INPUT-FORM w-[46.3125rem] h-[34.625rem] bg-[#CCCCCC] bg-opacity-60 rounded-[19px] flex flex-col items-center">
          <div className="w-[100%] pt-2 px-4 flex items-center justify-between">
            <span className="text-4xl p-5 self-start text-dark_mode_text_white ">
              {type}
            </span>
            <img
              src={close_out}
              alt=""
              onClick={props.close}
              className="hover:cursor-pointer expand-button"
            />
          </div>

          <div className="flex flex-col gap-6 text-dark_mode_font text-[2rem]">
            <div className="BOARD-NAME border-solid border-b-black border-b-2 mb-[2rem]">
              <div className="text-[3rem] flex w-[100%] justify-between gap-0">
                <input
                  type="text"
                  placeholder="Board Name"
                  className="leading-none bg-transparent placeholder:text-dark_mode_font focus:outline-none"
                  onChange={handleBoardNameChange}
                  value={boardName}
                ></input>
                <img src={pen} className="" />
              </div>
            </div>
            <div className="PRIORITY grid grid-cols-2">
              <div>Priority</div>
              <select
                name=""
                id=""
                className="bg-[#fff] w-[8.4rem] h-[2.2rem] focus:outline-none text-[1.5rem] text-center drop-shadow-sticky self-center hover:cursor-pointer"
                defaultValue="Select Priority"
                required
                defaultValue={priority}
                onChange={handlePriorityChange}
              >
                {/* <option value="Select Priority" disabled hidden>
                  Select
                </option> */}
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
            </div>
            <div className="START grid grid-cols-2">
              <div>Start</div>
              <div className="">
                <input
                  type="date"
                  className="bg-transparent w-[85%] focus:outline-none hover:cursor-text"
                  defaultValue={start}
                  onChange={handleStartChange}
                  // value={start}
                />
              </div>
            </div>
            <div className="DEADLINE grid grid-cols-2">
              <div>Deadline</div>
              <div className="">
                <input
                  type="date"
                  className="bg-transparent w-[85%] focus:outline-none hover:cursor-text"
                  defaultValue={deadline}
                  onChange={handleDeadlineChange}
                  // value={deadline}
                />
              </div>
            </div>
            <div className="DESCRIPTION grid grid-cols-2">
              <div>Description</div>
              <div className="">
                <input
                  type="text"
                  className="bg-transparent w-[85%] focus:outline-none hover:cursor-text"
                  onChange={handleDescriptionChange}
                  value={description}
                />
              </div>
            </div>

            <div className="MEMBERS-COUNT grid grid-cols-2">
              <span>Members</span>
              <span>{members.length}</span>
            </div>
          </div>


          <button
            className="button-hover-white-filled bg-white mt-8 mx-12 px-[1rem] py-[.1rem] rounded-[19px] text-dark_mode_font self-end drop-shadow-sticky"
            onClick={handleSubmit}
          >
            Update
          </button>
        </div>
        {/* Member Selection */}
        <div className="MEMBER-LIST w-[20.5625rem] h-[34.625rem] bg-[#CCCCCC] bg-opacity-60 backdrop-blur-[9.3px] rounded-[19px] flex flex-col text-dark_mode_font">
          <div className="flex items-center gap-[.5rem] m-5">
            <div className="SEARCH BAR w-[13.4375rem] h-[2.125rem] bg-white rounded-[19px] flex items-center justify-between px-3 ">
              <input
                placeholder="Search Member"
                className="focus:outline-none w-[100%]"
                onChange={handleSearchTermChange}
                value={searchTerm}
              ></input>
              <img src={Search_light} alt="" className="h-[1rem] w-[1rem]" />
            </div>
            {/* <div className="FILTER flex gap-[.2rem] items-center expand-button">
              <img
                src={filter_icon}
                alt=""
                className="h-[.6rem] w-[.56rem] expand-button"
              />
              <span className="text-[.8rem]">Filter</span>
            </div>
            <div className="SORT flex gap-[.2rem] items-center expand-button">
              <img src={sort_icon} alt="" className="h-[.6rem] w-[.56rem]" />
              <span className="text-[.8rem]">Sort</span>
            </div> */}
          </div>
          <div className="mx-10 h-[75%] flex flex-col text-lg overflow-auto scrollbar-members-list">
            {/* Use this as the template to create multiple checkbox fields using the maps function */}
            {filteredAccounts.map((filteredAccount) => {
              return (
                <div
                  key={filteredAccount.id}
                  className="CHECKBOX-INPUT flex items-center p-1 border-solid border-b-[#000]/25 border-b-2"
                >
                  <input
                    label="members"
                    type="checkbox"
                    className="mr-2"
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
                  <label htmlFor="members" className="flex flex-col">
                    <span>
                      {filteredAccount.last_name}, {filteredAccount.first_name}
                    </span>{" "}
                    <span>{filteredAccount.email}</span>
                  </label>
                </div>
              );
            })}
            {/* Everything from here to the next comment is a generation example for the scroll bar. You may delete */}
            {/* <div className="CHECKBOX-INPUT flex items-center p-1 border-solid border-b-[#000]/25 border-b-2">
              <input
                label="test"
                type="checkbox"
                value="Account"
                className="mr-2"
              />
              <label htmlFor="test" className="flex flex-col">
                <span>Name</span> <span>Email</span>
              </label>
            </div>
            <div className="CHECKBOX-INPUT flex items-center p-1 border-solid border-b-[#000]/25 border-b-2">
              <input
                label="test"
                type="checkbox"
                value="Account"
                className="mr-2"
              />
              <label htmlFor="test" className="flex flex-col">
                <span>Name</span> <span>Email</span>
              </label>
            </div>
            <div className="CHECKBOX-INPUT flex items-center p-1 border-solid border-b-[#000]/25 border-b-2">
              <input
                label="test"
                type="checkbox"
                value="Account"
                className="mr-2"
              />
              <label htmlFor="test" className="flex flex-col">
                <span>Name</span> <span>Email</span>
              </label>
            </div>
            <div className="CHECKBOX-INPUT flex items-center p-1 border-solid border-b-[#000]/25 border-b-2">
              <input
                label="test"
                type="checkbox"
                value="Account"
                className="mr-2"
              />
              <label htmlFor="test" className="flex flex-col">
                <span>Name</span> <span>Email</span>
              </label>
            </div>
            <div className="CHECKBOX-INPUT flex items-center p-1 border-solid border-b-[#000]/25 border-b-2">
              <input
                label="test"
                type="checkbox"
                value="Account"
                className="mr-2"
              />
              <label htmlFor="test" className="flex flex-col">
                <span>Name</span> <span>Email</span>
              </label>
            </div>
            <div className="CHECKBOX-INPUT flex items-center p-1 border-solid border-b-[#000]/25 border-b-2">
              <input
                label="test"
                type="checkbox"
                value="Account"
                className="mr-2"
              />
              <label htmlFor="test" className="flex flex-col">
                <span>Name</span> <span>Email</span>
              </label>
            </div>
            <div className="CHECKBOX-INPUT flex items-center p-1 border-solid border-b-[#000]/25 border-b-2">
              <input
                label="test"
                type="checkbox"
                value="Account"
                className="mr-2"
              />
              <label htmlFor="test" className="flex flex-col">
                <span>Name</span> <span>Email</span>
              </label>
            </div>
            <div className="CHECKBOX-INPUT flex items-center p-1 border-solid border-b-[#000]/25 border-b-2">
              <input
                label="test"
                type="checkbox"
                value="Account"
                className="mr-2"
              />
              <label htmlFor="test" className="flex flex-col">
                <span>Name</span> <span>Email</span>
              </label>
            </div>
            <div className="CHECKBOX-INPUT flex items-center p-1 border-solid border-b-[#000]/25 border-b-2">
              <input
                label="test"
                type="checkbox"
                value="Account"
                className="mr-2"
              />
              <label htmlFor="test" className="flex flex-col">
                <span>Name</span> <span>Email</span>
              </label>
            </div> */}
            {/* Everything from here to the previous comment is a generation example for the scroll bar. You may delete */}
          </div>
        </div>
      </form>
    </div>
  );
};

export default StickyBoardUpdateForm;
