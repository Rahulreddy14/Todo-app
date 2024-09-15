import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';  // Import Link for navigation
import axios from 'axios';

const SignIn = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/users/signin', {
        email,
        password,
      });
      setToken(response.data.token);  // Save the token to state
      localStorage.setItem('token', response.data.token);  // Persist token in localStorage
      navigate('/tasks');  // Redirect to tasks page after successful sign-in
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <form 
        onSubmit={handleSignIn} 
        className="bg-gray-900 p-8 rounded-lg shadow-xl w-full max-w-md transition-transform transform hover:scale-105"
      >
        <h1 className="text-5xl font-bold text-center text-white mb-8 font-custom">
          Rahul-To-Do-App
        </h1>

        <h2 className="text-2xl font-semibold text-center text-white mb-6">
          Sign In
        </h2>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-5 py-3 mb-4 text-lg bg-gray-800 text-white placeholder-gray-500 border border-red-500 rounded-md focus:outline-none focus:ring-4 focus:ring-red-600"
        />

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-5 py-3 mb-6 text-lg bg-gray-800 text-white placeholder-gray-500 border border-red-500 rounded-md focus:outline-none focus:ring-4 focus:ring-red-600"
        />

        <button
          type="submit"
          className="w-full py-3 text-lg font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 transition-all focus:outline-none focus:ring-4 focus:ring-red-700"
        >
          Sign In
        </button>

        <p className="text-center mt-6 text-gray-400 text-sm">
          Don't have an account?{' '}
          <Link to="/signup" className="text-red-500 hover:underline hover:text-red-400 transition-all">
            Sign Up here
          </Link>.
        </p>
      </form>
    </div>
  );
};

export default SignIn;
