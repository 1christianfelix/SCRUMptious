import React from "react";
import DashboardInitial from "./DashboardInitial";
import StickyNote from "../components/StickyNote";
import StickyBoardCard from "../components/StickyBoardCard";

const Dashboard = () => {
  return (
    <section className="flex-grow bg-dark_mode_medium">
      <div className="flex m-4 gap-4">
        <StickyBoardCard priority="High"></StickyBoardCard>
        <StickyBoardCard priority="Medium"></StickyBoardCard>
        <StickyBoardCard priority="Low"></StickyBoardCard>
      </div>
      <div className="flex m-4 gap-4">
        <StickyNote category="Backlog"></StickyNote>
        <StickyNote category="Todo"></StickyNote>
        <StickyNote category="Doing"></StickyNote>
        <StickyNote category="Review"></StickyNote>
        <StickyNote category="Done"></StickyNote>
      </div>
      <DashboardInitial></DashboardInitial>
    </section>
  );
};

export default Dashboard;
