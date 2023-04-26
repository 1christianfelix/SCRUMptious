import React, { useState, useEffect, useContext } from "react";
import StickyBoardCard from "../components/StickyBoardCard";
import Search_light from "../images/icons/Search_light.svg";
import garbage from "../images/icons/garbage.svg";

import filter_icon_white from "../images/icons/filter_icon_white.svg";
import { AuthContext } from "@galvanize-inc/jwtdown-for-react";
import StickyBoardCreateForm from "../components/StickyBoardCreateForm";
import StickyBoardUpdateForm from "../components/StickyBoardUpdateForm";
import { useNavigate } from "react-router-dom";

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
  }, [token]);

  const handleDeletion = (id) => {
    fetch(
      `${process.env.REACT_APP_SCRUMPTIOUS_SERVICE_API_HOST}/stickyboard/${id}/`,
      {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((response) => {
      if (response.ok) {
        getStickyboardsData();
      }
    });
  };

  const [modalStatus, setModalStatus] = useState(false);
  const [form, setForm] = useState("create");
  const handleOpenModal = (type, stickyboard = null) => {
    if (type === "create") {
      setForm("create");
    } else {
      setForm("update");
    }
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

  return (
    <div className=" h-screen overflow-hidden">
      {form === "create" ? (
        <StickyBoardCreateForm
          open={modalStatus}
          close={handleCloseModal}
          getStickyboardsData={getStickyboardsData}
          type="Create"
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
      <div className="px-20 pt-20 flex flex-col gap-10 overflow-hidden h-[100%]">
        <div className="flex gap-10 items-center">
          <div className="flex items-center justify-between bg-white rounded-[100px] w-[25rem] h-[4.75rem] px-10 text-2xl">
            <input
              type="text"
              placeholder="Search Sticky Boards"
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
            className="text-white border-solid border-button rounded-[19px] w-[16rem] h-[4rem] button-hover-white-outline"
            onClick={() => {
              handleOpenModal("create");
            }}
          >
            Start a Sticky Board
          </button>
          <div className=" flex gap-5 justify-end">
            <div className="flex gap-2 items-center">
              <img
                src={filter_icon_white}
                alt=""
                className="w-[1rem] h-[1rem]"
              />

              <label htmlFor="priority" className="text-dark_mode_text_white">
                Filter Priority:
              </label>
            </div>
            <div
              id="priority"
              className="text-dark_mode_text_white flex self-center gap-2"
            >
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
        <div className="flex-grow overflow-auto scrollbar-card hover:scrollbar-thumb-slate-300 scrollbar-thumb-white scrollbar-w-2">
          <div className="place-items-center grid grid-cols-4 gap-y-10 last:mb-10">
            {filteredStickyboards !== null &&
              filteredStickyboards.map((stickyboard) => {
                return (
                  <div
                    className="relative"
                    key={stickyboard.id}
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
                        className="expand-button absolute bottom-9 left-5"
                        onClick={() => {
                          handleDeletion(stickyboard.id);
                        }}
                      />
                      <button
                        className="button-hover-white-filled px-[.7rem] py-[.1rem] bg-white rounded-[19px] absolute 1440:bottom-10 bottom-9 right-5"
                        onClick={() => {
                          handleOpenModal("update", stickyboard);
                          setStickyboard(stickyboard);
                        }}
                      >
                        <span>Edit Board</span>
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyBoardListView;
