import React, { useContext } from "react";
import { AuthContext } from "@galvanize-inc/jwtdown-for-react";

const StickyNoteDeleteForm = (props) => {
  const { token } = useContext(AuthContext);
  const handleDeletion = (id) => {
    fetch(
      `${process.env.REACT_APP_SCRUMPTIOUS_SERVICE_API_HOST}/sticky/${id}`,
      {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((response) => {
      if (response.ok) {
        props.refreshData();
        props.close();
      }
    });
  };
  return (
    <div className="h-screen w-[100%] bg-white bg-opacity-20 flex items-center justify-center absolute  z-10 backdrop-blur-md ">
      <div className=" flex flex-col items-center justify-center font-semibold text-lg">
        <div className="text-center">
          <span className="text-2xl">Are you sure you want to delete </span>
          <span className="font-bold text-4xl"></span>
        </div>
        <div className="flex">
          <button
            className="button-hover-white-filled-delete bg-white my-6 mx-12 px-[1rem] py-[.1rem] rounded-[19px] text-dark_mode_font self-end drop-shadow-sticky"
            onClick={() => {
              handleDeletion(props.stickyID);
            }}
          >
            Delete
          </button>
          <button className="button-hover-white-filled bg-white my-6 mx-12 px-[1rem] py-[.1rem] rounded-[19px] text-dark_mode_font self-end drop-shadow-sticky">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default StickyNoteDeleteForm;
