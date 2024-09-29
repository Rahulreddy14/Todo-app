import React, { useState } from 'react';

const TimeBlocker = ({ tasks }) => {
  const [selectedTask, setSelectedTask] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleTimeBlock = () => {
    // Add logic to save or display the time block
    console.log(`Task: ${selectedTask}, Start: ${startTime}, End: ${endTime}`);
  };

  return (
    <div className="time-blocker-container p-4 border rounded">
      <h3 className="text-xl mb-4">Time Block Scheduler</h3>
      <select
        className="mb-2 p-2 border rounded"
        onChange={(e) => setSelectedTask(e.target.value)}
        value={selectedTask}
      >
        <option value="">Select a Task</option>
        {tasks.map((task) => (
          <option key={task.id} value={task.id}>
            {task.title}
          </option>
        ))}
      </select>
      <div className="mb-2">
        <label>Start Time:</label>
        <input
          type="time"
          className="ml-2 p-1 border rounded"
          onChange={(e) => setStartTime(e.target.value)}
          value={startTime}
        />
      </div>
      <div className="mb-4">
        <label>End Time:</label>
        <input
          type="time"
          className="ml-2 p-1 border rounded"
          onChange={(e) => setEndTime(e.target.value)}
          value={endTime}
        />
      </div>
      <button
        onClick={handleTimeBlock}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Block Time
      </button>
    </div>
  );
};

export default TimeBlocker;
