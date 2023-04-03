import React from "react";
import DashboardInitial from "./DashboardInitial";
import StickyNote from "../components/StickyNote";
import StickyBoardCard from "../components/StickyBoardCard";
import TestDash from "./TestDash";
import TestingBoardGeneration from "./TestingBoardGeneration";

const Dashboard = () => {
  return (
    <section className="flex-grow bg-dark_mode_medium">
      <TestingBoardGeneration></TestingBoardGeneration>
      {/* <TestDash></TestDash> */}
      <DashboardInitial></DashboardInitial>
    </section>
  );
};

export default Dashboard;
