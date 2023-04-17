import React from "react";
import StickyBoardCard from "../components/StickyBoardCard";
import Search_light from "../images/icons/Search_light.svg";

import filter_icon_white from "../images/icons/filter_icon_white.svg";

const DashboardStickyBoards = () => {
  return (
    <div className="px-20 pt-20 flex flex-col gap-10 h-screen">
      <div className="flex gap-10 items-center">
        <div className="flex items-center justify-between bg-white rounded-[100px] w-[25rem] h-[4.75rem] px-10 text-2xl ">
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
        <div className=" flex gap-5 justify-end">
          <div className="flex gap-2 items-center">
            <img src={filter_icon_white} alt="" className="w-[1rem] h-[1rem]" />

            <label htmlFor="priority" className="text-dark_mode_text_white">
              Filter Priority:
            </label>
          </div>
          <div
            id="priority"
            className="text-dark_mode_text_white flex self-center gap-2"
          >
            <input type="radio" id="high" name="priority" value="high" />
            <label htmlFor="high">High</label>
            <input type="radio" id="medium" name="priority" value="medium" />
            <label htmlFor="medium">Medium</label>
            <input type="radio" id="low" name="priority" value="low" />
            <label htmlFor="low">Low</label>
          </div>
        </div>
      </div>
      <div className="flex-grow overflow-auto scrollbar-card hover:scrollbar-thumb-white scrollbar-w-2 scrollbar-thumb-slate-200">
        <div className="place-items-center grid grid-cols-4 gap-y-10 last:mb-10">
          {/* Everything below is for example purposes. Map function would go below here  */}
          <StickyBoardCard
            priority="High"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pulvinar elementum integer enim neque volutpat ac. Tincidunt nunc pulvinar sapien et. Ultricies mi quis hendrerit dolor magna eget. Etiam dignissim diam quis enim. Viverra ipsum nunc aliquet bibendum enim"
          ></StickyBoardCard>
          <StickyBoardCard
            priority="High"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pulvinar elementum integer enim neque volutpat ac. Tincidunt nunc pulvinar sapien et. Ultricies mi quis hendrerit dolor magna eget. Etiam dignissim diam quis enim. Viverra ipsum nunc aliquet bibendum enim"
          ></StickyBoardCard>
          <StickyBoardCard
            priority="High"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pulvinar elementum integer enim neque volutpat ac. Tincidunt nunc pulvinar sapien et. Ultricies mi quis hendrerit dolor magna eget. Etiam dignissim diam quis enim. Viverra ipsum nunc aliquet bibendum enim"
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
            priority="High"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pulvinar elementum integer enim neque volutpat ac. Tincidunt nunc pulvinar sapien et. Ultricies mi quis hendrerit dolor magna eget. Etiam dignissim diam quis enim. Viverra ipsum nunc aliquet bibendum enim"
          ></StickyBoardCard>
          <StickyBoardCard
            priority="High"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pulvinar elementum integer enim neque volutpat ac. Tincidunt nunc pulvinar sapien et. Ultricies mi quis hendrerit dolor magna eget. Etiam dignissim diam quis enim. Viverra ipsum nunc aliquet bibendum enim"
          ></StickyBoardCard>
          <StickyBoardCard
            priority="High"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pulvinar elementum integer enim neque volutpat ac. Tincidunt nunc pulvinar sapien et. Ultricies mi quis hendrerit dolor magna eget. Etiam dignissim diam quis enim. Viverra ipsum nunc aliquet bibendum enim"
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
          {/* Everything above is for example purposes. Map function would go above here */}
        </div>
      </div>
    </div>
  );
};

export default DashboardStickyBoards;
