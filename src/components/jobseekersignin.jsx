import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jobscoutlogo from './jobscout.png';
import { supabase } from '../supabaseClient'; // Import Supabase client

const JobSeekerSignIn = ({ setUserRole }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email && password) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        alert(error.message);
      } else {
        const user = data.user;
        if (user) {
          await supabase.from('profiles').upsert([
            {
              id: user.id,
              email: user.email,
              full_name: user.user_metadata?.full_name || '',
              role: 'jobseeker',
            },
          ]);
        }
        if (typeof setUserRole === 'function') {
          setUserRole('jobseeker');
        }
        navigate('/user-homepage');
      }
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
        <div className="mt-6 text-center">
          <span className="text-gray-700">No account yet? </span>
          <a
            href="/jobseeker-registration"
            className="text-blue-600 hover:underline font-semibold"
          >
            Register here
          </a>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerSignIn;