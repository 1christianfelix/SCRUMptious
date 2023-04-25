import React from "react";

const StickyNoteUpdateForm = (props) => {
  console.log(props);
  if (!props.open) {
    return null;
  }
  return (
    <div
      onClick={() => {
        props.close();
      }}
    >
      StickyNoteUpdateForm
    </div>
  );
};

export default StickyNoteUpdateForm;
