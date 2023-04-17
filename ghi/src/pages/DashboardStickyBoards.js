import React, { useState } from "react";
import StickyBoardCard from "../components/StickyBoardCard";
import Search_light from "../images/icons/Search_light.svg";
import StickyBoardInputForm from "../components/StickyBoardInputForm";
import garbage from "../images/icons/garbage.svg";

import filter_icon_white from "../images/icons/filter_icon_white.svg";

let board = {
  priority: "",
  members: (3).toString(),
  content:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pulvinar elementum integer enim neque volutpat ac. Tincidunt nunc pulvinar sapien et. Ultricies mi quis hendrerit dolor magna eget. Etiam dignissim diam quis enim. Viverra ipsum nunc aliquet bibendum enim",
};

const boardsGenerate = () => {
  let arr = [];
  for (let i = 0; i < 11; i++) {
    board["priority"] = Math.random() < 0.33 ? 1 : Math.random() < 0.67 ? 2 : 3;
    arr.push(board);
  }
  return arr;
};

let boards = boardsGenerate();

const DashboardStickyBoards = () => {
  const [boardVisible, setAddBoardVisible] = useState(true);
  const [modalStatus, setModalStatus] = useState(false);
  const handleOpenModal = () => {
    setModalStatus(true);
  };

  const handleCloseModal = () => {
    setModalStatus(false);
  };

  const handleAddBoard = () => {
    setAddBoardVisible(false);
  };

  return (
    <div className=" h-screen overflow-hidden">
      <StickyBoardInputForm
        open={modalStatus}
        close={handleCloseModal}
        type="Update"
      />
      <div className="px-20 pt-20 flex flex-col gap-10 overflow-hidden h-[100%]">
        <div className="flex gap-10 items-center">
          <div className="flex items-center justify-between bg-white rounded-[100px] w-[25rem] h-[4.75rem] px-10 text-2xl">
            <input
              type="text"
              placeholder="Search Sticky Boards"
              className="focus:outline-none w-[100%]"
            />
            <img src={Search_light} alt="" className="h-[2rem] w-[2rem]" />
          </div>
          <button
            className="text-white border-solid border-button rounded-[19px] w-[16rem] h-[4rem] button-hover-white-outline"
            onClick={handleOpenModal}
          >
            Start a Sticky Board
          </button>
          <div className=" flex gap-5 justify-end">
            <div className="flex gap-2 items-center">
              <img
                src={filter_icon_white}
                alt=""
                className="w-[1rem] h-[1rem]"
              />

              <label for="priority" className="text-dark_mode_text_white">
                Filter Priority:
              </label>
            </div>
            <div
              id="priority"
              className="text-dark_mode_text_white flex self-center gap-2"
            >
              <input type="radio" id="high" name="priority" value="high" />
              <label for="high">High</label>
              <input type="radio" id="medium" name="priority" value="medium" />
              <label for="medium">Medium</label>
              <input type="radio" id="low" name="priority" value="low" />
              <label for="low">Low</label>
            </div>
          </div>
        </div>
        <div className="flex-grow overflow-auto scrollbar-card hover:scrollbar-thumb-slate-300 scrollbar-thumb-white scrollbar-w-2">
          <div className="place-items-center grid grid-cols-4 gap-y-10 last:mb-10">
            {boards.map((board, index) => {
              return (
                <div className="relative">
                  <StickyBoardCard
                    priority={board.priority.toString()}
                    content={board.content}
                    members={board.members}
                    name={"Board Name prop"}
                  />
                  <div className="BUTTONS flex flex-col justify-between py-3">
                    <img
                      src={garbage}
                      className="expand-button absolute bottom-9 left-5"
                    />
                    <button
                      className="button-hover-white-filled px-[.7rem] py-[.1rem] bg-white rounded-[19px] absolute bottom-9 right-5"
                      onClick={handleOpenModal}
                    >
                      <span>Edit Board</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStickyBoards;
