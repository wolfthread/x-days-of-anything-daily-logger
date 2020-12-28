import React from "react";
import Logo from "../../img/timer-24px.svg";

const TimerButtonStart = ({ startTimer }) => {
  return (
    <button className="btn btn-success" onClick={startTimer}>
      <img src={Logo} alt="logo"></img>
    </button>
  );
};

export default TimerButtonStart;
