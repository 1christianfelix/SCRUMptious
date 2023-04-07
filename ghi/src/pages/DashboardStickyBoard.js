import React, { useState } from "react";
import StickyNote from "../components/StickyNote";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import _ from "lodash";

const item = {
  id: "1",
  name: "Test Sticky 1",
};
const item2 = {
  id: "2",
  name: "Test Sticky 2",
};
const item3 = {
  id: "3",
  name: "Test Sticky 3",
};

const DashboardStickyBoard = () => {
  const [state, setState] = useState({
    backlog: { title: "Backlog", stickies: [item] },
    todo: { title: "Todo", stickies: [item2, item3] },
    doing: { title: "Doing", stickies: [] },
    review: { title: "Review", stickies: [] },
    done: { title: "Done", stickies: [] },
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

  return (
    <div className="text-dark_mode_text_white">
      <div>Header</div>
      <DragDropContext onDragEnd={handleDrag}>
        <div className="grid grid-cols-5 ">
          {_.map(state, (data, key) => {
            return (
              <div key={key}>
                <span className="mb-2">{data.title}</span>
                <Droppable droppableId={key}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="bg-slate-500"
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
                                    // {...provided.dragHandleProps}
                                  >
                                    {el.name}
                                    <span {...provided.dragHandleProps}>
                                      Test
                                    </span>
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
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
  );
};

export default DashboardStickyBoard;
