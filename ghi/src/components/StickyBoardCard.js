import React from "react";
import garbage from "../images/icons/garbage.svg";

const StickyBoardCard = (props) => {
  // this priority variable should take on the priority property of the sticky board. This can be done through fetching the api.
  // for demonstration purposes, we're mimicking an API resonsee by using "props". The prop is being sent through the Dashboard.js
  // once api endpoints are configured, we will refactor the priority variable to grab the priority property from the API response instead
  let content = props.content;
  let priority = props.priority;
  let gradient = null;
  let boardName = null;
  let start = null;
  let deadline = null;
  let members = 0;
  // color switches based on priority
  switch (priority) {
    case "Low":
      gradient =
        "bg-gradient-to-tl from-[#B8FFC3] from-20% to-[#EFFFF2] to-80%";
      break;
    case "Medium":
      gradient =
        "bg-gradient-to-tl from-[#94ECFF] from-20% to-[#F5FDFF] to-80%";
      break;
    case "High":
      gradient =
        "bg-gradient-to-tl from-[#FFCACA] from-20% to-[#FFECEC] to-80%";
      break;
    default:
      gradient = "bg-white";
  }
  return (
    <div
      // style={{
      //   backgroundColor: "#e7e7e7",
      //   backgroundImage: "linear-gradient(132deg, #e7e7e7 20%, #C2FFCC 100%)",
      // }}
      className={`h-[238px] w-[289px] rounded-[8px] drop-shadow-sticky flex flex-col ${gradient}`}
    >
      <div className=" HEADER h-[20%] flex justify-between p-5 pt-2">
        <div className="PRIORITY_BOX bg-white h-[22px] w-[86px] flex items-center justify-center drop-shadow-sticky">
          <span>Priority</span>
        </div>
        <div className="MEMBERS_COUNT flex">
          <span className="mr-2">Members:</span>
          <span className="flex-grow">###</span>
        </div>
      </div>
      <div className="BODY h-[80%] mx-5 flex flex-col">
        <span className="inline-block text-xl font-semibold">
          Sticky Board Name
        </span>
        <div className="DATE_ROW flex justify-between">
          <div>
            <span className="mr-2">Start:</span>
            <span>DATE</span>
          </div>
          <div>
            <span>Deadline:</span>
            <span>DATE</span>
          </div>
        </div>
        <div className="flex-grow flex flex-col text-sm overflow-auto px-2 py-2 scrollbar-card">
          <p className="">{content}</p>
        </div>
        <div className="BUTTONS flex justify-between py-3">
          <img src={garbage} className="self-end expand-button" />
          <button className="button-hover-white-filled px-[.7rem] py-[.1rem] bg-white rounded-[19px]">
            <span>Edit Board</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StickyBoardCard;
