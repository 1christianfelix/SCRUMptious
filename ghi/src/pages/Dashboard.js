import React from "react";
import DashboardInitial from "./DashboardInitial";
import StickyNote from "../components/StickyNote";
import StickyBoardCard from "../components/StickyBoardCard";

const Dashboard = () => {
  return (
    <section className="flex-grow bg-dark_mode_medium">
      <StickyBoardCard></StickyBoardCard>
      {/* <StickyNote></StickyNote> */}
      <DashboardInitial></DashboardInitial>
    </section>
  );
};

export default Dashboard;
