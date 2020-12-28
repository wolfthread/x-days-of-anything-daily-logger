import React from "react";
import Logo from "../../img/cached-24px.svg";

const TimerButtonReset = ({ resetTimer }) => {
  return (
    <button className="btn btn-warning" onClick={resetTimer}>
      <img src={Logo} alt="logo"></img>
    </button>
  );
};

export default TimerButtonReset;
