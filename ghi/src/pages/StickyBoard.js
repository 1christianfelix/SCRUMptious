import React, { useEffect, useState } from "react";
import StickyNote from "../components/StickyNote";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import add_icon from "../images/icons/add_icon.svg";
import _ from "lodash";
import filter_icon_white from "../images/icons/filter_icon_white.svg";
import expand_icon from "../images/icons/expand_icon.svg";
import { useParams } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";
import StickyNoteCreateForm from "../components/StickyNoteCreateForm";
import StickyNoteUpdateForm from "../components/StickyNoteUpdateForm";

const StickyBoard = (props) => {
  const { token } = useToken();
  const { stickyboard_id } = useParams();
  const [category, setCategory] = useState("");
  const [append, setAppend] = useState(false);
  const [addStickyStyle, setAddStickyStyle] = useState("");
  const [stickyboard, setStickyboard] = useState({});
  const [categoriesLists, setCategoriesLists] = useState({
    backlog: [],
    todo: [],
    doing: [],
    review: [],
    done: [],
  });
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
  const [modalStatus, setModalStatus] = useState(false);
  const [form, setForm] = useState("create");
  const [sticky, setSticky] = useState("");

  // Get Boards
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
  useEffect(() => {
    fetchBoard();
    fetchCategoryStickyData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // // Deal with stickies
  // // Grab Sticky ID's and store into sticky ID object states
  // // Use IDs to grab sticky fields and store into sticky field object states

  const updateLists = () => {
    setState((prev) => {
      prev = { ...prev };
      prev["backlog"].stickies = categoriesLists["backlog"];
      prev["todo"].stickies = categoriesLists["todo"];
      prev["doing"].stickies = categoriesLists["doing"];
      prev["review"].stickies = categoriesLists["review"];
      prev["done"].stickies = categoriesLists["done"];
      // console.log("prev", prev);

      return prev;
    });
  };

  useEffect(() => {
    updateLists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoriesLists]);

  const handleOpenModal = (type, sticky) => {
    if (type === "create") {
      setForm("create");
    } else {
      setForm("update");
      setSticky(sticky);
    }
    setModalStatus(true);
  };

  const handleCloseModal = () => {
    setForm("create");
    setCategory("");
    setAppend(false);
    setModalStatus(false);
  };

  const handleAddSticky = () => {
    setAddStickyStyle("hidden");
  };

  const handleDrag = async ({ destination, source }) => {
    // console.log("source", source);
    if (!destination) {
      console.log("test09");
      return;
    }
    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      // console.log("test");
      return;
    }
    console.log("drop:", destination, source);

    const itemCopy = { ...state[source.droppableId].stickies[source.index] };
    switch (destination.droppableId) {
      case "backlog":
        console.log("in 1");
        itemCopy.category = "backlog";
        break;
      case "todo":
        console.log("in 2");
        itemCopy.category = "todo";
        break;
      case "doing":
        console.log("in 3");
        itemCopy.category = "doing";
        break;
      case "review":
        console.log("in 4");
        itemCopy.category = "review";
        break;
      case "done":
        console.log("in 5");
        itemCopy.category = "done";
        break;
      default:
        break;
    }
    console.log("itemcopy:", itemCopy);
    // rearrange the categories' stickies in the frontend database
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

    // update the Sticky's category
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

    // rearrange the categories' IDs in the frontend database

    // update the the stickyboard backend's categories' shape

    updateStickyCategoryDND(itemCopy.id, destination.droppableId);
  };

  const onDragUpdate = (update) => {
    if (update.destination) {
      console.log("Destination:", update.destination.droppableId);
    }

    console.log("Source:", update.source.droppableId);
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
      <div className="flex flex-col text-dark_mode_text_white">
        <div className="w-[100%] h-[8.37500rem] bg-dark_mode_light flex items-center">
          <select className="bg-transparent focus:outline-none transition-all duration-150 hover:cursor-pointer text-3xl ml-6">
            <option value="" className="text-xl bg-slate-500">
              {stickyboard.board_name}
            </option>
            <option value="" className="text-xl bg-slate-500">
              Member's other boards
            </option>
            <option value="" className="text-xl bg-slate-500">
              link to other board
            </option>
          </select>

          <div className=" flex gap-5 self-end ml-auto mr-[3rem] 1440:mr-[calc(3rem*1.333)] 1440:text-xl">
            <div className="flex gap-2 items-center">
              <img
                src={filter_icon_white}
                alt="filter"
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
              <input type="radio" id="high" name="priority" value="high" />
              <label htmlFor="high">High</label>
              <input type="radio" id="medium" name="priority" value="medium" />
              <label htmlFor="medium">Medium</label>
              <input type="radio" id="low" name="priority" value="low" />
              <label htmlFor="low">Low</label>
            </div>
          </div>
        </div>

        <div className="lg:h-[1rem] w-[90%] ml-[7.5%]">
          <DragDropContext
            onDragUpdate={onDragUpdate}
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
                        // onClick={() => addFirst(data.title)}
                        onClick={() => {
                          handleOpenModal("create");
                          setCategory(key);
                        }}
                      />
                    </div>
                    <Droppable droppableId={key}>
                      {(provided, snapshot) => {
                        return (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="h-[100%] overflow-auto overflow-x-hidden scrollbar-card scrollbar-thumb-white scrollbar-w-1 max-h-[calc(100vh-12.75rem)] pr-5 place-self-start" // Add overflow-y-auto here
                            style={{
                              backgroundColor: snapshot.isDraggingOver
                                ? "#FFFFFF10"
                                : "",
                            }}
                          >
                            {data.stickies.map((el, index) => {
                              return (
                                <Draggable
                                  key={el.id}
                                  index={index}
                                  draggableId={el.id}
                                  className=""
                                >
                                  {(provided) => {
                                    return (
                                      // Side note: You will have to move the expand button outside of the StickyNote component and attach it here. Or make a clickable element on top of it
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
                                          // This on click needs to trigger an update form instead of a create form
                                          onClick={() => {
                                            handleOpenModal("update", el);
                                            setCategory(key);
                                          }}
                                        />
                                        {index === data.stickies.length - 1 && (
                                          <div
                                            className={`flex items-center pl-4 mb-10 ${addStickyStyle}`}
                                            onClick={() => {
                                              handleOpenModal("create");
                                              setCategory(key);
                                              setAppend(true);
                                            }}
                                          >
                                            <div className="flex absolute -bottom-6 1440:-bottom-7 items-center hover:cursor-pointer transition-colors duration-200 text-slate-500 hover:text-white">
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
    </div>
    // <div>
    //   {state.backlog.stickies.map(() => {
    //     return <div>Hi</div>;
    //   })}
    // </div>
  );
};

export default StickyBoard;
