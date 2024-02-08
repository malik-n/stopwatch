import { useEffect, useRef, useState } from "react";

export const Stopwatch = () => {
  const [stopwatch, setStopwatch] = useState(0);
  const [isStopwatchStarted, setIsStopwatchStarted] = useState(false);
  const [isStopwatchReset, setIsStopwatchReset] = useState(false);
  const [isStartStop, setIsStartStop] = useState(true);
  const stopwatchInterval = useRef();

  const startStopwatch = () => {
    stopwatchInterval.current = setInterval(() => {
      setStopwatch((prevState) => prevState + 1);
    }, 1000);
  };

  useEffect(() => {
    console.log("stopwatch", stopwatch);
  }, [stopwatch]);

  const handleAddition = () => {
    setStopwatch(stopwatch + 5);
  };

  const handleSubtraction = () => {
    if (stopwatch <= 5) {
      return;
    }
    setStopwatch(stopwatch - 5);
  };

  const handleStart = () => {
    setIsStopwatchStarted(true);
    clearInterval(stopwatchInterval.current);
    setIsStartStop(false);
  };

  const handleStop = () => {
    setIsStartStop(!isStartStop);
    clearInterval(stopwatchInterval.current);
  };

  useEffect(() => {
    isStartStop ? clearInterval(stopwatchInterval.current) : startStopwatch();
  }, [isStartStop]);

  const handleReset = () => {
    setIsStopwatchReset(isStopwatchReset);
    setStopwatch(0);
  };

  const showStopwatch = !isStopwatchStarted && !isStopwatchReset;

  return (
    <div style={{ textAlign: "center" }}>
      {showStopwatch ? (
        <button className="btn" onClick={handleStart}>
          Start Stopwatch
        </button>
      ) : (
        <>
          <button className="btn" onClick={handleReset}>
            Reset Stopwatch
          </button>
          <h1>Time is: {stopwatch}</h1>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <button className="btn" onClick={handleAddition}>
              +5s
            </button>
            <button className="btn" onClick={handleSubtraction}>
              -5s
            </button>
          </div>
          <br />
          <button className="btn" onClick={() => handleStop()}>
            Stop/Start Stopwatch
          </button>
        </>
      )}
    </div>
  );
};
