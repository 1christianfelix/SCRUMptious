import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const BigCalendar = () => {
  const [events, setEvents] = useState([
    // Initial events
  ]);

  const handleSelect = ({ start, end }) => {
    const title = window.prompt("New Event name");
    if (title) {
      const newEvent = {
        start,
        end,
        title,
      };
      setEvents((prevState) => [...prevState, newEvent]);
    }
  };

  const handleDelete = (eventToDelete) => {
    setEvents((prevState) =>
      prevState.filter((event) => event !== eventToDelete)
    );
  };

  return (
    <div className="mx-auto max-w-7xl">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable={true}
        onSelectEvent={(event) => {
          if (window.confirm("Do you want to delete this event?")) {
            handleDelete(event);
          }
        }}
        onSelectSlot={handleSelect}
        style={{ height: "70vh", margin: "2rem", borderRadius: "1rem" }}
        className="bg-gray-100 p-4 rounded-md shadow-md"
        eventPropGetter={() => ({
          style: {
            backgroundColor: "#3182ce",
            color: "#fff",
            borderRadius: "0.5rem",
            border: "none",
          },
        })}
        components={{
          toolbar: CustomToolbar,
        }}
      />
    </div>
  );
};

const CustomToolbar = (toolbar) => {
  const goToBack = () => {
    toolbar.date.setMonth(toolbar.date.getMonth() - 1);
    toolbar.onNavigate("prev");
  };

  const goToNext = () => {
    toolbar.date.setMonth(toolbar.date.getMonth() + 1);
    toolbar.onNavigate("next");
  };

  const goToCurrent = () => {
    toolbar.onNavigate("today");
  };

  const label = () => {
    const date = moment(toolbar.date);
    return (
      <span>
        <strong>{date.format("MMMM")}</strong>&nbsp;
        <span>{date.format("YYYY")}</span>
      </span>
    );
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <button className="mr-2" onClick={goToBack}>
          &lt;
        </button>
        <button className="mr-2" onClick={goToNext}>
          &gt;
        </button>
        <button onClick={goToCurrent}>Today</button>
      </div>
      <div className="text-lg font-semibold">{label()}</div>
      <div></div>
    </div>
  );
};

export default BigCalendar;
