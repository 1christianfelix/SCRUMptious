import React, { useEffect, useState, useContext } from "react";
import StickyBoardCard from "./StickyBoardCard";
import pen from "../images/icons/pen.svg";
import calendar_dark from "../images/icons/calendar_dark.svg";
import Search_light from "../images/icons/Search_light.svg";
import sort_icon from "../images/icons/sort_icon.svg";
import filter_icon from "../images/icons/filter_icon.svg";
// import { useNavigate } from 'react-router-dom';
import useToken from "@galvanize-inc/jwtdown-for-react";


// The prop being passed in will determine if it's a Create or Update
const StickyBoardCreateForm = (props) => {
  let type =
    props.type ||
    "Create A Sticky Board";
  const { token } = useToken();
  const [boardName, setBoardName] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [start, setStart] = useState('');
  const [deadline, setDeadline] = useState('');
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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

  }
  const handleStartChange = (event) => {
    const value = event.target.value;
    setStart(value);
  }
  const handleDeadlineChange = (event) => {
    const value = event.target.value;
    setDeadline(value);
  }
  const handleSearchTermChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
  }

  const filteredAccounts = props.accounts.filter((account) =>
  account.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  account.first_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};
    data.board_name = boardName;
    data.description = description;
    data.priority = parseFloat(priority);
    data.start_date = new Date(start + "T00:00:00");
    data.deadline = new Date(deadline + "T00:00:00");
    data.account = members;
    data.backlog = [];
    data.todo = [];
    data.doing = [];
    data.review = [];
    data.done = [];
    const url = "http://localhost:8000/stickyboard";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      console.log("ok")  // should be redirect to stickyboard list page        navigate('/stickyboard');
    }
  }


  return (
    <form onSubmit={handleSubmit} className="h-screen w-[100%] flex items-center justify-center absolute z-10">
      <div className="flex gap-5">
        {/* Input Section */}
        <div className="INPUT-FORM w-[46.3125rem] h-[34.625rem] bg-[#CCCCCC] bg-opacity-60 rounded-[19px] flex flex-col items-center">
          <p className="text-2xl p-5 self-start text-dark_mode_text_white">
            {type}
          </p>
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
                required
                onChange={handlePriorityChange}
              >
                <option value="" disabled selected hidden>
                  Select Priority
                </option>
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
                  onChange={handleStartChange}
                  value={start}
                />
              </div>
            </div>
            <div className="DEADLINE grid grid-cols-2">
              <div>Deadline</div>
              <div className="">
                <input
                  type="date"
                  className="bg-transparent w-[85%] focus:outline-none hover:cursor-text"
                  onChange={handleDeadlineChange}
                  value={deadline}
                />
              </div>
            </div>
            <div className="MEMBERS-COUNT grid grid-cols-2">
              <span>Members</span>
              <span>{members.length}</span>
            </div>
          </div>
          <div className="START grid grid-cols-2">
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
          <button className="button-hover-white-filled bg-white mt-16 mx-8 px-[1rem] py-[.1rem] rounded-[19px] text-dark_mode_font self-end drop-shadow-sticky">
            Create
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
            <div key={filteredAccount.id} className="CHECKBOX-INPUT flex items-center p-1 border-solid border-b-[#000]/25 border-b-2">
              <input
                label="members"
                type="checkbox"
                className="mr-2"
                checked={members.includes(filteredAccount.id)}
                onChange={(event) => {
                  if (event.target.checked) {
                    setMembers([...members, filteredAccount.id]);
                  } else {
                    setMembers(members.filter((id) => id !== filteredAccount.id));
                  }
                }}
              />
              <label htmlFor="members" className="flex flex-col">
                <span>{ filteredAccount.last_name }, {filteredAccount.first_name}</span> <span>{ filteredAccount.email }</span>
              </label>
            </div>
              );
            })}
          </div>
        </div>
      </div>
    </form>
  );
};

export default StickyBoardCreateForm;
