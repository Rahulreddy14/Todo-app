import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';  // Import axios instance

const CreateTask = ({ token }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');  // Optional for status messages
  const [showForm, setShowForm] = useState(false);  // Control to show/hide form

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post(
        '/tasks',
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Task created successfully!');
      setTitle('');  // Clear the form after success
      setDescription('');
      setShowForm(false);  // Hide form after task creation
    } catch (error) {
      console.error('Error creating task:', error);
      setMessage('Error creating task. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-dark-gray p-6 flex flex-col items-center justify-center">
      {/* + Add Task Button */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="py-2 px-4 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-all"
        >
          + Add Task
        </button>
      )}

      {/* Task Form (Shown when + Add Task is clicked) */}
      {showForm && (
        <form
          onSubmit={handleCreateTask}
          className="bg-gray-900 p-8 rounded-lg shadow-xl w-full max-w-md mt-4"
        >
          <h2 className="text-3xl font-bold text-center text-white mb-8">
            Create New Task
          </h2>

          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 mb-4 text-lg bg-gray-800 text-white placeholder-gray-500 border border-green-500 rounded-md focus:outline-none focus:ring-4 focus:ring-green-600"
          />

          <input
            type="text"
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 mb-6 text-lg bg-gray-800 text-white placeholder-gray-500 border border-green-500 rounded-md focus:outline-none focus:ring-4 focus:ring-green-600"
          />

          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-all"
          >
            Create Task
          </button>

          {/* Optional message for success or error */}
          {message && (
            <p className="text-center mt-4 text-green-500 font-semibold">
              {message}
            </p>
          )}

          {/* Cancel Button */}
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="w-full mt-4 py-2 bg-gray-700 text-white font-semibold rounded-md hover:bg-gray-800 transition-all"
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default CreateTask;
