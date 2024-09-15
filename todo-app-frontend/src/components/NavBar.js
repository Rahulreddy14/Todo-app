import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = ({ token, setToken }) => {
  const navigate = useNavigate();

  // Handle Logout functionality
  const handleLogout = () => {
    setToken('');  // Clear token from state
    localStorage.removeItem('token');  // Remove token from localStorage
    navigate('/signin');  // Redirect to sign-in page
  };

  return (
    <nav className="bg-custom-black p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          {/* Links for tasks and create task */}
          <Link
            to="/tasks"
            className="text-custom-white hover:text-custom-red font-semibold transition-all"
          >
            Tasks
          </Link>
          <Link
            to="/create-task"
            className="text-custom-white hover:text-custom-red font-semibold transition-all"
          >
            Create Task
          </Link>
        </div>

        {/* Logout Button (only visible when token is present) */}
        {token && (
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-custom-red text-white rounded-lg hover:bg-red-700 transition-all"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;

