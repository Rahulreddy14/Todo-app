import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';  // Import axios instance

const CreateTask = ({ token }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');  // Optional for status messages

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(
        '/tasks',
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Task created successfully!');
      setTitle('');  // Clear the form after success
      setDescription('');
      // Optionally refresh task list or redirect to task list page
    } catch (error) {
      console.error('Error creating task:', error);
      setMessage('Error creating task. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-custom-black p-6 flex items-center justify-center">
      <form
        onSubmit={handleCreateTask}
        className="bg-gray-900 p-8 rounded-lg shadow-xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          Create New Task
        </h2>

        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-3 mb-4 text-lg bg-gray-800 text-white placeholder-gray-500 border border-red-500 rounded-md focus:outline-none focus:ring-4 focus:ring-red-600"
        />

        <input
          type="text"
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-3 mb-6 text-lg bg-gray-800 text-white placeholder-gray-500 border border-red-500 rounded-md focus:outline-none focus:ring-4 focus:ring-red-600"
        />

        <button
          type="submit"
          className="w-full py-3 bg-custom-red text-white font-semibold rounded-md hover:bg-red-700 transition-all"
        >
          Create Task
        </button>

        {/* Optional message for success or error */}
        {message && (
          <p className="text-center mt-4 text-red-500 font-semibold">
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default CreateTask;
