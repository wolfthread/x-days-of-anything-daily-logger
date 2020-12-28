import React from "react";

const AddButton = ({ addAccomplishment }) => {
  return (
    <button
      type="button"
      className="btn btn-secondary"
      onClick={addAccomplishment}
    >
      Add
    </button>
  );
};

export default AddButton;
