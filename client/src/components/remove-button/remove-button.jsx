import React from "react";

const RemoveButton = ({ removeField }) => {
  return (
    <button type="button" className="btn btn-danger" onClick={removeField}>
      X
    </button>
  );
};

export default RemoveButton;
