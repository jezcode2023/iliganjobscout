import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jobscoutlogo from './jobscout.png'; // Keep this import

const JobSeekerSignIn = ({ setUserRole }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent form submission reload
    if (email && password) {
      if (typeof setUserRole === 'function') {
        setUserRole('jobseeker'); // Set the user role to jobseeker
      }
      navigate('/homepage'); // Redirect to homepage
    } else {
      alert('Please enter both email and password.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Logo */}
      <div className="mb-6">
        <img
          src={jobscoutlogo}
          alt="Iligan JobScout Logo"
          className="h-80 w-auto"
        />
      </div>

      {/* Login Form */}
      <div className="bg-white p-7 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-navy text-2xl font-bold mb-6 text-center">
          Job Seeker Sign In
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-navy text-white px-4 py-2 rounded-md hover:bg-blue"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobSeekerSignIn;