import React from 'react';
import { useNavigate } from 'react-router-dom';
import jobscoutlogo from './jobscout.png'; // Keep this import

const NavBar = ({ userRole }) => {
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-0 w-full h-20 bg-whites shadow-md z-50 flex items-center px-4">
      {/* Logo */}
      <div
        className="flex items-center cursor-pointer"
        onClick={() => navigate('/homepage')}
      >
        <img src={jobscoutlogo} alt="Iligan JobScout Logo" className="h-16 w-auto" />
        <span className="ml-2 font-bold text-xl">Iligan JobScout</span>
      </div>

      {/* Links */}
      <ul className="hidden md:flex justify-center space-x-6 flex-1">
        <li
          className="px-3 text-xl cursor-pointer text-black hover:underline"
          onClick={() => navigate('/homepage')}
        >
          Home
        </li>
        <li
          className="px-3 text-xl cursor-pointer text-black hover:underline"
          onClick={() => navigate('/category')}
        >
          Category
        </li>
        <li
          className="px-3 text-xl cursor-pointer text-black hover:underline"
          onClick={() => navigate('/company')}
        >
          Employers
        </li>
        <li
          className="px-3 text-xl cursor-pointer text-black hover:underline"
          onClick={() => navigate('/contact-us')}
        >
          Contact
        </li>
      </ul>

      {/* Buttons */}
      <div className="hidden md:flex space-x-4">
        {userRole === 'jobseeker' ? (
          // Remove Sign In and Post a Job for Job Seeker
          null
        ) : userRole === 'company' ? (
          // Remove Sign In for Company
          <button
            className="bg-blue-500 text-black px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Post a Job
          </button>
        ) : (
          // Default Buttons for Unauthenticated Users
          <>
            <button
              className="bg-blue-500 text-black px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Post a Job
            </button>
            <button
              className="bg-navy text-white px-4 py-2 rounded-md hover:bg-blue"
              onClick={() => navigate('/')}
            >
              Sign in
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;