import React from "react";
import user_icon from "../images/icons/user_icon.svg";
import boards from "../images/icons/boards.svg";
import book from "../images/icons/book.svg";
import calendar from "../images/icons/calendar.svg";
import sticky from "../images/icons/Sticky.svg";
import chart from "../images/icons/chart.svg";
import user_group from "../images/icons/user_group.svg";
import { NavLink } from 'react-router-dom';

const sidebar = () => {
  return (
    <nav className="flex flex-col w-[14.75rem] h-screen bg-dark_mode_dark flex-none">
      <section className="LOGO-SECTION flex h-[12%] border-b-solid border-b-[1px] border-b-dark_mode_text_white">
        <span className="Scrumptious m-[2.5%] text-dark_mode_text_white font-Sudo_Var">
          SCRUMPTIOUS
        </span>
      </section>

      {/* Need to replace anchor tags with link tags when we have react router ready */}
      <section className="BTN_SECTION flex h-[48%] border-b-solid border-b-[1px] border-b-dark_mode_text_white text-dark_mode_text_white">
        <div className="w-[100%] flex flex-col gap-3">
          <a href="#" className="nav-button mt-[10%]">
            <img src={sticky} alt="" />
            <span href="#" className="self-center">
              Home
            </span>
          </a>
          <a href="#" className="nav-button">
            <img src={user_group} alt="" />
            <span href="#" className="self-center">
              Members
            </span>
          </a>
          <a href="#" className="nav-button">
            <img src={boards} alt="" />
            <span href="#" className="self-center">
              Sticky Boards
            </span>
          </a>
          <a href="#" className="nav-button">
            <img src={book} alt="" />
            <span href="#" className="self-center">
              Logs
            </span>
          </a>
          <a href="#" className="nav-button">
            <img src={calendar} alt="" />
            <span href="#" className="self-center">
              Timeline
            </span>
          </a>
          <a href="#" className="nav-button">
            <img src={chart} alt="" />
            <span href="#" className="self-center">
              Analytics
            </span>
          </a>
        </div>
      </section>
      {/* This section below needs to be configured to use custom components */}
      <section className="USER_SECTION flex-grow flex flex-col">
        <section className="CHAT_SECTION m-[10%] flex-grow  text-dark_mode_text_white">
          Chat
        </section>

        <section className="USER_SECTION flex gap-5 m-[5%] mb-[6%] text-dark_mode_text_white">
          <img src={user_icon} className="h-10 w-auto" />
          <span className="self-center">First Last</span>
        </section>
      </section>
    </nav>
  );
};

export default sidebar;
