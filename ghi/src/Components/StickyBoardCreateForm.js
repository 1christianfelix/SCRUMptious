import React, { useState, useContext, useEffect } from "react";
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
const StickyBoardCreateForm = (props) => {
  let type = props.type || "Create A Sticky Board";

  const { token } = useToken();

  const [boardName, setBoardName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [start, setStart] = useState("");
  const [deadline, setDeadline] = useState("");
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  let gradient = null;
  switch (priority) {
    case "1":
      gradient =
        "bg-gradient-to-tl from-[#B8FFC3] from-20% to-[#EFFFF2] to-80%";
      // priority = "Low";
      break;
    case "2":
      gradient =
        "bg-gradient-to-tl from-[#94ECFF] from-20% to-[#F5FDFF] to-80%";
      // priority = "Medium";
      break;
    case "3":
      gradient =
        "bg-gradient-to-tl from-[#FFCACA] from-20% to-[#FFECEC] to-80%";
      // priority = "High";
      break;
    default:
      gradient = "bg-white";
  }

  const handleBoardNameChange = (event) => {
    const value = event.target.value;
    setBoardName(value);
  };
  const handleDescriptionChange = (event) => {
    const value = event.target.value;
    setDescription(value);
  };
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

  // const { accounts, setAccounts } = useContext(AccountContext);
  const [accounts, setAccounts] = useState([]);
  const getAccountsData = async () => {
    const accountUrl = "http://localhost:8000/accounts";
    const accountResponse = await fetch(accountUrl);
    if (accountResponse.ok) {
      const data = await accountResponse.json();
      setAccounts(data);
      console.log(data);
    }
  };
  useEffect(() => {
    getAccountsData();
  }, []);

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
    props.close();
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
    console.log(data);
    const url = "http://localhost:8000/stickyboard";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      props.getStickyboardsData();

      setBoardName("");
      setDescription("");
      setPriority("");
      setStart("");
      setDeadline("");
      setMembers([]);
    }
  };

  return (
    <div
      className="h-screen w-[100%] flex items-center justify-center absolute  z-10 backdrop-blur-md "
      onClick={() => {
        props.close();
        setPriority("");
      }}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        className="flex gap-5 backdrop-blur-[9.3px]"
        onSubmit={handleSubmit}
      >
        {/* Input Section */}
        <div
          className={`INPUT-FORM w-[46.3125rem] h-[34.625rem] ${gradient} opacity-[.90] rounded-[19px] flex flex-col items-center`}
        >
          <div className="w-[100%] pt-2 px-6 flex items-center justify-between">
            <span className="text-2xl">Create a Sticky</span>
            <img
              src={close_out}
              alt=""
              onClick={() => {
                props.close();
                setPriority("");
              }}
              className="hover:cursor-pointer expand-button"
            />
          </div>

          <div className="w-[90%] flex flex-col gap-4 mt-2 text-dark_mode_font text-[2rem]">
            <div className="flex justify-between">
              <div className="PRIORITY">
                <select
                  name=""
                  id=""
                  className={`w-[12.8125rem] h-[3.25rem] text-center text-[1.5rem] drop-shadow-sticky  focus:outline-none`}
                  defaultValue="Select Priority"
                  required
                  onChange={handlePriorityChange}
                >
                  <option value="Select Priority" disabled hidden>
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
              <div className="MEMBERS-COUNT">
                <span className="mr-3">Members:</span>
                <span className="">{members.length}</span>
              </div>
            </div>
            <div className="BOARD-NAME border-solid border-b-black border-b-2 ">
              <div className="text-[3rem] flex w-[100%] justify-between gap-0">
                <input
                  type="text"
                  placeholder="Board Name"
                  required
                  className="leading-none bg-transparent placeholder:text-dark_mode_font focus:outline-none w-[100%]"
                  onChange={handleBoardNameChange}
                  // value={boardName}
                ></input>
                <img src={pen} className="h-8 w-8" />
              </div>
            </div>
            <div className="flex justify-between">
              <div className="START flex gap-2 text-[1.5rem]">
                <div>Start:</div>
                <div className="">
                  <input
                    type="date"
                    required
                    className="bg-transparent  focus:outline-none hover:cursor-text"
                    onChange={handleStartChange}
                    // value={start}
                  />
                </div>
              </div>
              <div className="DEADLINE flex gap-4 text-[1.5rem] self-end">
                <div>Deadline:</div>
                <div className="">
                  <input
                    type="date"
                    required
                    className="bg-transparent focus:outline-none hover:cursor-text"
                    onChange={handleDeadlineChange}
                    // value={deadline}
                  />
                </div>
              </div>
            </div>
          </div>
          <textarea
            type="text"
            required
            className="CONTENT-BOX w-[90%] mt-3 flex-grow overflow-auto scrollbar-card scrollbar-w-2 text-dark_mode_font focus:outline-none word-wrap bg-transparent border-solid border-[1px] border-black resize-none  text-[1.5rem] p-5 placeholder:text-black"
            onChange={handleDescriptionChange}
            // value={description}
            placeholder="Description"
          />

          <button className="button-hover-white-filled bg-white my-6 mx-12 px-[1rem] py-[.1rem] rounded-[19px] text-dark_mode_font self-end drop-shadow-sticky">
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
          </div>
        </div>
      </form>
    </div>
  );
};

export default StickyBoardCreateForm;
