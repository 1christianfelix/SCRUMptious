import React, { useState, useEffect } from "react";
import Search_light from "../images/icons/Search_light.svg";
import sort_icon from "../images/icons/sort_icon.svg";
import filter_icon from "../images/icons/filter_icon.svg";
import trash from "../images/icons/trash.svg";
import pen from "../images/icons/pen.svg";

const StickyNoteInputForm = (props) => {
  const [category, setCategory] = useState("Default");
  const [headerColor, setHeaderColor] = useState("");
  const [bodyColor, setBodyColor] = useState("");

  let type = props.type || "Create/Update -> pass in type as prop to set";

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
  return (
    <form className="h-screen w-[100%] flex items-center justify-center absolute z-10">
      <div className="flex gap-5">
        <div className="STICKYNOTE w-[37.5rem] h-[39.375rem] ">
          <div
            className={`HEADER h-[22%] ${headerColor} rounded-t-[19px] flex flex-col`}
          >
            <span className="text-lg p-3 px-4">{type}</span>
            <div className="flex items-center justify-center gap-20">
              <select
                name=""
                id=""
                className="w-[12.8125rem] h-[3.25rem] text-center text-[1.5rem] drop-shadow-sticky"
                required
              >
                <option value="">Select Priority</option>
                <option value="">Hard</option>
                <option value="">Medium</option>
                <option value="">Easy</option>
              </select>
              <div className="text-[1.2rem]">
                <div className="grid grid-cols-calendar items-center">
                  <span className="">Start</span>
                  <input
                    type="date"
                    className=" bg-transparent focus:outline-none hover:cursor-text w-[90%] "
                  ></input>
                </div>
                <div className="grid grid-cols-calendar items-center">
                  <span>Deadline</span>
                  <input
                    type="date"
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
                    placeholder="Subject"
                    className="p-0 m-0 leading-none bg-transparent w-[16rem] placeholder:text-dark_mode_text_white focus:outline-none"
                  />
                  <img src={pen} className="ml-[.5rem]" />
                </div>
              </div>
              <select
                name=""
                id=""
                className="CATEGORY-SELECTION inline-block h-[2rem] w-[8.5rem] drop-shadow-sticky text-center"
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
            <textarea className="CONTENT-BOX flex-grow overflow-auto scrollbar-card scrollbar-w-3 text-dark_mode_text_white focus:outline-none bg-transparent border-solid border-[1px] border-text-dark_mode_text_white resize-none mx-[3.2rem] text-[1.5rem] p-5"></textarea>
            <div className="BUTTONS flex justify-between m-5 pt-10">
              <img src={trash} alt="" className="expand-button" />
              <button className="button-hover-white-filled bg-white px-[1rem] py-[.1rem] rounded-[19px] text-dark_mode_font self-end drop-shadow-sticky">
                Update
              </button>
            </div>
          </div>
        </div>
        <div className="MEMBER-LIST w-[20.5625rem] h-[39.375rem] bg-[#CCCCCC] bg-opacity-60 backdrop-blur-[9.3px] rounded-[19px] flex flex-col text-dark_mode_font ">
          <div className="flex items-center gap-[.5rem] m-5">
            <div className="SEARCH BAR w-[13.4375rem] h-[2.125rem] bg-white rounded-[19px] flex items-center justify-between px-3 ">
              <input
                placeholder="Search Member"
                className="focus:outline-none w-[100%]"
              ></input>
              <img src={Search_light} alt="" className="h-[1rem] w-[1rem]" />
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
              <img src={sort_icon} alt="" className="h-[.6rem] w-[.56rem]" />
              <span className="text-[.8rem]">Sort</span>
            </div>
          </div>
          <div className="mx-10 h-[75%] flex flex-col text-lg overflow-auto scrollbar-members-list">
            {/* Use this as the template to create multiple checkbox fields using the maps function */}
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
            {/* Everything from here to the next comment is a generation example for the scroll bar. You may delete */}
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
            {/* Everything from here to the previous comment is a generation example for the scroll bar. You may delete */}
          </div>
        </div>
      </div>
    </form>
  );
};

export default StickyNoteInputForm;
