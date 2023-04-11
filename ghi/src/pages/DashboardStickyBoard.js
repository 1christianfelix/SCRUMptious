import React, { useState } from "react";
import StickyNote from "../components/StickyNote";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import add_icon from "../images/icons/add_icon.svg";
import _ from "lodash";

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

      return prev;
    });
  };

  const addFirst = (category) => {
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
      prev[category.toLowerCas()].stickies.unshift(sticky);
      // console.log("add first");
      return prev;
    });
  };

  return (
    <div className="text-dark_mode_text_white flex flex-col h-screen overflow-hidden">
      <div className="w-[100%] h-[8.37500rem] bg-dark_mode_light">Header</div>

      <div className="lg:h-[1rem] w-[90%] mx-auto">
        <DragDropContext onDragEnd={handleDrag} className="">
          <div className="grid grid-cols-5">
            {_.map(state, (data, key) => {
              return (
                <div key={key} className="flex flex-col">
                  <div className="w-[15.7275rem] flex items-center justify-between">
                    <span className=" text-[2rem]">{data.title}</span>
                    <img
                      src={add_icon}
                      className="h-[42px] w-auto hover:cursor-pointer transition-all expand-button"
                      onClick={() => addFirst(data.title)}
                    />
                  </div>
                  <Droppable droppableId={key}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className="h-[100%] overflow-auto overflow-x-hidden scrollbar-card scrollbar-thumb-white scrollbar-w-1 max-h-[calc(100vh-8.37500rem)] pr-5 place-self-start" // Add overflow-y-auto here
                        >
                          {data.stickies.map((el, index) => {
                            return (
                              <Draggable
                                key={el.id}
                                index={index}
                                draggableId={el.id}
                              >
                                {(provided) => {
                                  return (
                                    // Side note: You will have to move the expand button outside of the StickyNote component and attach it here. Or make a clickable element on top of it
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className="mb-5"
                                    >
                                      <StickyNote
                                        category={el.category}
                                        priority={el.priority.toString()}
                                        content={el.content}
                                        subject={el.subject}
                                      ></StickyNote>
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
  );
};

export default DashboardStickyBoard;
