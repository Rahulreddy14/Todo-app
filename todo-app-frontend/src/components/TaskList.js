import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';  

const TaskList = ({ token }) => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  // Fetch tasks when the component mounts
  const fetchTasks = async () => {
    try {
      const response = await axiosInstance.get('/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks(); // Fetch tasks when component mounts
  }, [token]);

  // Create a new task
  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post(
        '/tasks',
        { title: newTaskTitle, description: newTaskDescription },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewTaskTitle('');  // Clear the form
      setNewTaskDescription('');
      fetchTasks();  // Fetch tasks again after creating a new one
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  // Edit a task
  const handleEditTask = async (taskId) => {
    try {
      await await axiosInstance.put(
        `/tasks/${taskId}`,
        { title: editTitle, description: editDescription },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTasks();  // Fetch tasks again after editing
      setEditingTaskId(null);  // Exit edit mode
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  // Delete a task
  const handleDeleteTask = async (taskId) => {
    try {
      await  await axiosInstance.delete(`/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();  // Fetch tasks again after deleting
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Enter edit mode and pre-fill inputs with the task data
  const handleEditClick = (task) => {
    setEditingTaskId(task._id);
    setEditTitle(task.title);  // Pre-fill title for editing
    setEditDescription(task.description);  // Pre-fill description for editing
  };

  return (
    <div className="min-h-screen bg-black p-6">
      <h1 className="text-4xl font-bold text-white mb-8 text-center">Your Tasks</h1>

      {/* Task creation form */}
      <form onSubmit={handleCreateTask} className="mb-8 flex flex-col items-center">
        <input
          type="text"
          placeholder="New task title"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          className="w-full max-w-lg px-4 py-3 mb-4 text-lg bg-gray-800 text-white border border-red-500 rounded-md focus:outline-none focus:ring-4 focus:ring-red-600"
        />
        <input
          type="text"
          placeholder="New task description"
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
          className="w-full max-w-lg px-4 py-3 mb-4 text-lg bg-gray-800 text-white border border-red-500 rounded-md focus:outline-none focus:ring-4 focus:ring-red-600"
        />
        <button
          type="submit"
          className="w-full max-w-lg py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-all"
        >
          Create Task
        </button>
      </form>

      {/* Task list */}
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li
            key={task._id}
            className="bg-gray-800 p-4 rounded-lg flex justify-between items-center text-white"
          >
            {editingTaskId === task._id ? (
              <div className="flex flex-col w-full">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-4 py-2 mb-2 bg-gray-700 text-white border border-red-500 rounded-md focus:outline-none focus:ring-4 focus:ring-red-600"
                />
                <input
                  type="text"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full px-4 py-2 mb-4 bg-gray-700 text-white border border-red-500 rounded-md focus:outline-none focus:ring-4 focus:ring-red-600"
                />
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => handleEditTask(task._id)}
                    className="py-2 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-all"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingTaskId(null)}
                    className="py-2 px-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center w-full">
                <span className="text-xl">{task.title} - {task.description}</span>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleEditClick(task)}
                    className="py-2 px-4 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 transition-all"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task._id)}
                    className="py-2 px-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-all"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
