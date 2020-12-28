import React from "react";
import RemoveButton from "../remove-button/remove-button";

const AddLink = ({ id, logLink, removeLink }) => {
  const handleChangeLink = (e) => {
    const newLink = {
      title: e.target.value,
    };
    logLink(id, newLink);
  };

  return (
    <div className="d-flex flex-row">
      <input
        type="text"
        className="form-control"
        maxLength="200"
        onChange={handleChangeLink}
      />
      <RemoveButton removeField={removeLink} />
    </div>
  );
};

export default AddLink;
