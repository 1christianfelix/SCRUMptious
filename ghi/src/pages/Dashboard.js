import React from "react";
import DashboardInitial from "./DashboardInitial";
import StickyNote from "../components/StickyNote";
import StickyBoardCard from "../components/StickyBoardCard";
import TestDash from "./TestDash";
import TestingBoardGeneration from "./TestingBoardGeneration";
import StickyBoardInputForm from "../components/StickyBoardInputForm";
import StickyNoteInputForm from "../components/StickyNoteInputForm";
import DashboardStickyBoard from "./DashboardStickyBoard";
import DashboardStickyBoardList from "./DashboardStickyBoardList";

const Dashboard = () => {
  return (
    <section className="bg-dark_mode_medium h-screen flex-grow relative">
      <DashboardStickyBoardList></DashboardStickyBoardList>
      {/* <DashboardStickyBoard></DashboardStickyBoard> */}
      {/* <TestingBoardGeneration></TestingBoardGeneration> */}
      {/* <StickyBoardInputForm></StickyBoardInputForm> */}
      {/* <StickyNoteInputForm></StickyNoteInputForm> */}
      {/* <TestDash></TestDash> */}
      {/* <DashboardInitial></DashboardInitial> */}
    </section>
  );
};

export default Dashboard;
