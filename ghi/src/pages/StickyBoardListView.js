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
  if (!token) {
    navigate("/signin");
  }
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
              stickyboard.priority === parseInt(searchPriority)),
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
      <div className="flex h-[5.37500rem] w-[100%] items-center bg-white bg-gradient-to-r from-white from-20% via-blue-100 via-70%  to-blue-100 drop-shadow-md">
        <div className="ml-6 self-end text-3xl">
          <span>Sticky Boards</span>
        </div>

        <div className=" ml-auto mr-[3rem] flex gap-5 self-end 1440:mr-[calc(3rem*1.333)] 1440:text-xl">
          <div className="flex items-center gap-2">
            <img
              src={filter_icon_white}
              alt="filter"
              className="h-[1rem] w-[1rem]"
            />

            <label htmlFor="priority" className="text-black">
              Filter Priority:
            </label>
          </div>
          <div id="priority" className="flex gap-2 self-center text-black">
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
      <div className="flex h-[100%] flex-col overflow-hidden px-20 1080:gap-[2rem] 1080:pt-[2rem] 1440:gap-20 1440:pt-20 ">
        <div className="flex items-center justify-center gap-10 ">
          <div className="flex h-[4.75rem] w-[70%] items-center rounded-[100px] bg-white px-10 text-2xl drop-shadow-md">
            <input
              type="text"
              placeholder="Search Sticky Boards By Name or Description"
              className="w-[100%] focus:outline-none"
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
            className="h-[2rem] w-[8rem] rounded-[19px] border-[1px] border-solid border-slate-400 text-lg text-black transition-all duration-200 ease-in-out hover:border-slate-950"
            onClick={() => {
              handleOpenModal("create");
            }}
          >
            + New Board
          </button>
          <button
            className="h-[2rem] w-[11rem] rounded-[19px] border-[1px] border-solid border-slate-400 text-lg text-black transition-all duration-200 ease-in-out hover:border-slate-950"
            onClick={handleResetPosition}
          >
            Reset Positions
          </button>
        </div>
        {resetPosition && (
          <div className="bound scrollbar-card h-[100%] max-h-[calc(100vh-12.75rem)] flex-grow overflow-auto pt-2 scrollbar-thumb-slate-400 scrollbar-w-2 hover:scrollbar-thumb-slate-950 1440:max-h-[calc(100vh-18.75rem)]">
            <div className="grid grid-cols-4 place-items-center gap-y-10 last:mb-10">
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
                              className="expand-button absolute bottom-9 left-5 1440:bottom-10"
                              onClick={() => {
                                // handleDeletion(stickyboard.id);
                                handleOpenModal("delete", stickyboard);
                                setStickyboard(stickyboard);
                              }}
                              data-tooltip-id="delete"
                            />
                            <button
                              className="expand-button absolute bottom-[2.25rem]  right-[3rem] px-[.7rem] py-[.1rem] 1440:bottom-10"
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
                              className="expand-button absolute bottom-9  right-2 px-[.7rem] py-[.1rem] 1440:bottom-10"
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
