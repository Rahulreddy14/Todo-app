import React, { useState, useEffect } from 'react';

const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Alert user when timer finishes
      alert('Time for a break!');
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setTimeLeft(25 * 60);
    setIsRunning(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="pomodoro-timer-container p-4 border rounded mt-4">
      <h3 className="text-xl mb-4">Pomodoro Timer</h3>
      <div className="text-2xl mb-4">{formatTime(timeLeft)}</div>
      <button
        onClick={startTimer}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mr-2"
      >
        Start
      </button>
      <button
        onClick={pauseTimer}
        className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 mr-2"
      >
        Pause
      </button>
      <button
        onClick={resetTimer}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Reset
      </button>
    </div>
  );
};

export default PomodoroTimer;
