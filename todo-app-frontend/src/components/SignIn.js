import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';
import axiosInstance from '../axiosInstance';

const SignIn = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');  // To store status messages
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/signin', { email, password });
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
      navigate('/tasks');
    } catch (error) {
      // Show error message if sign-in fails
      setMessage('Sign in failed. Please check your credentials and try again.');
      console.error('Error signing in:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray">
      <div className="w-full max-w-md bg-black p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-white mb-6 text-center font-highlight">Login to DoItNow</h2>

        {/* Display error message if sign-in fails */}
        {message && <p className="text-red-500 mb-4 text-center">{message}</p>}

        <div className="flex flex-col space-y-4">
          <button className="flex items-center justify-center bg-white text-black py-1.5 px-3 rounded-full hover:bg-gray-100 transition-all text-sm">
            <FaGoogle className="mr-2" /> Continue with Google
          </button>
          <button className="flex items-center justify-center bg-white text-black py-1.5 px-3 rounded-full hover:bg-gray-100 transition-all text-sm">
            <FaFacebook className="mr-2" /> Continue with Facebook
          </button>
          <button className="flex items-center justify-center bg-white text-black py-1.5 px-3 rounded-full hover:bg-gray-100 transition-all text-sm">
            <FaApple className="mr-2" /> Continue with Apple
          </button>
        </div>

        <div className="flex items-center my-8">
          <hr className="w-full border-gray-600" />
          <span className="px-2 text-gray-400">or</span>
          <hr className="w-full border-gray-600" />
        </div>

        <form onSubmit={handleSignIn} className="space-y-6">
          <div>
            <label className="block text-white mb-2" htmlFor="email">Email or Username</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-4 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-white mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-4 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-all"
          >
            Log In
          </button>
        </form>

        <div className="mt-6 text-center">
          <a href="#" className="text-sm text-white hover:underline">Forgot your password?</a>
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-400">
            Don't have an account?{' '}
            <Link to="/signup" className="text-white hover:underline">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
