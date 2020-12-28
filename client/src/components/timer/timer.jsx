import React from "react";
import TimerButtonStart from "../timer-button-start/timer-button-start";
import TimerButtonStop from "../timer-button-stop/timer-button-stop";
import TimerButtonReset from "../timer-button-reset/timer-button-reset";
import MainAlert from "../main-alert/main-alert";

const Timer = ({
  alertStatusTimer,
  toggleAlertTimer,
  errMsgTimer,
  startTimer,
  stopTimer,
  resetTimer,
  getTimer,
}) => {
  return (
    <div className="card text-white bg-secondary mb-3 text-center">
      <div className="card-header">Timer</div>
      <div className="card-body d-flex justify-content-center flex-column">
        <MainAlert
          show={alertStatusTimer}
          close={toggleAlertTimer}
          msg={errMsgTimer}
          alertType={"danger"}
        />
        <h4 className="card-title justify-content-center">Monitor your time</h4>
        <div className="flex-row">
          <TimerButtonStart startTimer={startTimer} />
          <TimerButtonStop stopTimer={stopTimer} />
          <TimerButtonReset resetTimer={resetTimer} />
        </div>
        <div id="timer">
          <span>{getTimer}</span>
        </div>
      </div>
    </div>
  );
};

export default Timer;
