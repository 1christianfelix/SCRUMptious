import React from "react";
import expand_icon from "../images/icons/expand_icon.svg";

// need to figure out easier widths and heights
const StickyNote = (props) => {
  //mimicking API response with props for display
  let category = props.category;
  let priority = props.priority;
  let priorityColor = "bg-white";
  let subject = props.subject;
  let content = props.content;
  console.log(content);
  let start = new Date(props.start).toLocaleDateString();
  let deadline = new Date(props.deadline).toLocaleDateString();
  let headerColor = null;
  let bodyColor = null;
  // console.log(props);
  switch (priority) {
    case 1:
      priorityColor = "bg-gradient-to-l from-[#EFFFF2] to-[#a6e6b0] ";
      priority = "Low";
      break;
    case 2:
      priorityColor = "bg-gradient-to-l from-[#F5FDFF] to-[#85d4e6]";
      priority = "Medium";
      break;
    case 3:
      priorityColor = "bg-gradient-to-l from-[#FFECEC] to-[#e6b6b6]";
      priority = "High";
      break;
    default:
      priorityColor = "bg-white";
  }

  switch (category) {
    case "backlog":
      headerColor = "bg-sticky_blue_header";
      bodyColor = "bg-sticky_blue";
      break;
    case "todo":
      headerColor = "bg-sticky_red_header";
      bodyColor = "bg-sticky_red";
      break;
    case "doing":
      headerColor = "bg-sticky_yellow_header";
      bodyColor = "bg-sticky_yellow";
      break;
    case "review":
      headerColor = "bg-sticky_teal_header";
      bodyColor = "bg-sticky_teal";
      break;
    case "done":
      headerColor = "bg-sticky_green_header";
      bodyColor = "bg-sticky_green";
      break;
    default:
      headerColor = "bg-white";
      bodyColor = "bg-slate-400";
  }

  return (
    <div className=" relative">
      <div className="STICKY h-[16.53625rem] w-[15.7275rem] drop-shadow-sticky 1440:h-[calc(16.53625rem*1.333)] 1440:w-[calc(15.7275rem*1.333)]">
        <div
          className={`STICKY_HEADER flex h-[22%] items-center justify-between px-5 ${headerColor} rounded-t-[19px]`}
        >
          <div
            className={`${priorityColor} flex h-[1.37500rem] w-[5.37500rem] items-center justify-center text-dark_mode_font drop-shadow-sticky 1440:h-[calc(1.37500rem*1.333)] 1440:w-[calc(5.37500rem*1.333)]`}
          >
            <span>{priority}</span>
          </div>
          <div className="flex flex-col  text-sm 1440:text-lg">
            <div className="flex justify-between">
              <span className="mr-1  1440:mr-2">Start:</span>
              <span>{start}</span>
            </div>
            <div>
              <span className="mr-1 1440:mr-2">Deadline:</span>
              <span>{deadline}</span>
            </div>
          </div>
        </div>
        <div
          className={`STICKY_BODY flex h-[78%] flex-col text-dark_mode_text_white ${bodyColor} rounded-b-[19px]`}
        >
          <span className="m-[1rem] mx-5 inline-block text-lg 1440:text-2xl ">
            {subject}
          </span>
          <div className="scrollbar-card mx-5 flex flex-grow flex-col overflow-auto break-words pr-[.5rem] text-sm scrollbar-w-[.4rem] 1440:text-lg 1440:scrollbar-w-[.6rem]">
            <p className="">{content}</p>
          </div>
          <img
            alt="expand"
            src={expand_icon}
            className="expand-button invisible m-[.7rem] self-end"
            // onClick={}
          />
        </div>
      </div>
    </div>
  );
};

export default StickyNote;
