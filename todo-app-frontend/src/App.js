import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import TaskList from './components/TaskList';
import CreateTask from './components/CreateTask';
import NavBar from './components/NavBar';
import './App.css';
import './tailwind.css';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');  // Load token from localStorage if available
  const [username, setUsername] = useState("rahul5959red");  // Simulating username

  // Sync token with localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);  // Persist token in localStorage
    }
  }, [token]);

  return (
    <Router>
      <div className="flex h-screen">
        {/* Show navigation only if the user is logged in */}
        {token && <NavBar token={token} setToken={setToken} username={username} />}
        
        <div className="w-full p-6 bg-black overflow-auto">
          <Routes>
            {/* Public Routes */}
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn setToken={setToken} />} />

            {/* Protected Routes - Only render if the user is logged in */}
            <Route path="/tasks" element={token ? <TaskList token={token} /> : <SignIn setToken={setToken} />} />
            <Route path="/create-task" element={token ? <CreateTask token={token} /> : <SignIn setToken={setToken} />} />

            {/* Default route */}
            <Route path="/" element={token ? <TaskList token={token} /> : <SignIn setToken={setToken} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
