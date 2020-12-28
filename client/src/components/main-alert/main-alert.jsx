import React from "react";

const MainAlert = ({ alertType, msg, show }) => {
  if (!show) {
    return null;
  }
  return (
    <div className={`alert alert-dismissible alert-${alertType}`}>
      <h5>{msg}</h5>
    </div>
  );
};

export default MainAlert;
