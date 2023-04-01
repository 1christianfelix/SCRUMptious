import React from "react";
import StickyNote from "../components/StickyNote";

const DashboardInitial = () => {
  return (
    <div className="flex flex-col justify-center h-screen items-center gap-4 text-dark_mode_text_white">
      <div>
        <p>There are no Sticky Boards currently active</p>
        <p className="hidden">You are not addigned to any Sticky Boards</p>
      </div>
      <div className="flex gap-5">
        <button className="p-3 border-solid border-button rounded-button button-hover-white-outline">
          <span className="">Start a Sticky Board</span>
        </button>
        {/* Joining a board is Streth Goals */}
        <button className="p-3 border-solid border-button rounded-button button-hover-white-outline">
          Join a Sticky Board
        </button>
      </div>
    </div>
  );
};

export default DashboardInitial;

{
  /* <a href="#_" class="inline-flex items-center justify-center h-16 px-10 py-0 text-xl font-semibold text-center text-gray-200 no-underline align-middle transition-all duration-300 ease-in-out bg-transparent border-2 border-gray-600 border-solid rounded-full cursor-pointer select-none hover:text-white hover:border-white focus:shadow-xs focus:no-underline">
Button Text
</a> */
}
