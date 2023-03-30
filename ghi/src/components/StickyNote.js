import React from "react";
import expand_icon from "../images/icons/expand_icon.svg";

// need to figure out easier widths and heights

const StickyNote = () => {
  return (
    <div className="relative">
      <div className="STICKY overflow-hidden drop-shadow-sticky">
        <div className="STICKY_HEADER w-[15.7275rem] h-[3.75625rem] bg-sticky_red_header rounded-t-[19px] flex justify-between items-center p-5">
          <div className="bg-white h-[22px] w-[86px] flex items-center justify-center drop-shadow-sticky">
            <span>Priority</span>
          </div>
          <div className="flex flex-col ">
            <div className="flex justify-between">
              <span className="mr-1">Start:</span>
              <span>DATE</span>
            </div>
            <div>
              <span>Deadline:</span>
              <span>DATE</span>
            </div>
          </div>
        </div>
        <div className="STICKY_BODY w-[15.7275rem] h-[12.785625rem] rounded-b-[19px] bg-sticky_red flex flex-col">
          <span className="inline-block m-[1rem] text-3xl">Subject</span>
          <div className="text-center text-lg w-auto flex-grow overflow-y-scroll">
            {/* Need to figure out how much text is being displayed */}
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, Lorem
              ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum
            </p>
          </div>
          <img src={expand_icon} className="m-[.7rem] self-end expand-button" />
        </div>
      </div>
    </div>
  );
};

export default StickyNote;
