import React, { useState, useEffect } from 'react';

const PomodoroTimer = () => {
  // State to manage time and intervals
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes
  const [isRunning, setIsRunning] = useState(false);
  const [sessionType, setSessionType] = useState('Work'); // 'Work' or 'Break'
  const [completedSessions, setCompletedSessions] = useState(0); // Track sessions

  // Start/Stop the timer
  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }
    // If time is up, handle session completion
    if (timeLeft === 0) {
      setIsRunning(false); // Stop timer
      handleSessionCompletion();
    }
    return () => clearInterval(timer); // Cleanup interval
  }, [isRunning, timeLeft]);

  // Handle completion of a session
  const handleSessionCompletion = () => {
    if (sessionType === 'Work') {
      setCompletedSessions((prev) => prev + 1);
      // Check if it's time for a long break
      if (completedSessions % 4 === 3) {
        setTimeLeft(30 * 60); // 30-minute long break
        setSessionType('Long Break');
      } else {
        setTimeLeft(5 * 60); // 5-minute short break
        setSessionType('Break');
      }
    } else {
      // Switch to work session after break
      setTimeLeft(25 * 60); // 25 minutes of work
      setSessionType('Work');
    }
  };

  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Controls
  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(25 * 60);
    setSessionType('Work');
  };

  return (
    <div className="pomodoro-timer-container p-4 border rounded mt-4">
      <h3 className="text-xl mb-4">{sessionType} Session</h3>
      <div className="text-3xl mb-4">{formatTime(timeLeft)}</div>
      <div className="flex space-x-2">
        <button
          onClick={startTimer}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Start
        </button>
        <button
          onClick={pauseTimer}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
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
    </div>
  );
};

export default PomodoroTimer;
