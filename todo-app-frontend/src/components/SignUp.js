import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../axiosInstance';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

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
      setMessage('Sign up failed. Please check your details and try again.');
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray">
      <form onSubmit={handleSignUp} className="bg-black p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-white mb-6 text-center font-highlight">
          Sign up to start creating tasks
        </h2>

        {/* Display error message if sign-up fails */}
        {message && <p className="text-red-500 mb-4 text-center">{message}</p>}

        <input
          type="text"
          placeholder="Choose a username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 mb-4 text-sm bg-gray-800 text-white placeholder-gray-500 border border-gray-600 rounded-md focus:outline-none focus:ring-4 focus:ring-green-500"
        />

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 mb-4 text-sm bg-gray-800 text-white placeholder-gray-500 border border-gray-600 rounded-md focus:outline-none focus:ring-4 focus:ring-green-500"
        />

        <input
          type="password"
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-6 text-sm bg-gray-800 text-white placeholder-gray-500 border border-gray-600 rounded-md focus:outline-none focus:ring-4 focus:ring-green-500"
        />

        <button
          type="submit"
          className="w-full py-3 text-lg font-semibold text-white bg-green-600 rounded-md hover:bg-green-700 transition-all focus:outline-none focus:ring-4 focus:ring-green-700"
        >
          Sign Up
        </button>

        <p className="text-center mt-6 text-gray-400 text-sm">
          Already have an account?{' '}
          <Link to="/signin" className="text-green-500 hover:underline hover:text-green-400 transition-all">
            Sign In here
          </Link>.
        </p>
      </form>
    </div>
  );
};

export default SignUp;
