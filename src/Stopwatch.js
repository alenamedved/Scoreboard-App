import React, { useEffect, useState } from "react";

const Stopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [prevTime, setPrevTime] = useState(0);
  const [intervalIdValue, setIntervalIdValue] = useState(0);

  const intervalID = () => {
    setIntervalIdValue(setInterval(() => tick(), 1000));
  };

  const stopTimer = () => {
    clearInterval(intervalIdValue);
  };
  const handleStopwatch = () => {
    setIsRunning(!isRunning);

    if (!isRunning) {
      setPrevTime(Date.now());
    }
  };

  const handleReset = () => {
    setElapsedTime(0);
  };

  useEffect(() => {
    if (isRunning) {
      intervalID();
    } else {
      stopTimer();
    }
  }, [isRunning]);

  const tick = () => {
    if (isRunning === true) {
      const now = Date.now();
      setPrevTime(now);
      setElapsedTime(elapsedTime + (now - prevTime));
    }
  };

  const seconds = Math.floor(elapsedTime / 1000);

  return (
    <div className="stopwatch">
      <h2>Stopwatch</h2>
      <span className="stopwatch-time">{seconds}</span>
      <button onClick={handleStopwatch}>{isRunning ? "Stop" : "Start"}</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default Stopwatch;
