import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import { FaPencilAlt, FaTrash, FaCheck } from 'react-icons/fa';  // Importing icons

const TaskList = ({ token }) => {
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [newTaskTitle, setNewTaskTitle] = useState('');  // Defined the missing state
  const [newTaskDescription, setNewTaskDescription] = useState('');  // Defined the missing state
  const [showForm, setShowForm] = useState(false);  // Control to show/hide form

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

  // Toggle task completion status
  const toggleTaskCompletion = async (taskId, completed) => {
    try {
      await axiosInstance.put(
        `/tasks/${taskId}`,
        { completed: !completed },  // Toggle completed status
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTasks();  // Refresh tasks after updating
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  // Handle creating a new task
  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post(
        '/tasks',
        { title: newTaskTitle, description: newTaskDescription },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewTaskTitle('');  // Clear form fields after task creation
      setNewTaskDescription('');
      setShowForm(false);  // Hide form after successful creation
      fetchTasks();  // Refresh tasks list
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  // Edit a task
  const handleEditTask = async (taskId) => {
    try {
      await axiosInstance.put(
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
      await axiosInstance.delete(`/tasks/${taskId}`, {
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
    <div className="min-h-screen bg-gray-900 p-6">
      <h1 className="text-4xl font-bold text-white mb-8 text-center">Your Tasks</h1>

      {/* Add Task Button */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="py-2 px-4 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-all"
        >
          + Add Task
        </button>
      )}

      {showForm && (
        <form onSubmit={handleCreateTask} className="mb-8 flex flex-col items-center">
          <input
            type="text"
            placeholder="New task title"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            className="w-full max-w-lg px-4 py-3 mb-4 text-lg bg-gray-800 text-white border border-green-500 rounded-md focus:outline-none focus:ring-4 focus:ring-green-600"
          />
          <input
            type="text"
            placeholder="New task description"
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
            className="w-full max-w-lg px-4 py-3 mb-4 text-lg bg-gray-800 text-white border border-green-500 rounded-md focus:outline-none focus:ring-4 focus:ring-green-600"
          />
          <button
            type="submit"
            className="w-full max-w-lg py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-all"
          >
            Create Task
          </button>
        </form>
      )}

      {/* Task list */}
      <ul className="space-y-4 mt-6">
        {tasks.map((task) => (
          <li
            key={task._id}
            className="bg-gray-800 p-3 rounded-lg flex justify-between items-center text-sm text-white"
          >
            <div className="flex items-center">
              {/* Rounded Checkbox */}
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskCompletion(task._id, task.completed)}
                className="h-6 w-6 rounded-full border-gray-400 focus:ring-green-500"
              />
              <span className={`ml-4 ${task.completed ? 'line-through text-gray-500' : ''}`}>
                {task.title} - {task.description}
              </span>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => handleEditClick(task)}
                className="p-2 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 transition-all"
              >
                <FaPencilAlt />
              </button>
              <button
                onClick={() => handleDeleteTask(task._id)}
                className="p-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-all"
              >
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
