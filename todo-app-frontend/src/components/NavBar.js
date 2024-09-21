import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = ({ token, setToken, username = "Username" }) => {
  const navigate = useNavigate();

  // Handle Logout functionality
  const handleLogout = () => {
    setToken('');  // Clear token from state
    localStorage.removeItem('token');  // Remove token from localStorage
    navigate('/signin');  // Redirect to sign-in page
  };

  return (
    <div className="flex flex-col w-1/5 h-screen bg-gray-200 text-black p-6">
      {/* Username Display */}
      <div className="flex items-center mb-8">
        <div className="bg-gray-300 p-3 rounded-full">
          {/* Initials or Profile Icon */}
          <span className="text-lg font-bold text-black">{username.charAt(0).toUpperCase()}</span>
        </div>
        <div className="ml-4">
          <span className="text-lg font-bold">{username}</span>
        </div>
      </div>

      {/* Vertical Stacking of Sidebar Items */}
      <nav className="flex flex-col space-y-4">
        <Link to="/tasks" className="text-sm hover:text-green-500 transition-all">
          Today
        </Link>
        <Link to="/upcoming" className="text-sm hover:text-green-500 transition-all">
          Upcoming
        </Link>
        <Link to="/completed" className="text-sm hover:text-green-500 transition-all">
          Completed
        </Link>
        <Link to="/projects" className="text-sm hover:text-green-500 transition-all">
          My Projects
        </Link>
      </nav>

      {/* Logout Button */}
      {token && (
        <button
          onClick={handleLogout}
          className="mt-auto py-2 px-4 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-all"
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default NavBar;
