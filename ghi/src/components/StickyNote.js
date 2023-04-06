import React from "react";
import expand_icon from "../images/icons/expand_icon.svg";

// need to figure out easier widths and heights
const StickyNote = (props) => {
  //mimicking API response with props for display
  let category = props.category;
  let priority = null;
  let subject = null;
  let start = null;
  let deadline = null;
  let content = props.content;

  let headerColor = null;
  let bodyColor = null;

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
      bodyColor("bg-slate-100");
  }

  return (
    <div className="relative">
      <div className="STICKY w-[15.7275rem] h-[16.53625rem] drop-shadow-sticky">
        <div
          className={`STICKY_HEADER h-[22%] flex justify-between items-center px-5 ${headerColor} rounded-t-[19px]`}
        >
          <div className="bg-white h-[22px] w-[86px] flex items-center justify-center drop-shadow-sticky">
            <span>Priority</span>
          </div>
          <div className="flex flex-col ">
            <div className="flex justify-between">
              <span className="mr-1">Start:</span>
              <span>DATE</span>
            </div>
            <div>
              <span className="mr-1">Deadline:</span>
              <span>DATE</span>
            </div>
          </div>
        </div>
        <div
          className={`STICKY_BODY h-[78%] flex flex-col text-dark_mode_text_white ${bodyColor} rounded-b-[19px]`}
        >
          <span className="inline-block m-[1rem] mx-5 text-3xl">Subject</span>
          <div className="flex-grow flex flex-col text-sm overflow-auto mx-5 scrollbar-card">
            <p className="">{content}</p>
          </div>
          <img src={expand_icon} className="m-[.7rem] self-end expand-button" />
        </div>
      </div>
    </div>
  );
};

export default StickyNote;
