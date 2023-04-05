import React from "react";
import StickyBoardInputForm from "./StickyBoardInputForm";

const StickyBoardForm = () => {
  return (
    <div className="h-screen w-[100%] flex items-center justify-center absolute z-10">
      <StickyBoardInputForm></StickyBoardInputForm>
    </div>
  );
};

export default StickyBoardForm;
