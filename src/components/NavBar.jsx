import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link as ScrollLink } from 'react-scroll';
import { useLocation, useNavigate } from 'react-router-dom';
import jobscoutlogo from './jobscout.png';

const NavBar = () => {
  const [nav, setNav] = useState(false); 
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route

  // Determine the background color based on the current route
  const isHomepage = location.pathname === '/homepage';
  const navbarBgColor = isHomepage ? 'bg-whites' : 'bg-gray-100';

  const links = [
    { id: 1, link: 'Home', path: '/homepage' },
    { id: 2, link: 'Category', path: '/category' }, // Added Category link
    { id: 3, link: 'Employers', path: '/company' },
    { id: 4, link: 'Contact', path: '/contact-us' },
  ];

  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to the top of the page
  };

  return (
    <div className="fixed top-0 left-0 w-full h-20 bg-whites shadow-md z-50 flex items-center px-4">
      {/* Logo and Hamburger Icon Container */}
      <div className="flex items-center justify-between w-full md:w-auto">
        {/* Logo */}
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate('/homepage')} // Navigate to homepage
        >
          <img
            src={jobscoutlogo}
            alt="Iligan JobScout Logo"
            className="h-16 w-auto"
          />
          <span className="ml-2 font-bold text-xl">Iligan JobScout</span>
        </div>

        {/* Mobile Menu Icon */}
        <div
          onClick={() => setNav(!nav)}
          className="cursor-pointer md:hidden text-black"
        >
          {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
        </div>
      </div>

      {/* Links */}
      <ul className="hidden md:flex justify-center space-x-6 flex-1">
        {links.map(({ id, link, path }) => (
          <li
            key={id}
            className="px-3 text-xl cursor-pointer text-black hover:underline"
            onClick={() => navigate(path)}
          >
            {link}
          </li>
        ))}
      </ul>

      {/* Buttons */}
      <div className="hidden md:flex space-x-4">
        <button className="bg-blue-500 text-black px-4 py-2 rounded-md hover:bg-blue-600">
          Post a Job
        </button>
        <button
          className="bg-navy text-whites px-4 py-2 rounded-md hover:bg-blue"
          onClick={() => navigate('/')} // Navigate to SignIn component
        >
          Sign in
        </button>
      </div>

      {/* Mobile Links */}
      {nav && (
        <ul className="absolute top-20 left-0 w-full bg-white flex flex-col items-center space-y-6 py-4 shadow-md">
          {links.map(({ id, link, path }) => (
            <li
              key={id}
              className="cursor-pointer text-black hover:underline"
              onClick={() => navigate(path)}
            >
              {link}
            </li>
          ))}
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Post a Job
          </button>
          <button
            className="bg-gray-200 text-black px-4 py-2 rounded-md hover:bg-gray-300"
            onClick={() => {
              setNav(false);
              navigate('/'); // Navigate to SignIn component
            }}
          >
            Sign In
          </button>
        </ul>
      )}
    </div>
  );
};

export default NavBar;