import React from 'react';
import { useNavigate } from 'react-router-dom';
import jobscoutlogo from './jobscout.png';

const SignIn = () => {
  const navigate = useNavigate();

  const handleSignIn = (role) => {
    if (role === 'jobseeker') {
      navigate('/jobseeker-signin'); // Navigate to Job Seeker Sign In page
    } else if (role === 'company') {
      // Add navigation for company sign-in if needed
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Logo */}
      <div className="mb-6">
        <img
          src={jobscoutlogo}
          alt="Iligan JobScout Logo"
          className="h-42 w-auto"
        />
      </div>

      {/* Signing Up Section */}
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-6">Signing in as...</h2>
        <button
          onClick={() => handleSignIn('jobseeker')}
          className="w-full bg-navy text-white px-4 py-2 rounded-md hover:bg-navy-600 mb-4"
        >
          Job Seeker
        </button>
        <button
          onClick={() => handleSignIn('company')}
          className="w-full bg-navy text-white px-4 py-2 rounded-md hover:bg-navy-600"
        >
          Company
        </button>
      </div>
    </div>
  );
};

export default SignIn;