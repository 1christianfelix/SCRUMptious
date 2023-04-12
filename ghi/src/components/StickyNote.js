import React from "react";
import expand_icon from "../images/icons/expand_icon.svg";

// need to figure out easier widths and heights
const StickyNote = (props) => {
  //mimicking API response with props for display
  let category = props.category;
  let priority = props.priority;
  let priorityColor = "bg-white";
  let subject = props.subject;
  let start = null;
  let deadline = null;
  let content = props.content;

  let headerColor = null;
  let bodyColor = null;

  switch (priority) {
    case "1":
      priorityColor = "bg-gradient-to-l from-[#EFFFF2] to-[#a6e6b0] ";
      priority = "Low";
      break;
    case "2":
      priorityColor = "bg-gradient-to-l from-[#F5FDFF] to-[#85d4e6]";
      priority = "Medium";
      break;
    case "3":
      priorityColor = "bg-gradient-to-l from-[#FFECEC] to-[#e6b6b6]";
      priority = "High";
      break;
    default:
      priorityColor = "bg-white";
  }

  switch (category) {
    case "Backlog":
      headerColor = "bg-sticky_blue_header";
      bodyColor = "bg-sticky_blue";
      break;
    case "Todo":
      headerColor = "bg-sticky_red_header";
      bodyColor = "bg-sticky_red";
      break;
    case "Doing":
      headerColor = "bg-sticky_yellow_header";
      bodyColor = "bg-sticky_yellow";
      break;
    case "Review":
      headerColor = "bg-sticky_teal_header";
      bodyColor = "bg-sticky_teal";
      break;
    case "Done":
      headerColor = "bg-sticky_green_header";
      bodyColor = "bg-sticky_green";
      break;
    default:
      headerColor("bg-white");
      bodyColor("bg-slate-400");
  }

  return (
    <div className=" relative">
      <div className="STICKY w-[15.7275rem] h-[16.53625rem] 1440:w-[calc(15.7275rem*1.333)] 1440:h-[calc(16.53625rem*1.333)] drop-shadow-sticky">
        <div
          className={`STICKY_HEADER h-[22%] flex justify-between items-center px-5 ${headerColor} rounded-t-[19px]`}
        >
          <div
            className={`${priorityColor} h-[1.37500rem] w-[5.37500rem] 1440:w-[calc(5.37500rem*1.333)] 1440:h-[calc(1.37500rem*1.333)] flex items-center justify-center drop-shadow-sticky text-dark_mode_font`}
          >
            <span>{priority}</span>
          </div>
          <div className="flex flex-col ">
            <div className="flex justify-between">
              <span className="mr-1 1440:mr-2">Start:</span>
              <span>DATE</span>
            </div>
            <div>
              <span className="mr-1 1440:mr-2">Deadline:</span>
              <span>DATE</span>
            </div>
          </div>
        </div>
        <div
          className={`STICKY_BODY h-[78%] flex flex-col text-dark_mode_text_white ${bodyColor} rounded-b-[19px]`}
        >
          <span className="inline-block m-[1rem] mx-5 text-lg 1440:text-2xl ">
            {subject}
          </span>
          <div className="flex-grow flex flex-col text-sm overflow-auto mx-5 scrollbar-card scrollbar-w-[.4rem] 1440:scrollbar-w-[.6rem] 1440:text-lg pr-[.5rem]">
            <p className="">{content}</p>
          </div>
          <img src={expand_icon} className="m-[.7rem] self-end expand-button" />
        </div>
      </div>
    </div>
  );
};

export default StickyNote;
