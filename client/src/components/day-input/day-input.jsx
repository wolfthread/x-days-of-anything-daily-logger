import React from "react";

const DayInput = ({ handleChange, changeDay }) => {
  handleChange = (e) => {
    changeDay(e.target.value);
  };

  return (
    <div>
      <label className="col-form-label">Day #:</label>
      <input
        type="number"
        min="0"
        className="form-control"
        onChange={handleChange}
      />
    </div>
  );
};

export default DayInput;
