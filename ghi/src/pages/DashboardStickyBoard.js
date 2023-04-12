import React, { useState } from "react";
import StickyNote from "../components/StickyNote";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import add_icon from "../images/icons/add_icon.svg";
import _ from "lodash";
import StickyNoteInputForm from "../components/StickyNoteInputForm";
import filter_icon_white from "../images/icons/filter_icon_white.svg";
import expand_icon from "../images/icons/expand_icon.svg";

// Testing functions to simulate sticky content
function generateRandomNumber() {
  return Math.floor(Math.random() * 101);
}

function generateRandomPriority() {
  const priorities = [3, 2, 1];
  const randomIndex = Math.floor(Math.random() * priorities.length);
  return priorities[randomIndex];
}

function generateRandomLoremIpsumSentence() {
  const loremIpsumWords = [
    "Lorem",
    "ipsum",
    "dolor",
    "sit",
    "amet",
    "consectetur",
    "adipiscing",
    "elit",
    "sed",
    "do",
    "eiusmod",
    "tempor",
    "incididunt",
    "ut",
    "labore",
    "et",
    "dolore",
    "magna",
    "aliqua",
    "Ut",
    "enim",
    "ad",
    "minim",
    "veniam",
    "quis",
    "nostrud",
    "exercitation",
    "ullamco",
    "laboris",
    "nisi",
    "ut",
    "aliquip",
    "ex",
    "ea",
    "commodo",
    "consequat",
    "Duis",
    "aute",
    "irure",
    "dolor",
    "in",
    "reprehenderit",
  ];
  const maxWords = 40;
  let sentence = "";
  const numberOfWords = Math.floor(Math.random() * maxWords) + 1;
  for (let i = 0; i < numberOfWords; i++) {
    const randomIndex = Math.floor(Math.random() * loremIpsumWords.length);
    const word = loremIpsumWords[randomIndex];
    sentence += word + " ";
  }
  return sentence.trim() + ".";
}

// Mimic arrays for each status category
function generateRandomStickyArray(categoryName) {
  const stickyArray = [];
  const numberOfStickies = Math.floor(Math.random() * 3) + 1;
  for (let i = 0; i < numberOfStickies; i++) {
    const sticky = {
      id: Math.random().toString(),
      subject: `Test Sticky ${generateRandomNumber()}`,
      priority: generateRandomPriority(),
      content: generateRandomLoremIpsumSentence(),
      category: categoryName,
    };
    stickyArray.push(sticky);
  }
  return stickyArray;
}

const DashboardStickyBoard = () => {
  const [addStickyVisible, setAddStickyVisible] = useState(true);
  const [addStickyStyle, setAddStickyStyle] = useState("");
  const [state, setState] = useState({
    backlog: {
      title: "Backlog",
      stickies: generateRandomStickyArray("Backlog"),
    },
    todo: { title: "Todo", stickies: generateRandomStickyArray("Todo") },
    doing: { title: "Doing", stickies: generateRandomStickyArray("Doing") },
    review: { title: "Review", stickies: generateRandomStickyArray("Review") },
    done: { title: "Done", stickies: generateRandomStickyArray("Done") },
  });
  const [modalStatus, setModalStatus] = useState(false);

  const handleOpenModal = () => {
    setModalStatus(true);
  };

  const handleCloseModal = () => {
    setModalStatus(false);
  };

  const handleAddSticky = () => {
    setAddStickyVisible(false);
    setAddStickyStyle("hidden");
  };

  const handleDrag = ({ destination, source }) => {
    console.log("source", source);
    if (!destination) {
      console.log("test09");
      return;
    }
    if (
      destination.index === source.index &&
      destination.droppableId === source.ddroppableId
    ) {
      console.log("test");
      return;
    }

    const itemCopy = { ...state[source.droppableId].stickies[source.index] };
    switch (destination.droppableId) {
      case "backlog":
        console.log("in 1");
        itemCopy.category = "Backlog";
        break;
      case "todo":
        console.log("in 2");
        itemCopy.category = "Todo";
        break;
      case "doing":
        console.log("in 3");
        itemCopy.category = "Doing";
        break;
      case "review":
        console.log("in 4");
        itemCopy.category = "Review";
        break;
      case "done":
        console.log("in 5");
        itemCopy.category = "Done";
        break;
      default:
        break;
    }
    console.log(itemCopy);
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
  };

  const addFirst = (category) => {
    // Creation form should pop up first
    // After submitting form, we fetch the data base for the new array
    // *stretch goal: addFirst should call an endpoint that will place sticky at index 0
    // fetch new data
    // use data
    setState((prev) => {
      const sticky = {
        id: Math.random().toString(),
        subject: `Test Sticky ${generateRandomNumber()}`,
        priority: generateRandomPriority(),
        content: generateRandomLoremIpsumSentence(),
        category: category,
      };
      // Grabbing the previous data from the arrays
      prev = { ...prev };
      console.log(prev, category);
      prev[category.toLowerCase()].stickies.unshift(sticky);
      // console.log("add first");

      return prev;
    });
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <StickyNoteInputForm
        open={modalStatus}
        close={handleCloseModal}
        type={"Create"}
      ></StickyNoteInputForm>
      <div className="flex flex-col text-dark_mode_text_white">
        <div className="w-[100%] h-[8.37500rem] bg-dark_mode_light flex items-center">
          <select className="bg-transparent focus:outline-none transition-all duration-150 hover:cursor-pointer text-3xl ml-6">
            <option value="" className="text-xl bg-slate-500">
              Sticky Board Name Goes Here
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
            onDragEnd={handleDrag}
            onBeforeDragStart={handleAddSticky}
            className=""
          >
            <div className="grid grid-cols-5">
              {_.map(state, (data, key) => {
                return (
                  <div key={key} className="flex flex-col">
                    <div className="w-[15.7275rem] 1440:w-[calc(15.7275rem*1.333)] flex items-center justify-between my-3">
                      <span className=" text-[2rem]">{data.title}</span>
                      <img
                        src={add_icon}
                        className="h-[42px] w-auto hover:cursor-pointer transition-all expand-button"
                        // onClick={() => addFirst(data.title)}
                        onClick={handleOpenModal}
                      />
                    </div>
                    <Droppable droppableId={key}>
                      {(provided, snapshot) => {
                        return (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="h-[100%] overflow-auto overflow-x-hidden scrollbar-card scrollbar-thumb-white scrollbar-w-1 max-h-[calc(100vh-12.75rem)] pr-5 place-self-start" // Add overflow-y-auto here
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
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className="mb-5 relative"
                                      >
                                        <StickyNote
                                          category={el.category}
                                          priority={el.priority.toString()}
                                          content={el.content}
                                          subject={el.subject}
                                        ></StickyNote>
                                        <img
                                          src={expand_icon}
                                          className="absolute bottom-3 right-3 self-end expand-button"
                                          // This on click needs to trigger an update form instead of a create form
                                          onClick={handleOpenModal}
                                        />
                                        {index === data.stickies.length - 1 && (
                                          <div
                                            className={`flex items-center pl-4 mb-10 ${addStickyStyle}`}
                                            onClick={handleOpenModal}
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
  );
};

export default DashboardStickyBoard;
