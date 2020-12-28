import React from "react";
import RemoveButton from "../remove-button/remove-button";

const AddAccomplishment = ({
  id,
  logAccomplishment,
  removeAccomplishement,
}) => {
  const handleChangeAccomplishment = (e) => {
    const newAccomplishment = {
      title: e.target.value,
    };
    logAccomplishment(id, newAccomplishment);
  };

  return (
    <div className="d-flex flex-row">
      <input
        type="text"
        className="form-control"
        maxLength="80"
        onChange={handleChangeAccomplishment}
      />
      <RemoveButton removeField={removeAccomplishement} />
    </div>
  );
};

export default AddAccomplishment;
