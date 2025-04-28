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
  const navbarBgColor = isHomepage ? 'bg-white' : 'bg-gray-100';

  const links = [
    { id: 1, link: 'Home' },
    { id: 2, link: 'Category' },
    { id: 3, link: 'Company' },
    { id: 4, link: 'Contact' },
  ];

  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to the top of the page
  };

  return (
    <div className={`fixed top-0 left-0 w-full h-20 ${navbarBgColor} shadow-md z-50 flex items-center px-4`}>
      {/* Logo */}
      <div className="flex items-center">
        <img
          src={jobscoutlogo}
          alt="Iligan JobScout Logo"
          className="h-16 w-auto"
        />
        <span className="ml-2 font-bold text-xl">Iligan JobScout</span>
      </div>

      {/* Links */}
      <ul className="hidden md:flex justify-center space-x-6 flex-1">
        {links.map(({ id, link }) => (
          <li
            key={id}
            className="px-3 text-xl cursor-pointer text-black hover:underline"
            onClick={link === 'Home' ? handleHomeClick : undefined} // Scroll to top for "Home"
          >
            {link === 'Home' ? (
              <span>{link}</span> // Use a span for "Home" to avoid ScrollLink
            ) : (
              <ScrollLink to={link.toLowerCase()} smooth duration={500}>
                {link}
              </ScrollLink>
            )}
          </li>
        ))}
      </ul>

      {/* Buttons */}
      <div className="hidden md:flex space-x-4">
        <button className="bg-blue-500 text-black px-4 py-2 rounded-md hover:bg-blue-600">
          Post a Job
        </button>
        <button
          className="bg-navy text-whites px-4 py-2 rounded-md hover:bg-navy-600"
          onClick={() => navigate('/')} // Navigate to SignIn component
        >
          Sign In
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        onClick={() => setNav(!nav)}
        className="cursor-pointer md:hidden text-black"
      >
        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      {/* Mobile Links */}
      {nav && (
        <ul className="absolute top-20 left-0 w-full bg-white flex flex-col items-center space-y-6 py-4 shadow-md">
          {links.map(({ id, link }) => (
            <li
              key={id}
              className="cursor-pointer text-black hover:underline"
              onClick={link === 'Home' ? handleHomeClick : undefined} // Scroll to top for "Home"
            >
              {link === 'Home' ? (
                <span onClick={() => setNav(false)}>{link}</span> // Use a span for "Home"
              ) : (
                <ScrollLink
                  to={link.toLowerCase()}
                  smooth
                  duration={500}
                  onClick={() => setNav(false)}
                >
                  {link}
                </ScrollLink>
              )}
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