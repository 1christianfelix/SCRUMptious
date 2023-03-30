import React from "react";

const StickyBoardCard = () => {
  return (
    <div className="h-[238px] w-[289px] bg-[#E7E7E7] rounded-[8px] drop-shadow-sticky flex flex-col">
      <div className=" HEADER h-[25%] flex justify-between p-5">
        <div className="PRIORITY_BOX bg-white h-[22px] w-[86px] flex items-center justify-center drop-shadow-sticky">
          <span>Priority</span>
        </div>
        <div className="MEMBERS_COUNT">Members:</div>
      </div>
      <div className="BODY h-[75%] mx-5 flex flex-col">
        <span className="inline-block text-xl font-semibold">
          Sticky Board Name
        </span>
        <div className="DATE_ROW flex justify-between">
          <div>
            <span className="mr-2">Start:</span>
            <span>DATE</span>
          </div>
          <div>
            <span>Deadline:</span>
            <span>DATE</span>
          </div>
        </div>
        <div className="flex-grow flex flex-col text-sm overflow-y-scroll px-2">
          <p className="">
            Description TEST TEST TES TEST ETST ETST EST ESTEST EST EST
            Description TEST TEST TES TEST ETST ETST EST ESTEST EST
            ESTDescription TEST TEST TES TEST ETST ETST EST ESTEST EST EST
            Description TEST TEST TES TEST ETST ETST EST ESTEST EST EST
          </p>
        </div>
        <div className="BUTTONS flex justify-between py-3">
          <span>Delete</span>
          <span>Edit</span>
        </div>
      </div>
    </div>
  );
};

export default StickyBoardCard;
