import React, { useEffect, useState } from "react";
import StickyNote from "../components/StickyNote";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import add_icon from "../images/icons/add_icon.svg";
import _ from "lodash";
import filter_icon_white from "../images/icons/filter_icon_white.svg";
import expand_icon from "../images/icons/expand_icon.svg";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";
import StickyNoteCreateForm from "../components/StickyNoteCreateForm";
import StickyNoteUpdateForm from "../components/StickyNoteUpdateForm";
import { Tooltip } from "react-tooltip";

// Drag and Drop logic:
// Get stickyboard
// Get all categories from the stickyboard (should be 5 list all with sticky note details)
// Use the fetched data to update our "mock frontend database" that also has 5 category lists stored inside a dictionary
// Upon dragging a stickynote to a new category, clone stickynote details and update the clone's category field to the destination category name.
// Use cloned sticky to send to frontend database and backend by method of PUT to the appropriate end point. This should not technically trigger a rerender on the position of the stickies
// Next reload, the fetch to the stickyboard categories data will reflect the previous drag and drops.

const StickyBoard = (props) => {
  const { token } = useToken();
  let { stickyboard_id } = useParams();
  const [category, setCategory] = useState("");
  const [append, setAppend] = useState(false);

  // Used to determine where "+ Add Sticky" will be placed within the category column
  const [addStickyStyle, setAddStickyStyle] = useState("");

  // Used to store the information of the current stickyboard
  const [stickyboard, setStickyboard] = useState({});

  // Used to store the sticky details of each sticky note in category arrays after "fetchCategoryStickyData" is called
  const [categoriesLists, setCategoriesLists] = useState({
    backlog: [],
    todo: [],
    doing: [],
    review: [],
    done: [],
  });

  // Used to mimic the backened shape of the stickyboard's categories list, except this data stores the details of each sticky note rather than their ID
  // This is used for rendering and updating the UI for drag and drop.
  const [state, setState] = useState({
    backlog: {
      title: "Backlog",
      stickies: ["empty"],
    },
    todo: { title: "Todo", stickies: ["empty"] },
    doing: { title: "Doing", stickies: ["empty"] },
    review: { title: "Review", stickies: ["empty"] },
    done: { title: "Done", stickies: ["empty"] },
  });

  //  modalStatus determines wheater we mount a form modal on the DOM. form will determine which one to mount (create or update)
  const [modalStatus, setModalStatus] = useState(false);
  const [form, setForm] = useState("create");

  // Used to store information about individual sticky notes. This data is used to pass into the update form and also used during the filtering of priorites
  const [sticky, setSticky] = useState("");

  // get details of the current stickyboard
  const fetchBoard = async () => {
    const url = `${process.env.REACT_APP_SCRUMPTIOUS_SERVICE_API_HOST}/stickyboard/${stickyboard_id}`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok) {
      const data = await response.json();
      setStickyboard(data);
    }
  };

  // fetch each category list of the current stickyboard. Each list contains details of each individual stickynote
  const fetchCategoryStickyData = async () => {
    const url = `${process.env.REACT_APP_SCRUMPTIOUS_SERVICE_API_HOST}/${stickyboard_id}/stickies`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok) {
      const data = await response.json();
      setCategoriesLists(data);
    }
  };
  const refreshData = () => {
    fetchBoard();
    fetchCategoryStickyData();
  };

  // trigger fetch functions upon initial render
  useEffect(() => {
    fetchBoard();
    fetchCategoryStickyData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // upon loading a new stickyboard  from the dropdown title menu, trigger a rerender to grab that board's data
  const location = useLocation();
  useEffect(() => {
    refreshData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  // Filling in the categories of the state variable, our "mock frontend database", with the actuall data from categories list
  const updateLists = () => {
    setState((prev) => {
      prev = { ...prev };
      prev["backlog"].stickies = categoriesLists["backlog"];
      prev["todo"].stickies = categoriesLists["todo"];
      prev["doing"].stickies = categoriesLists["doing"];
      prev["review"].stickies = categoriesLists["review"];
      prev["done"].stickies = categoriesLists["done"];
      return prev;
    });
  };

  // When new data is fetched/stored in the backend, reload the" mock frontend database with the updated data"
  useEffect(() => {
    updateLists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoriesLists]);

  // modal opening logic
  const handleOpenModal = (type, sticky) => {
    if (type === "create") {
      setForm("create");
    } else {
      setForm("update");
      setSticky(sticky);
    }
    setModalStatus(true);
  };

  //modal closing logic
  const handleCloseModal = () => {
    setForm("create");
    setCategory("");
    setAppend(false);
    setModalStatus(false);
  };

  // Triggering the visibility of the "+ Add Sticky"
  const handleAddSticky = () => {
    setAddStickyStyle("hidden");
  };

  // The function for handling all logic between the time a sticky is being dragged to being dropped
  const handleDrag = async ({ destination, source }) => {
    // Handling case if sticky start and end location are the same
    if (!destination) {
      console.log("test09");
      return;
    }
    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      return;
    }

    // Handling case if sticky is dropped into the new location
    console.log("drop:", destination, source);
    // Making a copy of the current sticky note and updating its category field to reflect its new category
    const itemCopy = { ...state[source.droppableId].stickies[source.index] };
    switch (destination.droppableId) {
      case "backlog":
        itemCopy.category = "backlog";
        break;
      case "todo":
        itemCopy.category = "todo";
        break;
      case "doing":
        itemCopy.category = "doing";
        break;
      case "review":
        itemCopy.category = "review";
        break;
      case "done":
        itemCopy.category = "done";
        break;
      default:
        break;
    }
    console.log("itemcopy:", itemCopy);
    setState((prev) => {
      prev = { ...prev };
      prev[source.droppableId].stickies.splice(source.index, 1);
      prev[destination.droppableId].stickies.splice(
        destination.index,
        0,
        itemCopy
      );
      setAddStickyStyle("");
      return prev;
    });

    // PUT function to handle updating the category of the sticky note that was dropped into the new location
    const updateStickyCategoryDND = async (id, category) => {
      let done = "doing";
      console.log(category, done, stickyboard_id);
      let body = {
        category: category,
        stickyboard: `${stickyboard_id}`,
      };
      const url = `${process.env.REACT_APP_SCRUMPTIOUS_SERVICE_API_HOST}/sticky/${id}`;
      const response = await fetch(url, {
        method: "put",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (response.ok) {
        console.log("success update, now updating stickyBoard");
      }
    };
    updateStickyCategoryDND(itemCopy.id, destination.droppableId);
  };

  const [searchPriority, setPriority] = useState("");
  const handleSearchPriorityChange = (event) => {
    const value = event.target.value;
    setPriority(value);
  };
  const [stickyboards, setStickyboards] = useState([]);
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
  const navigate = useNavigate();
  const handleStickyboardChange = (event) => {
    const value = event.target.value;
    stickyboard_id = value;
    navigate(`/dashboard/${stickyboard_id}`);
    refreshData();
  };
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {form === "create" ? (
        category.length > 0 && (
          <StickyNoteCreateForm
            open={modalStatus}
            close={handleCloseModal}
            type={"Create"}
            stickyboard_id={stickyboard_id}
            refreshData={refreshData}
            category={category}
            append={append}
          ></StickyNoteCreateForm>
        )
      ) : (
        <StickyNoteUpdateForm
          open={modalStatus}
          close={handleCloseModal}
          refreshData={refreshData}
          stickyData={sticky}
        ></StickyNoteUpdateForm>
      )}
      <div className="flex flex-col text-black">
        <div className="w-[100%] h-[5.37500rem] bg-white drop-shadow-md bg-gradient-to-r from-white from-20% to-blue-100 via-blue-100 via-70%  flex items-center">
          <select
            onChange={handleStickyboardChange}
            defaultValue={stickyboard.id}
            className="bg-transparent focus:outline-none transition-all duration-150 hover:cursor-pointer text-3xl ml-6 self-end"
          >
            <option
              value={stickyboard.id}
              key={stickyboard.id}
              className="text-xl bg-white"
            >
              {stickyboard.board_name}
            </option>
            {stickyboards
              .filter(
                (filterStickyboard) => filterStickyboard.id !== stickyboard.id
              )
              .map((filteredStickyboard) => (
                <option
                  value={filteredStickyboard.id}
                  key={filteredStickyboard.id}
                  className="text-xl bg-white"
                >
                  {filteredStickyboard.board_name}
                </option>
              ))}
          </select>
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
        <div className="lg:h-[1rem] w-[90%] ml-[7.5%]">
          <DragDropContext
            onDragEnd={handleDrag}
            onBeforeDragStart={handleAddSticky}
            className=""
          >
            <div className="grid grid-cols-5">
              {_.map(state, (data, key) => {
                return (
                  <div key={key} className="flex flex-col">
                    <div className="w-[16.0rem] 1440:w-[calc(16rem*1.333)] flex items-center justify-between my-3">
                      <span className=" text-[2rem]">{data.title}</span>
                      <img
                        alt="add"
                        src={add_icon}
                        className="h-[42px] w-auto hover:cursor-pointer transition-all expand-button ml-auto"
                        onClick={() => {
                          handleOpenModal("create");
                          setCategory(key);
                        }}
                        data-tooltip-id="append-top"
                      />
                    </div>
                    <Droppable droppableId={key}>
                      {(provided, snapshot) => {
                        return (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="h-[100%] overflow-auto overflow-x-hidden scrollbar-card scrollbar-thumb-slate-400 scrollbar-w-1 max-h-[calc(100vh-12.75rem)] pr-5 place-self-start" // Add overflow-y-auto here
                            style={{
                              backgroundColor: snapshot.isDraggingOver
                                ? "#00000015"
                                : "",
                            }}
                          >
                            {data.stickies
                              .filter(
                                (sticky) =>
                                  searchPriority === "" ||
                                  sticky.priority === parseInt(searchPriority)
                              )
                              .map((el, index) => {
                                return (
                                  <Draggable
                                    key={el.id}
                                    index={index}
                                    draggableId={el.id}
                                    className=""
                                  >
                                    {(provided) => {
                                      return (
                                        <div
                                          key={index}
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          className="mb-5 relative"
                                        >
                                          <StickyNote
                                            category={el.category}
                                            priority={el.priority}
                                            content={el.content}
                                            subject={el.subject}
                                            start={el.start_date}
                                            deadline={el.deadline}
                                          ></StickyNote>
                                          <img
                                            alt="expand"
                                            src={expand_icon}
                                            className="absolute bottom-3 right-3 self-end expand-button"
                                            onClick={() => {
                                              handleOpenModal("update", el);
                                              setCategory(key);
                                            }}
                                            data-tooltip-id="update"
                                          />
                                          {index ===
                                            data.stickies.length - 1 && (
                                            <div
                                              className={`flex items-center pl-4 mb-10 ${addStickyStyle}`}
                                              onClick={() => {
                                                handleOpenModal("create");
                                                setCategory(key);
                                                setAppend(true);
                                              }}
                                            >
                                              <div
                                                className="flex absolute -bottom-6 1440:-bottom-7 items-center hover:cursor-pointer transition-colors duration-200 text-slate-500 hover:text-black"
                                                data-tooltip-id="append-bottom"
                                              >
                                                <div className="h-[1rem] 1440:h-[1.2rem] pr-2 text-current ">
                                                  <svg
                                                    className="h-full stroke-current"
                                                    viewBox="0 0 42 42"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                  >
                                                    <path
                                                      d="M21 10.5L21 31.5"
                                                      strokeWidth="2"
                                                      strokeLinecap="round"
                                                    />
                                                    <path
                                                      d="M31.5 21L10.5 21"
                                                      strokeWidth="2"
                                                      strokeLinecap="round"
                                                    />
                                                  </svg>
                                                </div>
                                                <span className="text-base 1440:text-lg">
                                                  Add Sticky
                                                </span>
                                              </div>
                                            </div>
                                          )}
                                          {provided.placeholder}
                                        </div>
                                      );
                                    }}
                                  </Draggable>
                                );
                              })}
                            {provided.placeholder}
                          </div>
                        );
                      }}
                    </Droppable>
                  </div>
                );
              })}
            </div>
          </DragDropContext>
        </div>
      </div>
      <Tooltip id="update" place="bottom" content="Update Sticky Note" />
      <Tooltip
        id="append-top"
        palce="right"
        content="Add new Sticky to the top"
      />
      <Tooltip
        id="append-bottom"
        palce="top"
        content="Add new Sticky to the bottom"
      />
    </div>
  );
};

export default StickyBoard;
