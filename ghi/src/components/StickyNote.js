import React from "react";
import expand_icon from "../images/icons/expand_icon.svg";

// need to figure out easier widths and heights

const StickyNote = () => {
  return (
    <div className="relative">
      <div className="STICKY w-[15.7275rem] h-[16.53625rem] overflow-hidden drop-shadow-sticky">
        <div className="STICKY_HEADER  h-[22%] bg-sticky_red_header rounded-t-[19px] flex justify-between items-center px-5">
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
        <div className="STICKY_BODY  h-[78%] rounded-b-[19px] bg-sticky_red flex flex-col text-dark_mode_text_white">
          <span className="inline-block m-[1rem] mx-5 text-3xl">Subject</span>
          <div className="flex-grow flex flex-col text-sm overflow-auto mx-5 scrollbar-card">
            <p className="">
              Description TEST TEST TES TEST ETST ETST EST ESTEST EST EST
              Description TEST TEST TES TEST ETST ETST EST ESTEST EST EST
              Description TEST TEST TES TEST ETST ETST EST ESTEST EST EST
              Description TEST TEST TES TEST ETST ETST EST ESTEST EST EST
            </p>
          </div>
          <img src={expand_icon} className="m-[.7rem] self-end expand-button" />
        </div>
      </div>
    </div>
  );
};

export default StickyNote;
