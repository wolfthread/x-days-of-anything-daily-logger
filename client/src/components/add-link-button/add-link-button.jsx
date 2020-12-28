import React from "react";

const AddLinkButton = ({ addLink }) => {
  return (
    <button type="button" className="btn btn-secondary" onClick={addLink}>
      Add
    </button>
  );
};

export default AddLinkButton;
