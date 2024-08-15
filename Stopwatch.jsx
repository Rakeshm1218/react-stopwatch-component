import React, { useEffect, useState, useRef } from "react";
import './stopwatch.css'

const Stopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervelIdRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if(isRunning){
        intervelIdRef.current = setInterval(() => {
            setElapsedTime(Date.now() - startTimeRef.current)
        },10)
    }
    return () => {
        clearInterval(intervelIdRef.current)
    }
  }, [isRunning]);

  const start = () => {
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
    // console.log(startTimeRef.current);
  };

  const stop = () => {
    setIsRunning(false);
  };

  const reset = () => {
    setElapsedTime(0)
    setIsRunning(false)
  };

  const formatTime = () => {

    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
    let seconds = Math.floor(elapsedTime / (1000) % 60);
    let milliseconds = Math.floor((elapsedTime % 1000) / 10)

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
  };

  return (
    <div className="stopwatch-container">
      <div className="stopwatch">
        <div className="display">{formatTime()}</div>
        <div className="controls">
          <button className="btn start" onClick={start}>
            Start
          </button>
          <button className="btn stop" onClick={stop}>
            Stop
          </button>
          <button className="btn reset" onClick={reset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Stopwatch;
