import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?office,work')" }}>
      {/* Overlay to darken the background */}
      <div className="absolute inset-0 bg-black opacity-70"></div>

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
        <h1 className="text-6xl font-extrabold">Organize Your Life, Boost Productivity</h1>
        <p className="text-2xl mt-4">Your simple, powerful to-do app</p>

        {/* CTA Buttons */}
        <div className="mt-8 space-x-4">
          <Link to="/signup">
            <button className="bg-green-500 py-3 px-6 rounded-lg text-lg hover:bg-green-600 transition duration-300">Sign Up</button>
          </Link>
          <Link to="/signin">
            <button className="bg-blue-500 py-3 px-6 rounded-lg text-lg hover:bg-blue-600 transition duration-300">Sign In</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
