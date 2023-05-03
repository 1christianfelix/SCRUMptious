import React from "react";
import Informational from "./Informational";
import Notes from "../images/Notes.jpg";
import Boards from "../images/Boards.jpg";
import Demo from "../images/UI-demo.gif";
import bg from "../images/InfoBackground.png";

const InfoSection = () => {
  return (
    <div
      className="bg-cover relative"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="container mx-auto px-20 mt-20">
        <Informational
          imageSrc={Boards}
          imageSrc2={Notes}
          heading="Sticky Boards and Notes"
          description="Easily manage your projects and tasks with our intuitive sticky boards and notes. Create sticky boards for your personal teams and ambitious projects. Add sticky notes to keep track of your tasks and goals."
          imageOnLeft={true}
          skew={true}
        />
        <Informational
          imageSrc={Demo}
          heading="Interactive and Dynamic User Experience"
          description="Our sleek interface adapts to your workflow, making it easy for you to find what you need and stay focused on what matters most. Find what you need through filters. Drag notes to categories, or update them manually. Many ways to feel in control. "
          imageOnLeft={false}
        />
      </div>
    </div>
  );
};

export default InfoSection;
