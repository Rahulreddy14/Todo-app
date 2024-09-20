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
    <div className="flex flex-col w-1/5 h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-8">Todo App</h1>
      <nav className="space-y-4">
        <Link to="/tasks" className="hover:text-red-500 transition-all">
          Today
        </Link>
        <Link to="/upcoming" className="hover:text-red-500 transition-all">
          Upcoming
        </Link>
        <Link to="/completed" className="hover:text-red-500 transition-all">
          Completed
        </Link>
        <Link to="/projects" className="hover:text-red-500 transition-all">
          My Projects
        </Link>
      </nav>

      {/* Logout Button */}
      {token && (
        <button
          onClick={handleLogout}
          className="mt-auto py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default NavBar;
