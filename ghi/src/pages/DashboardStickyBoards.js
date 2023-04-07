import React from "react";
import StickyBoardCard from "../components/StickyBoardCard";
import Search_light from "../images/icons/Search_light.svg";

import filter_icon_white from "../images/icons/filter_icon_white.svg";

const DashboardStickyBoards = () => {
  return (
    <div className="p-20 flex flex-col gap-10 bg-blue-300 h-screen">
      <div className="flex items-center justify-center gap-10">
        <div className="flex items-center justify-between bg-white rounded-[100px] w-[49rem] h-[4.75rem] px-10 text-2xl ">
          <input
            type="text"
            placeholder="Search Sticky Boards"
            className="focus:outline-none w-[100%]"
          />
          <img src={Search_light} alt="" className="h-[2rem] w-[2rem]" />
        </div>
        <button className="border-solid border-button rounded-[19px] w-[16rem] h-[4rem] button-hover-white-outline">
          <span className="text-dark_mode_text_white">
            Start a Sticky Board
          </span>
        </button>
      </div>
      <div className="flex-grow bg-slate-400">
        <div className="justify-self-end self-end flex gap-5">
          <div className="flex gap-2 items-center">
            <img src={filter_icon_white} alt="" className="w-[1rem] h-[1rem]" />

            <label for="priority" className="text-dark_mode_text_white">
              Filter Priority:
            </label>
          </div>
          <div id="priority" className="text-dark_mode_text_white flex gap-2">
            <input type="radio" id="high" name="priority" value="high" />
            <label for="high">High</label>
            <input type="radio" id="medium" name="priority" value="medium" />
            <label for="medium">Medium</label>
            <input type="radio" id="low" name="priority" value="low" />
            <label for="low">Low</label>
          </div>
        </div>
        <div className="place-items-center grid grid-cols-4 gap-y-10">
          <StickyBoardCard
            priority="High"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pulvinar elementum integer enim neque volutpat ac. Tincidunt nunc pulvinar sapien et. Ultricies mi quis hendrerit dolor magna eget. Etiam dignissim diam quis enim. Viverra ipsum nunc aliquet bibendum enim"
          ></StickyBoardCard>
          <StickyBoardCard
            priority="Medium"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut"
          ></StickyBoardCard>
          <StickyBoardCard
            priority="Low"
            content="Lorem ipsum dolor sit amet,"
          ></StickyBoardCard>
          <StickyBoardCard
            priority="High"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pulvinar elementum integer enim neque volutpat ac. Tincidunt nunc pulvinar sapien et. Ultricies mi quis hendrerit dolor magna eget. Etiam dignissim diam quis enim. Viverra ipsum nunc aliquet bibendum enim"
          ></StickyBoardCard>
          <StickyBoardCard
            priority="Medium"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut"
          ></StickyBoardCard>
          <StickyBoardCard
            priority="Low"
            content="Lorem ipsum dolor sit amet,"
          ></StickyBoardCard>
          <StickyBoardCard
            priority="High"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pulvinar elementum integer enim neque volutpat ac. Tincidunt nunc pulvinar sapien et. Ultricies mi quis hendrerit dolor magna eget. Etiam dignissim diam quis enim. Viverra ipsum nunc aliquet bibendum enim"
          ></StickyBoardCard>
          <StickyBoardCard
            priority="Medium"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut"
          ></StickyBoardCard>
        </div>
      </div>
    </div>
  );
};

export default DashboardStickyBoards;
