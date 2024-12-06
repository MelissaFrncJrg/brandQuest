import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

const Timer = ({ timeLeft, isRunning, onStart, onPause }) => {
  const totalDuration = 45 * 60;
  const percentage = (timeLeft / totalDuration) * 100;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="timer-container">
      <div className="progress-circle">
        <CircularProgressbar
          value={percentage}
          text={
            <tspan x="15" y="60">
              {minutes}:{seconds.toString().padStart(2, "0")}
            </tspan>
          }
          strokeWidth={4}
          styles={buildStyles({
            textColor: "#803d3b",
            pathColor: "#803d3b",
            trailColor: "#d6d6d6",
            strokeLinecap: "round",
            textSize: "2em",
          })}
        />
      </div>
      <div className="timer-buttons">
        {isRunning ? (
          <button className="btn pause" onClick={onPause}>
            Pause
          </button>
        ) : (
          <button className="btn start" onClick={onStart}>
            Start
          </button>
        )}
      </div>
    </div>
  );
};

export default Timer;
