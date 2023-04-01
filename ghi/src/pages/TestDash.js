import React from "react";
import StickyBoardCard from "../components/StickyBoardCard";
import StickyNote from "../components/StickyNote";

const TestDash = () => {
  return (
    <div>
      {" "}
      {/* Display testing */}
      <div className="flex m-4 gap-4">
        <StickyBoardCard
          priority="High"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pulvinar elementum integer enim neque volutpat ac. Tincidunt nunc pulvinar sapien et. Ultricies mi quis hendrerit dolor magna eget. Etiam dignissim diam quis enim. Viverra ipsum nunc aliquet bibendum enim"
        ></StickyBoardCard>
        <StickyBoardCard
          priority="Medium"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut"
        ></StickyBoardCard>
        <StickyBoardCard
          priority="Low"
          content="Lorem ipsum dolor sit amet,"
        ></StickyBoardCard>
      </div>
      <div className="flex m-4 gap-4">
        <StickyNote
          category="Backlog"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pulvinar elementum integer enim neque volutpat ac. Tincidunt nunc pulvinar sapien et. Ultricies mi quis hendrerit dolor magna eget. Etiam dignissim diam quis enim. Viverra ipsum nunc aliquet bibendum enim"
        ></StickyNote>
        <StickyNote
          category="Todo"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut"
        ></StickyNote>
        <StickyNote category="Doing"></StickyNote>
        <StickyNote category="Review"></StickyNote>
        <StickyNote category="Done"></StickyNote>
      </div>
      {/* Display testing ends */}
    </div>
  );
};

export default TestDash;
