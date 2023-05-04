import React, { useState, useEffect, useContext } from "react";
import StickyBoardCard from "../components/StickyBoardCard";
import Search_light from "../images/icons/Search_light.svg";
import garbage from "../images/icons/garbage.svg";
import filter_icon_white from "../images/icons/filter_icon_white.svg";
import { AuthContext } from "@galvanize-inc/jwtdown-for-react";
import StickyBoardCreateForm from "../components/StickyBoardCreateForm";
import StickyBoardUpdateForm from "../components/StickyBoardUpdateForm";
import StickyBoardDeleteForm from "../components/StickyBoardDeleteForm";
import { useNavigate } from "react-router-dom";
import Draggable from "react-draggable";
import expand_icon_dark from "../images/icons/expand_icon_dark.svg";
import Back_light from "../images/icons/Back_light.svg";
import { Tooltip } from "react-tooltip";

const StickyBoardListView = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stickyboards, setStickyboards] = useState([]);
  const [stickyboard, setStickyboard] = useState({});
  const getStickyboardsData = async () => {
    const stickyboardsUrl = `${process.env.REACT_APP_SCRUMPTIOUS_SERVICE_API_HOST}/stickyboard`;
    const stickyboardsResponse = await fetch(stickyboardsUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (stickyboardsResponse.ok) {
      const data = await stickyboardsResponse.json();
      setStickyboards(data);
    }
  };
  useEffect(() => {
    getStickyboardsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const [modalStatus, setModalStatus] = useState(false);
  const [form, setForm] = useState("create");
  const handleOpenModal = (type, stickyboard = null) => {
    if (type === "create") {
      setForm("create");
    } else if (type === "update") {
      setForm("update");
    } else setForm("delete");
    setModalStatus(true);
  };
  const handleCloseModal = () => {
    setForm("create");
    setStickyboard({});
    setModalStatus(false);
  };
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchTermChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
  };
  const [searchPriority, setPriority] = useState("");
  const handleSearchPriorityChange = (event) => {
    const value = event.target.value;
    setPriority(value);
  };
  const filteredStickyboards =
    searchPriority || searchTerm
      ? stickyboards.filter(
          (stickyboard) =>
            (stickyboard.board_name
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
              stickyboard.description
                .toLowerCase()
                .includes(searchTerm.toLowerCase())) &&
            (!searchPriority ||
              stickyboard.priority === parseInt(searchPriority))
        )
      : stickyboards;

  const [resetPosition, setResetPosition] = useState(true);

  const handleResetPosition = () => {
    setResetPosition(false);
    setInterval(() => {
      setResetPosition(true);
    }, 500);
  };

  return (
    <div className=" h-screen overflow-hidden">
      {form === "create" ? (
        <StickyBoardCreateForm
          open={modalStatus}
          close={handleCloseModal}
          getStickyboardsData={getStickyboardsData}
          type="Create"
        />
      ) : form === "delete" ? (
        <StickyBoardDeleteForm
          open={modalStatus}
          close={handleCloseModal}
          getStickyboardsData={getStickyboardsData}
          stickyboard={stickyboard}
          type="Delete"
        />
      ) : (
        <StickyBoardUpdateForm
          open={modalStatus}
          close={handleCloseModal}
          getStickyboardsData={getStickyboardsData}
          stickyboard={stickyboard}
          setStickyboard={setStickyboard}
          type="Update"
        />
      )}
      <div className="w-[100%] h-[5.37500rem] bg-white drop-shadow-md bg-gradient-to-r from-white from-20% to-blue-100 via-blue-100 via-70%  flex items-center">
        <div className="text-3xl ml-6 self-end">
          <span>Sticky Boards</span>
        </div>

        <div className=" flex gap-5 self-end ml-auto mr-[3rem] 1440:mr-[calc(3rem*1.333)] 1440:text-xl">
          <div className="flex gap-2 items-center">
            <img
              src={filter_icon_white}
              alt="filter"
              className="w-[1rem] h-[1rem]"
            />

            <label htmlFor="priority" className="text-black">
              Filter Priority:
            </label>
          </div>
          <div id="priority" className="text-black flex self-center gap-2">
            <input
              type="radio"
              id="none"
              name="priority"
              value=""
              defaultChecked
              onChange={handleSearchPriorityChange}
            />
            <label htmlFor="none">None</label>
            <input
              type="radio"
              id="high"
              name="priority"
              value="3"
              onChange={handleSearchPriorityChange}
            />
            <label htmlFor="high">High</label>
            <input
              type="radio"
              id="medium"
              name="priority"
              value="2"
              onChange={handleSearchPriorityChange}
            />
            <label htmlFor="medium">Medium</label>
            <input
              type="radio"
              id="low"
              name="priority"
              value="1"
              onChange={handleSearchPriorityChange}
            />
            <label htmlFor="low">Low</label>
          </div>
        </div>
      </div>
      <div className="px-20 1080:pt-[2rem] flex flex-col 1080:gap-[2rem] 1440:pt-20 1440:gap-20 overflow-hidden h-[100%] ">
        <div className="flex gap-10 items-center justify-center ">
          <div className="flex items-center bg-white rounded-[100px] w-[70%] h-[4.75rem] px-10 text-2xl drop-shadow-md">
            <input
              type="text"
              placeholder="Search Sticky Boards By Name or Description"
              className="focus:outline-none w-[100%]"
              onChange={handleSearchTermChange}
              value={searchTerm}
            />
            <img
              src={Search_light}
              alt="Search"
              className="h-[2rem] w-[2rem]"
            />
          </div>
          <button
            className="text-black border-solid border-slate-400 hover:border-slate-950 border-[1px] transition-all duration-200 ease-in-out rounded-[19px] w-[8rem] h-[2rem] text-lg"
            onClick={() => {
              handleOpenModal("create");
            }}
          >
            + New Board
          </button>
          <button
            className="text-black border-solid border-slate-400 hover:border-slate-950 border-[1px] transition-all duration-200 ease-in-out rounded-[19px] w-[11rem] h-[2rem] text-lg"
            onClick={handleResetPosition}
          >
            Reset Positions
          </button>
        </div>
        {resetPosition && (
          <div className="bound flex-grow overflow-auto scrollbar-card hover:scrollbar-thumb-slate-950 scrollbar-thumb-slate-400 scrollbar-w-2 h-[100%] pt-2 max-h-[calc(100vh-12.75rem)] 1440:max-h-[calc(100vh-18.75rem)]">
            <div className="place-items-center grid grid-cols-4 gap-y-10 last:mb-10">
              {filteredStickyboards !== null &&
                filteredStickyboards.map((stickyboard) => {
                  return (
                    <Draggable key={stickyboard.id}>
                      <div className="transition-all duration-[50ms] ease-linear hover:scale-105">
                        <div
                          className="relative  hover:cursor-pointer active:cursor-grabbing"
                          onDoubleClick={() =>
                            navigate(`/dashboard/${stickyboard.id}`)
                          }
                        >
                          <StickyBoardCard
                            stickyboard={stickyboard}
                            getStickyboardsData={getStickyboardsData}
                          />
                          <div className="BUTTONS flex flex-col justify-between py-3">
                            <img
                              alt="garbage"
                              src={garbage}
                              className="expand-button absolute bottom-9 1440:bottom-10 left-5"
                              onClick={() => {
                                // handleDeletion(stickyboard.id);
                                handleOpenModal("delete", stickyboard);
                                setStickyboard(stickyboard);
                              }}
                              data-tooltip-id="delete"
                            />
                            <button
                              className="expand-button px-[.7rem] py-[.1rem]  absolute 1440:bottom-10 bottom-[2.25rem] right-[3rem]"
                              onClick={() =>
                                navigate(`/dashboard/${stickyboard.id}`)
                              }
                              data-tooltip-id="visit"
                            >
                              <img
                                src={Back_light}
                                alt="back_light"
                                className="h-[1.6rem] w-[1.4rem]"
                              />
                            </button>
                            <button
                              className="expand-button px-[.7rem] py-[.1rem]  absolute 1440:bottom-10 bottom-9 right-2"
                              onClick={() => {
                                handleOpenModal("update", stickyboard);
                                setStickyboard(stickyboard);
                              }}
                              data-tooltip-id="update"
                            >
                              <img alt="expand" src={expand_icon_dark} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </Draggable>
                  );
                })}
            </div>
          </div>
        )}
      </div>
      <Tooltip id="update" place="bottom" content="Update Sticky Board" />
      <Tooltip
        id="visit"
        place="bottom"
        content="Visit Sticky Board (ALT. Double Click Board)"
      />
      <Tooltip id="delete" place="bottom" content="Delete Sticky Board" />
    </div>
  );
};

export default StickyBoardListView;
