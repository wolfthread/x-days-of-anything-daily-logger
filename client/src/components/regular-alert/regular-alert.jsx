import React from "react";

const RegularAlert = ({ show, msg, toggleRegularAlert }) => {
  if (!show) {
    return null;
  }
  const alertStyle = {
    width: "100px",
    textAlign: "center",
  };
  return (
    <div className="alert alert-primary" style={alertStyle}>
      {msg}
      {toggleRegularAlert}
    </div>
  );
};

export default RegularAlert;
