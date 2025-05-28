import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jobscoutlogo from './jobscout.png';

const NavBar = ({ userRole }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

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
          Company
        </li>
        <li
          className="px-3 text-xl cursor-pointer text-black hover:underline"
          onClick={() => navigate('/contact-us')}
        >
          Contact
        </li>
      </ul>

      {/* Company: Post a Job Button */}
      {userRole === 'company' && (
        <button
          className="ml-4 bg-blue-500 text-black px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={() => navigate('/post-job')}
        >
          Post a Job
        </button>
      )}

      {/* Hamburger Menu */}
      <div className="ml-4 relative">
        <button
          className="flex items-center justify-center w-10 h-10 rounded-full focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Open menu"
        >
          {/* Hamburger Icon */}
          <svg
            className="w-7 h-7 text-navy"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
          </svg>
        </button>
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
            <button
              className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
              onClick={() => {
                setMenuOpen(false);
                navigate('/signin');
              }}
            >
              Sign In
            </button>
            <button
              className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
              onClick={() => {
                setMenuOpen(false);
                setRegisterOpen(true);
              }}
            >
              Register
            </button>
          </div>
        )}
        {/* Register Modal */}
        {registerOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white rounded-lg shadow-lg p-8 w-80">
              <h3 className="text-xl font-bold mb-4 text-center">Register as</h3>
              <button
                className="w-full mb-3 bg-navy text-white px-4 py-2 rounded-md hover:bg-blue"
                onClick={() => {
                  setRegisterOpen(false);
                  navigate('/company-registration');
                }}
              >
                Company / Employer
              </button>
              <button
                className="w-full bg-navy text-white px-4 py-2 rounded-md hover:bg-blue"
                onClick={() => {
                  setRegisterOpen(false);
                  navigate('/jobseeker-registration');
                }}
              >
                Job Seeker
              </button>
              <button
                className="w-full mt-4 text-gray-600 hover:underline"
                onClick={() => setRegisterOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;