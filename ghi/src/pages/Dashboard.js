import React from "react";
import DashboardInitial from "./DashboardInitial";
import StickyNote from "../components/StickyNote";
import StickyBoardCard from "../components/StickyBoardCard";
import TestDash from "./TestDash";
import TestingBoardGeneration from "./TestingBoardGeneration";
import StickyBoardInputForm from "../components/StickyBoardInputForm";
import StickyBoardForm from "../components/StickyBoardForm";

const Dashboard = () => {
  return (
    <section className="bg-dark_mode_medium h-screen flex-grow relative">
      {/* <TestingBoardGeneration></TestingBoardGeneration> */}
      <StickyBoardInputForm></StickyBoardInputForm>
      {/* <TestDash></TestDash> */}
      {/* <DashboardInitial></DashboardInitial> */}
    </section>
  );
};

export default Dashboard;
