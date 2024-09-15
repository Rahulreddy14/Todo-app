import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';  // Import useNavigate for redirection
import axiosInstance from '../axiosInstance';  // Adjust the path based on your file structure


const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');  // To store status messages
  const navigate = useNavigate();  // Initialize useNavigate for redirection

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/users/signup', {
        username,
        email,
        password,
      });

      setMessage('Sign up successful! Redirecting to Sign In...');

      // Automatically redirect to Sign In page after 2 seconds
      setTimeout(() => {
        navigate('/signin');
      }, 2000);

    } catch (error) {
      // Show error message if the sign-up fails
      setMessage('Sign up failed. Please try again.');
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <form onSubmit={handleSignUp} className="bg-gray-900 p-8 rounded-lg shadow-xl w-full max-w-md transition-transform transform hover:scale-105">
        <h1 className="text-5xl font-bold text-center text-white mb-8 font-custom">
          Your Unique To-Do
        </h1>

        <h2 className="text-2xl font-semibold text-center text-white mb-6">
          Sign Up
        </h2>

        <input
          type="text"
          placeholder="Choose a username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-5 py-3 mb-4 text-lg bg-gray-800 text-white placeholder-gray-500 border border-red-500 rounded-md focus:outline-none focus:ring-4 focus:ring-red-600"
        />

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-5 py-3 mb-4 text-lg bg-gray-800 text-white placeholder-gray-500 border border-red-500 rounded-md focus:outline-none focus:ring-4 focus:ring-red-600"
        />

        <input
          type="password"
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-5 py-3 mb-6 text-lg bg-gray-800 text-white placeholder-gray-500 border border-red-500 rounded-md focus:outline-none focus:ring-4 focus:ring-red-600"
        />

        <button
          type="submit"
          className="w-full py-3 text-lg font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 transition-all focus:outline-none focus:ring-4 focus:ring-red-700"
        >
          Sign Up
        </button>

        {/* Show message (success or error) */}
        {message && <p className="text-center mt-4 text-red-600">{message}</p>}

        <p className="text-center mt-6 text-gray-400 text-sm">
          Already have an account?{' '}
          <Link to="/signin" className="text-red-500 hover:underline hover:text-red-400 transition-all">
            Sign In here
          </Link>.
        </p>
      </form>
    </div>
  );
};

export default SignUp;
