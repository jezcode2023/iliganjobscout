import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jobscoutlogo from './jobscout.png';
import { supabase } from '../supabaseClient';

const CompanySignIn = ({ setUserRole }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (email && password) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      setLoading(false);
      if (error) {
        alert(error.message);
      } else {
        // Insert or upsert into profiles table after successful login
        const user = data.user;
        if (user) {
          await supabase.from('profiles').upsert([
            {
              id: user.id,
              email: user.email,
              full_name: user.user_metadata?.full_name || '',
              role: 'company',
            }
          ]);
        }
        if (typeof setUserRole === 'function') {
          setUserRole('company');
        }
        // Go directly to dashboard after successful login
        navigate('/company-dashboard');
      }
    } else {
      setLoading(false);
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
          Company Sign In
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
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Log In'}
            
          </button>
        </form>
        <div className="mt-6 text-center">
          <span className="text-gray-700">No account yet? </span>
          <a
            href="/company-registration"
            className="text-blue-600 hover:underline font-semibold"
          >
            Register here.
          </a>
        </div>
      </div>
    </div>
    
  );
};

export default CompanySignIn;

