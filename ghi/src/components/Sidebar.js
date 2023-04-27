import React from "react";
import user_icon from "../images/icons/user_icon.svg";
import boards from "../images/icons/boards.svg";
import book from "../images/icons/book.svg";
import calendar from "../images/icons/calendar.svg";
import sticky from "../images/icons/Sticky.svg";
import chart from "../images/icons/chart.svg";
import user_group from "../images/icons/user_group.svg";
import signout_icon from "../images/icons/signout_icon.svg";
import { useNavigate } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { Tooltip } from "react-tooltip";

const Sidebar = (props) => {
  const { logout } = useToken();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    props.closeAcc();
    logout();
    navigate("/signin");
  };

  const handleCloseModals = () => {
    props.closeAcc();
  };

  return (
    <nav
      className="flex flex-col w-[6.5rem] h-screen bg-[#3a3a3a]"
      onClick={handleCloseModals}
    >
      <section className="LOGO-SECTION bg-white bg-gradient-to-l from-white to-[#FAFFBB] flex h-[5.37500rem] drop-shadow-md">
        <span className="Scrumptious m-[2.5%] text-black font-Sudo_Var">
          SCRUMPTIOUS
        </span>
      </section>

      {/* Need to replace anchor tags with link tags when we have react router ready */}
      <section className="BTN_SECTION flex h-[48%] border-b-solid border-b-[1px] border-b-dark_mode_dark text-dark_mode_text_white">
        <div className="w-[100%] flex flex-col gap-3 items-center first:mt-[25%]">
          <div
            className="nav-button-2 "
            data-tooltip-id="Stickyboards"
            onClick={() => {
              navigate("/dashboard");
              props.closeAcc();
            }}
          >
            <img src={boards} alt="" />
          </div>
          <div
            className="nav-button-2 "
            data-tooltip-id="Users"
            onClick={(e) => {
              e.stopPropagation();
              props.openAcc();
            }}
          >
            <img src={user_group} alt="" />
          </div>
          <div className="nav-button-2 " data-tooltip-id="AssignedStickies">
            <img src={sticky} alt="" />
          </div>
          <div className="nav-button-2 " data-tooltip-id="Logs">
            <img src={book} alt="" />
          </div>
          <div className="nav-button-2 " data-tooltip-id="Timeframe">
            <img src={calendar} alt="" />
          </div>
          <div className="nav-button-2 " data-tooltip-id="Analytics">
            <img src={chart} alt="" />
          </div>
        </div>
      </section>
      {/* This section below needs to be configured to use custom components */}
      <section className="USER_SECTION flex-grow flex flex-col justify-between items-center gap-3">
        <div className="text-white">
          <span>Chat</span>
        </div>
        <section className="flex flex-col gap-3 w-[100%] items-center">
          <div
            className="nav-button-2 mb-[6%] text-dark_mode_text_white"
            data-tooltip-id="Account"
          >
            <img alt="user" src={user_icon} className="h-10 w-auto" />
          </div>
          <div
            className="nav-button-2 Sign-out mb-[25%]"
            onClick={handleLogout}
            data-tooltip-id="Logout"
          >
            <img
              alt="signout_icon"
              src={signout_icon}
              className=" h-10 w-auto"
            />
          </div>
        </section>
      </section>
      <Tooltip
        id="Stickyboards"
        place="right"
        content="Sticky Boards"
        style={{
          zIndex: "100",
        }}
      />
      <Tooltip
        id="Users"
        place="right"
        content="Users"
        style={{
          zIndex: "100",
        }}
      />
      <Tooltip
        id="AssignedStickies"
        place="right"
        content="Assigned Stickes [Soon]"
        style={{
          zIndex: "100",
        }}
      />
      <Tooltip
        id="Logs"
        place="right"
        content="Logs/History [Soon]"
        style={{
          zIndex: "100",
        }}
      />
      <Tooltip
        id="Timeframe"
        place="right"
        content="Timeframe [Soon]"
        style={{
          zIndex: "100",
        }}
      />
      <Tooltip
        id="Analytics"
        place="right"
        content="Analytics [Soon]"
        style={{
          zIndex: "100",
        }}
      />
      <Tooltip
        id="Account"
        place="right"
        content="Account [Soon]"
        style={{
          zIndex: "100",
        }}
      />
      <Tooltip
        id="Logout"
        place="right"
        content="Logout"
        style={{
          zIndex: "100",
        }}
      />
    </nav>
  );
};

export default Sidebar;
