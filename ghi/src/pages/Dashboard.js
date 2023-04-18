import React from "react";
import DashboardInitial from "./DashboardInitial";
import StickyNote from "../components/StickyNote";
import StickyBoardCard from "../components/StickyBoardCard";
import TestDash from "./TestDash";
import TestingBoardGeneration from "./TestingBoardGeneration";
import StickyBoardInputForm from "../components/StickyBoardInputForm";
import StickyNoteInputForm from "../components/StickyNoteInputForm";
import DashboardStickyBoards from "./DashboardStickyBoards";
import DashboardStickyBoard from "./DashboardStickyBoard";

import StickyBoard from "./StickyBoard";

const Dashboard = () => {
  return (
    <section className="bg-dark_mode_medium h-screen flex-grow relative">
      {/* <StickyNoteInputForm open={true}></StickyNoteInputForm> */}
      <StickyBoard></StickyBoard>
      {/* <DashboardStickyBoard></DashboardStickyBoard> */}
      {/* <DashboardStickyBoards></DashboardStickyBoards> */}
      {/* <TestingBoardGeneration></TestingBoardGeneration> */}
      {/* <StickyBoardInputForm></StickyBoardInputForm> */}
      {/* <TestDash></TestDash> */}
      {/* <DashboardInitial></DashboardInitial> */}
    </section>
  );
};

export default Dashboard;
