import React from 'react';
import { useNavigate } from 'react-router-dom';
import jobscoutlogo from './jobscout.png'; // Keep this import

const SignIn = ({ setUserRole }) => {
  const navigate = useNavigate();

  const handleSignIn = (role) => {
    if (typeof setUserRole === 'function') {
      setUserRole(role); // Set the user role
    }

    if (role === 'jobseeker') {
      navigate('/jobseeker-signin'); // Navigate to Job Seeker Sign In page
    } else if (role === 'company') {
      navigate('/company-signin'); // Navigate to Company Sign In page
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

      {/* Signing In Section */}
      <div className="bg-whites p-7 rounded-lg shadow-md w-full max-w-md text-center mb-3">
        <h2 className="text-navy text-2xl font-bold mb-6">Signing in as...</h2>
        <button
          onClick={() => handleSignIn('jobseeker')}
          className="w-full bg-navy text-white px-4 py-2 rounded-md hover:bg-blue mb-4"
        >
          Job Seeker
        </button>
        <button
          onClick={() => handleSignIn('company')}
          className="w-full bg-navy text-white px-4 py-2 rounded-md hover:bg-blue"
        >
          Company
        </button>
      </div>
    </div>
  );
};

export default SignIn;