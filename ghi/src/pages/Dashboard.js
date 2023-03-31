import React from "react";
import DashboardInitial from "./DashboardInitial";
import StickyNote from "../components/StickyNote";
import StickyBoardCard from "../components/StickyBoardCard";
import TestDash from "./TestDash";

const Dashboard = () => {
  return (
    <section className="flex-grow bg-dark_mode_medium">
      <TestDash></TestDash>
      <DashboardInitial></DashboardInitial>
    </section>
  );
};

export default Dashboard;
