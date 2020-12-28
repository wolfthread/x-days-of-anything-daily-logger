import React from "react";
import Logo from "../../img/timer_off-24px.svg";

const TimerButtonStop = ({ stopTimer }) => {
  return (
    <button className="btn btn-danger" onClick={stopTimer}>
      <img src={Logo} alt="logo"></img>
    </button>
  );
};

export default TimerButtonStop;
