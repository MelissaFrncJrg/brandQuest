import React, { useState, useEffect } from "react";
import Timer from "../src/components/Timer";
import Modal from "../src/components/Modal";

import "../src/styles/App.css";

const audio = new Audio("/clock-ticking.mp3");

function App() {
  const [timeLeft, setTimeLeft] = useState(45 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [penalty, setPenalty] = useState(0);
  const [stars, setStars] = useState(0);
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => Math.max(prevTime - 1, 0));
      }, 1000);
    }

    if (timeLeft === 5 * 60 && activeModal === null) {
      setActiveModal("warning");
      audio.play().catch((err) => console.error("Audio error:", err));
    }

    if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      setActiveModal("gameOver");
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft, activeModal]);

  const calculateStars = () => {
    if (timeLeft >= 20 * 60) return 5;
    if (timeLeft >= 15 * 60) return 4;
    if (timeLeft >= 10 * 60) return 3;
    if (timeLeft >= 5 * 60) return 2;
    return 1;
  };

  const handleStartTimer = () => {
    audio.play().then(() => audio.pause());
    setIsRunning(true);
  };

  const handlePauseTimer = () => {
    setIsRunning(false);
  };

  const handleClueReveal = (penalty) => {
    setTimeLeft((prevTime) => Math.max(prevTime - penalty, 0));
    setActiveModal(null);
  };

  const handleReveal = (penalty) => {
    setPenalty(penalty);
    setActiveModal("clue");
  };

  const handleEndGame = () => {
    setIsRunning(false);
    setStars(calculateStars());
    setActiveModal("end");
  };

  return (
    <div className="container text-center">
      <div className="title-container">
        <h1 className="app-title">Brand Quest</h1>
      </div>
      <Timer
        timeLeft={timeLeft}
        isRunning={isRunning}
        onStart={handleStartTimer}
        onPause={handlePauseTimer}
      />
      <div className="app-options">
        <button className="btn actions" onClick={() => handleReveal(60)}>
          Clue revealed
        </button>
        <button className="btn actions" onClick={() => handleReveal(120)}>
          Answer revealed
        </button>{" "}
      </div>
      <div className="app-finish">
        <button className="btn actions" onClick={handleEndGame}>
          We finished the game !!
        </button>
      </div>

      {activeModal === "clue" && (
        <Modal
          title="Clue revealed !"
          content={`This action will give you penalty of ${
            penalty / 60
          } minutes. Continue?`}
          onConfirm={() => handleClueReveal(penalty)}
          onCancel={() => setActiveModal(null)}
          confirmText="Confirm"
          cancelText="Cancel"
        />
      )}

      {activeModal === "end" && (
        <Modal
          title="Congratulations !"
          content={
            <>
              <p>
                Your score:{" "}
                {Array.from({ length: stars }).map((_, index) => (
                  <span key={index} role="img" aria-label="star">
                    ⭐
                  </span>
                ))}
              </p>
              <p>
                We hope you enjoyed the experience. Thank you for choosing our
                game
              </p>
            </>
          }
          onConfirm={() => setActiveModal(null)}
          confirmText="Close"
          cancelText=""
        />
      )}

      {activeModal === "warning" && (
        <Modal
          title="Warning !"
          content="Only five minutes left !"
          onConfirm={() => setActiveModal(null)}
          confirmText="OK"
        />
      )}

      {activeModal === "gameOver" && (
        <Modal
          title="Game Over !"
          content={
            <>
              Time is up, your client left... We hope you still enjoyed the
              experience.
            </>
          }
          onConfirm={() => setActiveModal(null)}
          confirmText="Close"
        />
      )}
    </div>
  );
}

export default App;
