import React, { useState } from "react";
import garbage from "../images/icons/garbage.svg";
import useToken from "@galvanize-inc/jwtdown-for-react";

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

  // const handleDeletion = (id) => {
  //   fetch(`http://localhost:8000/stickyboard/${id}/`, {
  //     method: "delete",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //   }).then((response) => {
  //     if (response.ok) {
  //       props.getStickyboardsData();
  //     }
  //   });
  // };

  // const handleOpenModal = () => {
  //   setModalStatus(true);
  // };

  // const handleCloseModal = () => {
  //   setModalStatus(false);
  // };

  // const handleAddBoard = () => {
  //   setAddBoardVisible(false);
  // };

  return (
    <div
      // style={{
      //   backgroundColor: "#e7e7e7",
      //   backgroundImage: "linear-gradient(132deg, #e7e7e7 20%, #C2FFCC 100%)",
      // }}
      className={`h-[238px] w-[289px] 1440:h-[calc(238px*1.333)] 1440:w-[calc(289px*1.333)] rounded-[8px] drop-shadow-sticky flex flex-col ${gradient}`}
    >
      <div className=" HEADER h-[20%] flex justify-between p-5 pt-3 1440:py-4">
        <div className="PRIORITY_BOX bg-white h-[22px] w-[86px] flex items-center justify-center drop-shadow-sticky">
          <span>{priority}</span>
        </div>
        <div className="MEMBERS_COUNT flex">
          <span className="mr-2">Members:</span>
          <span className="flex-grow">{members}</span>
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
          <button className="button-hover-white-filled px-[.7rem] py-[.1rem] bg-white rounded-[19px]">
            <span>Edit Board</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StickyBoardCard;
