import React from "react";

const StickyBoardCard = () => {
  return (
    <div className="h-[238px] w-[289px] bg-[#E7E7E7] rounded-[8px] drop-shadow-sticky">
      <div className="HEADER flex justify-between p-5">
        <div className="PRIORITY_BOX bg-white h-[22px] w-[86px] flex items-center justify-center drop-shadow-sticky">
          <span>Priority</span>
        </div>
        <div className="MEMBERS_COUNT">Members:</div>
      </div>
      <div className="BODY mx-5">
        <span>Sticky Board Name</span>
        <div className="DATE_ROW flex justify-between">
          <div>
            <span>Start:</span>
            <span>DATE</span>
          </div>
          <div>
            <span>Deadline:</span>
            <span>DATE</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyBoardCard;
