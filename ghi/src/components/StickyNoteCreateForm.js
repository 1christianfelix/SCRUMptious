import React, { useState, useEffect, useContext } from "react";
import Search_light from "../images/icons/Search_light.svg";
import trash from "../images/icons/trash.svg";
import pen from "../images/icons/pen.svg";
import close_out from "../images/icons/close_out_icon.svg";
import "../App.css";
import AccountContext from "../context/AccountContext";
import useToken from "@galvanize-inc/jwtdown-for-react";

function StickyNoteCreateForm(props) {
  const { token } = useToken();
  const { accounts } = useContext(AccountContext);

  const [category, setCategory] = useState(props.category);
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [priority, setPriority] = useState("");
  const [priorityColor, setPriorityColor] = useState("");
  const [bodyColor, setBodyColor] = useState("");
  const [start_date, setStartDate] = useState("");
  const [deadline, setDeadline] = useState("");
  const [headerColor, setHeaderColor] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [members, setMembers] = useState([]);

  const handleColorChange = (event) => {
    // console.log("colorchanging");
    setCategory(event.target.value);
  };
  useEffect(() => {
    switch (category) {
      case "backlog":
        // console.log("Backlog");
        setHeaderColor("bg-sticky_blue_header");
        setBodyColor("bg-sticky_blue");
        break;
      case "todo":
        // console.log("Todo");

        setHeaderColor("bg-sticky_red_header");
        setBodyColor("bg-sticky_red");
        break;
      case "doing":
        // console.log("Doing");

        setHeaderColor("bg-sticky_yellow_header");
        setBodyColor("bg-sticky_yellow");
        break;
      case "review":
        // console.log("Review");

        setHeaderColor("bg-sticky_teal_header");
        setBodyColor("bg-sticky_teal");
        break;
      case "done":
        // console.log("Done");

        setHeaderColor("bg-sticky_green_header");
        setBodyColor("bg-sticky_green");
        break;
      default:
        // console.log("Default");
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
        // console.log("1");
        setPriorityColor("bg-gradient-to-l from-[#EFFFF2] to-[#B8FFC3] ");
        break;
      case "2":
        // console.log("2");
        setPriorityColor("bg-gradient-to-l from-[#F5FDFF] to-[#94ECFF]");
        break;
      case "3":
        // console.log("3");
        setPriorityColor("bg-gradient-to-l from-[#FFECEC] to-[#FFCACA]");
        break;
      default:
        // console.log("0");
        setPriorityColor("bg-white");
        break;
    }
  }, [priority]);

  const handleStartDateChange = (event) => {
    const value = event.target.value;
    setStartDate(value);
  };

  const handleDeadlineChange = (event) => {
    const value = event.target.value;
    setDeadline(value);
  };

  const handleSearchTermChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  const filteredAccounts = accounts.filter(
    (account) =>
      account.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.first_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    props.close();

    const data = {};
    data.subject = subject;
    data.content = content;
    data.priority = parseInt(priority);
    data.category = category;
    data.start_date = new Date(start_date + "T00:00:00");
    data.deadline = new Date(deadline + "T00:00:00");
    data.append = props.append;

    data.account = members;

    const url = `${process.env.REACT_APP_SCRUMPTIOUS_SERVICE_API_HOST}/${props.stickyboard_id}/sticky`;
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
      setSubject("");
      setCategory("");
      setContent("");
      setPriority(0);
      setStartDate("");
      setDeadline("");
      setMembers([]);
      props.refreshData();
    } else {
      console.error("Error:", response.status, await response.text());
    }
  };

  if (!props.open) {
    return null;
  }

  const handleClose = () => {
    setSubject("");
    setCategory("");
    setContent("");
    setPriority("");
    setStartDate("");
    setDeadline("");
    setMembers([]);
    props.close();
  };

  return (
    <div
      className="h-screen w-[100%] flex items-center justify-center absolute z-10 backdrop-blur-md"
      onClick={handleClose}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        id="create-form"
      >
        <div className="flex gap-5">
          <div className="STICKYNOTE w-[37.5rem] h-[39.375rem] ">
            <div
              className={`HEADER h-[22%] ${headerColor} rounded-t-[19px] flex flex-col`}
            >
              <div className="pt-2 px-4 flex items-center justify-between">
                <span className="text-2xl">Create a Sticky</span>
                <img
                  src={close_out}
                  alt="close"
                  onClick={handleClose}
                  className="hover:cursor-pointer expand-button"
                />
              </div>
              <div className="flex items-center justify-center gap-20">
                <select
                  name=""
                  id=""
                  className={`w-[12.8125rem] h-[3.25rem] text-center text-[1.5rem] drop-shadow-sticky ${priorityColor} focus:outline-none`}
                  required
                  defaultValue="Select Priority"
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
                <div className="SUBJECT-INPUT border-solid border-b-text-dark_mode_text_white border-b-2 mb-[2rem]">
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
                      className="p-0 m-0 leading-none bg-transparent w-[16rem] placeholder:text-slate-800 text-white focus:outline-none"
                    />
                    <img alt="pen" src={pen} className="ml-[.5rem]" />
                  </div>
                </div>
                <select
                  name=""
                  id=""
                  className="CATEGORY-SELECTION inline-block h-[2rem] w-[8.5rem] drop-shadow-sticky text-center focus:outline-none"
                  required
                  defaultValue={
                    props.category ? props.category : "Select Category"
                  }
                  onChange={handleColorChange}
                >
                  <option value="Select Category" disabled hidden>
                    Select Category
                  </option>
                  <option value="backlog">Backlog</option>
                  <option value="todo">Todo</option>
                  <option value="doing">Doing</option>
                  <option value="review">Review</option>
                  <option value="done">Done</option>
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
                className="CONTENT-BOX flex-grow overflow-auto scrollbar-card scrollbar-w-3 placeholder:text-slate-800 text-white focus:outline-none word-wrap bg-transparent border-solid border-[1px] border-text-dark_mode_text_white resize-none mx-[3.2rem] text-[1.5rem] p-5"
              ></textarea>
              <div className="BUTTONS flex justify-between m-5 pt-10">
                <img
                  alt="trash"
                  src={trash}
                  className="expand-button invisible"
                />
                <button className="button-hover-white-filled bg-white px-[1rem] py-[.1rem] rounded-[19px] text-dark_mode_font self-end drop-shadow-sticky">
                  Create
                </button>
              </div>
            </div>
          </div>
          {/* <div> */}

          <div className="MEMBER-LIST w-[20.5625rem] h-[39.375rem] bg-[#CCCCCC] bg-opacity-60 backdrop-blur-[9.3px] rounded-[19px] flex flex-col text-dark_mode_font ">
            <div className="flex items-center justify-center gap-[.5rem] m-5">
              <div className="SEARCH BAR w-[13.4375rem] h-[2.125rem] bg-white rounded-[19px] flex items-center justify-between px-3 ">
                <input
                  onChange={handleSearchTermChange}
                  value={searchTerm}
                  placeholder="Search Member"
                  className="focus:outline-none w-[100%]"
                ></input>
                <img src={Search_light} alt="" className="h-[1rem] w-[1rem]" />
              </div>
            </div>
            <ul className="mx-10 h-[75%] flex flex-col text-lg overflow-auto scrollbar-members-list">
              {filteredAccounts.map((filteredAccount) => {
                return (
                  <li
                    key={filteredAccount.id}
                    className="CHECKBOX-INPUT flex items-center p-1 border-solid border-b-[#000]/25 border-b-2"
                  >
                    <input
                      className="mr-2"
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
                      {filteredAccount.last_name}, {filteredAccount.first_name}{" "}
                      <br />
                      {filteredAccount.email} <br />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </form>
    </div>
  );
}

export default StickyNoteCreateForm;
