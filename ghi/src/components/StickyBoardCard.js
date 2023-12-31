import React from "react";
import garbage from "../images/icons/garbage.svg";

const StickyBoardCard = (props) => {
  // this priority variable should take on the priority property of the sticky board. This can be done through fetching the api.
  // for demonstration purposes, we're mimicking an API resonsee by using "props". The prop is being sent through the Dashboard.js
  // once api endpoints are configured, we will refactor the priority variable to grab the priority property from the API response instead

  let boardName = props.stickyboard.board_name;
  let description = props.stickyboard.description;
  let priorityInt = props.stickyboard.priority;
  let priority = priorityInt.toString();
  let gradient = null;
  let start = new Date(props.stickyboard.start_date).toLocaleDateString();
  let deadline = new Date(props.stickyboard.deadline).toLocaleDateString();
  let stickyCount = [
    ...props.stickyboard.backlog,
    ...props.stickyboard.todo,
    ...props.stickyboard.doing,
    ...props.stickyboard.review,
    ...props.stickyboard.done,
  ].length;
  let members = props.stickyboard.account.length;
  // color switches based on priority
  switch (priority) {
    case "1":
      gradient =
        "bg-gradient-to-tl from-[#B8FFC3] from-20% to-[#EFFFF2] to-80%";
      priority = "Low";
      break;
    case "2":
      gradient =
        "bg-gradient-to-tl from-[#94ECFF] from-20% to-[#F5FDFF] to-80%";
      priority = "Medium";
      break;
    case "3":
      gradient =
        "bg-gradient-to-tl from-[#FFCACA] from-20% to-[#FFECEC] to-80%";
      priority = "High";
      break;
    default:
      gradient = "bg-white";
  }

  return (
    <div
      className={`h-[238px] w-[289px] 1440:h-[calc(238px*1.333)] 1440:w-[calc(289px*1.333)] rounded-[8px] drop-shadow-sticky flex flex-col ${gradient} `}
    >
      <div className=" HEADER h-[20%] flex justify-between items-center p-5 pt-5 1440:py-4">
        <div className="PRIORITY_BOX bg-white h-[22px] w-[86px] flex items-center justify-center drop-shadow-sticky 1440:text-xl 1440:h-[calc(22px*1.3)] 1440:w-[calc(86px*1.3)]">
          <span>{priority}</span>
        </div>
        <div className="MEMBERS_COUNT flex items-center justify-center gap-[.5rem] 1080:text-xs 1440:text-base">
          <div>
            <span className="mr-[2px]">Members:</span>
            <span className="flex-grow font-bold">{members}</span>
          </div>
          <div>|</div>
          <div>
            <span className="mr-[2px]">Stickies:</span>
            <span className="flex-grow font-bold">{stickyCount}</span>
          </div>
        </div>
      </div>
      <div className="BODY h-[80%] mx-5 flex flex-col">
        <span className="inline-block text-xl 1440:text-2xl font-semibold">
          {boardName}
        </span>
        <div className="DATE_ROW flex justify-between text-sm 1440:text-base my-1 1440:my-2">
          <div>
            <span className="mr-2">Start:</span>
            <span>{start}</span>
          </div>
          <div>
            <span className="mr-2">Deadline:</span>
            <span>{deadline}</span>
          </div>
        </div>
        <div className="flex-grow flex flex-col text-sm 1440:text-base overflow-auto px-2 scrollbar-card">
          <p className="">{description}</p>
        </div>
        <div className="BUTTONS flex justify-between py-3 1440:py-4">
          <img alt="Button" src={garbage} className="self-end expand-button" />
          {/* <button className="button-hover-white-filled px-[.7rem] py-[.1rem] bg-white rounded-[19px]">
            <span>Edit Board</span>
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default StickyBoardCard;
