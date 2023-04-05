import React from "react";
import StickyBoardCard from "./StickyBoardCard";
import pen from "../images/icons/pen.svg";
import calendar_dark from "../images/icons/calendar_dark.svg";

// The prop being passed in will determine if it's a Create or Update
const StickyBoardInputForm = (props) => {
  let type =
    props.type ||
    "Please pass in either Create or Update a value for prop 'type'";
  return (
    <div className="INPUT-FORM w-[46.3125rem] h-[34.625rem] bg-[#CCCCCC] bg-opacity-60 rounded-[19px] flex flex-col items-center just">
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
          >
            <option type="number" value="3">
              Hard
            </option>
            <option type="number" value="2">
              Medium
            </option>
            <option type="number" value="1">
              Easy
            </option>
          </select>
        </div>
        <div className="START grid grid-cols-2">
          <div>Start</div>
          <div className="">
            <input
              type="date"
              className="bg-transparent w-[85%] focus:outline-none hover:cursor-text"
            />
          </div>
        </div>
        <div className="DEADLINE grid grid-cols-2">
          <div>Deadline</div>
          <div className="">
            <input
              type="date"
              className="bg-transparent w-[85%] focus:outline-none hover:cursor-text"
            />
          </div>
        </div>
        <div className="MEMBERS-COUNT grid grid-cols-2">
          <span>Members</span>
          <span>Count</span>
        </div>
      </div>
    </div>
  );
};

export default StickyBoardInputForm;
