import React, { useState } from 'react';
import falls from '../components/falls.jpg'; // Adjust path if needed
import jobscoutlogo from './jobscout.png';
import { useNavigate } from 'react-router-dom';

const UserHomepage = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState('');

  const handleLogout = () => {
    // Add your logout logic here (e.g., clear auth, redirect, etc.)
    navigate('/');
  };

  // Handle search form submit and redirect to SearchResults.jsx
  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?query=${encodeURIComponent(search)}`);
    }
  };

  return (
    <div className="w-full bg-whites mt-20">
      {/* Navbar for logged-in users (no Sign In button) */}
      <div className="fixed top-0 left-0 w-full h-20 bg-whites shadow-md z-50 flex items-center px-4">
        {/* Logo */}
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate('/user-homepage')}
        >
          <img src={jobscoutlogo} alt="Iligan JobScout Logo" className="h-16 w-auto" />
          <span className="ml-2 font-bold text-xl">Iligan JobScout</span>
        </div>
        {/* Links */}
        <ul className="hidden md:flex justify-center space-x-6 flex-1">
          <li
            className="px-3 text-xl cursor-pointer text-black hover:underline"
            onClick={() => navigate('/user-homepage')}
          >
            Home
          </li>
          <li
            className="px-3 text-xl cursor-pointer text-black hover:underline"
            onClick={() => navigate('/user-category')}
          >
            Category
          </li>
          <li
            className="px-3 text-xl cursor-pointer text-black hover:underline"
            onClick={() => navigate('/user-company')}
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
        {/* Hamburger Menu */}
        <div className="ml-auto relative">
          <button
            className="flex items-center justify-center w-10 h-10 rounded-full focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open user menu"
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
          {/* Dropdown Menu */}
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-2 z-50">
              <button
                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                onClick={() => {
                  setMenuOpen(false);
                  navigate('/profile');
                }}
              >
                Profile
              </button>
              <button
                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Hero Section with Search */}
      <section
        className="relative bg-navy py-16 w-full"
        style={{
          backgroundImage: `url(${falls})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-navy bg-opacity-80"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h1 className="text-4xl font-bold text-whites mb-4">
              Find Your Dream Job Today
            </h1>
            <p className="text-xl text-white opacity-90">
              Connect with thousands of employers and opportunities
            </p>
          </div>
          <form className="max-w-2xl mx-auto" onSubmit={handleSearch}>
            <div className="flex bg-white rounded-lg overflow-hidden shadow-lg">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for jobs, companies, or keywords"
                className="w-full px-6 py-4 border-none text-gray-700"
              />
              <button
                type="submit"
                className="bg-navy text-white px-8 py-4 whitespace-nowrap flex items-center"
              >
                <span className="w-5 h-5 flex items-center justify-center mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </span>
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12">POPULAR CATEGORIES</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Category 1 */}
            <div
              className="category-card rounded-lg overflow-hidden shadow-md"
              style={{
                backgroundImage: "url('https://readdy.ai/api/search-image?query=professional%20accountant%20working%20at%20desk%20with%20financial%20documents%2C%20calculator%2C%20computer%20screen%20showing%20spreadsheets%2C%20modern%20office%20setting%2C%20business%20attire%2C%20focused%20on%20work%2C%20clean%20organized%20workspace&width=400&height=200&seq=2&orientation=landscape')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="category-content h-full flex flex-col justify-end p-6 bg-black bg-opacity-30">
                <h3 className="text-xl font-bold text-white mb-3">
                  ACCOUNTANT/FINANCE
                </h3>
                <button
                  onClick={() => navigate('/search?category=Accountant/Finance')}
                  className="bg-black bg-opacity-70 text-white text-center py-2 px-6 rounded-lg inline-block w-24 whitespace-nowrap"
                >
                  MORE
                </button>
              </div>
            </div>
            {/* Category 2 */}
            <div
              className="category-card rounded-lg overflow-hidden shadow-md"
              style={{
                backgroundImage: "url('https://readdy.ai/api/search-image?query=professional%20secretary%20at%20modern%20office%20desk%2C%20organizing%20documents%2C%20answering%20phone%20calls%2C%20using%20computer%2C%20business%20attire%2C%20efficient%20workspace%20organization%2C%20corporate%20environment&width=400&height=200&seq=3&orientation=landscape')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="category-content h-full flex flex-col justify-end p-6 bg-black bg-opacity-30">
                <h3 className="text-xl font-bold text-white mb-3">SECRETARY</h3>
                <button
                  onClick={() => navigate('/search?category=Secretary')}
                  className="bg-black bg-opacity-70 text-white text-center py-2 px-6 rounded-lg inline-block w-24 whitespace-nowrap"
                >
                  MORE
                </button>
              </div>
            </div>
            {/* Category 3 */}
            <div
              className="category-card rounded-lg overflow-hidden shadow-md"
              style={{
                backgroundImage: "url('https://readdy.ai/api/search-image?query=virtual%20assistant%20working%20remotely%2C%20home%20office%20setup%20with%20multiple%20screens%2C%20headset%2C%20organized%20desk%2C%20professional%20environment%2C%20digital%20workspace%2C%20video%20conference%20call%20visible%20on%20screen&width=400&height=200&seq=4&orientation=landscape')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="category-content h-full flex flex-col justify-end p-6 bg-black bg-opacity-30">
                <h3 className="text-xl font-bold text-white mb-3">
                  VIRTUAL ASSISTANT
                </h3>
                <button
                  onClick={() => navigate('/search?category=Virtual Assistant')}
                  className="bg-black bg-opacity-70 text-white text-center py-2 px-6 rounded-lg inline-block w-24 whitespace-nowrap"
                >
                  MORE
                </button>
              </div>
            </div>
            {/* Category 4 */}
            <div
              className="category-card rounded-lg overflow-hidden shadow-md"
              style={{
                backgroundImage: "url('https://readdy.ai/api/search-image?query=food%20service%20workers%20in%20restaurant%20kitchen%2C%20chef%20and%20waitstaff%2C%20preparing%20meals%2C%20professional%20culinary%20environment%2C%20restaurant%20setting%2C%20food%20preparation%2C%20team%20working%20together&width=400&height=200&seq=5&orientation=landscape')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="category-content h-full flex flex-col justify-end p-6 bg-black bg-opacity-30">
                <h3 className="text-xl font-bold text-white mb-3">FOOD SERVICE</h3>
                <button
                  onClick={() => navigate('/search?category=Food Service')}
                  className="bg-black bg-opacity-70 text-white text-center py-2 px-6 rounded-lg inline-block w-24 whitespace-nowrap"
                >
                  MORE
                </button>
              </div>
            </div>
            {/* Category 5 */}
            <div
              className="category-card rounded-lg overflow-hidden shadow-md"
              style={{
                backgroundImage: "url('https://readdy.ai/api/search-image?query=human%20resources%20professionals%20in%20meeting%2C%20discussing%20employee%20profiles%2C%20recruitment%20process%2C%20office%20setting%2C%20business%20attire%2C%20HR%20department%2C%20interview%20process%2C%20professional%20environment&width=400&height=200&seq=6&orientation=landscape')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="category-content h-full flex flex-col justify-end p-6 bg-black bg-opacity-30">
                <h3 className="text-xl font-bold text-white mb-3">HUMAN RESOURCE</h3>
                <button
                  onClick={() => navigate('/search?category=Human Resource')}
                  className="bg-black bg-opacity-70 text-white text-center py-2 px-6 rounded-lg inline-block w-24 whitespace-nowrap"
                >
                  MORE
                </button>
              </div>
            </div>
            {/* Category 6 */}
            <div
              className="category-card rounded-lg overflow-hidden shadow-md"
              style={{
                backgroundImage: "url('https://readdy.ai/api/search-image?query=healthcare%20workers%20in%20hospital%20setting%2C%20doctors%20and%20nurses%2C%20medical%20professionals%2C%20patient%20care%2C%20medical%20facility%2C%20clinical%20environment%2C%20healthcare%20team%2C%20medical%20equipment&width=400&height=200&seq=7&orientation=landscape')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="category-content h-full flex flex-col justify-end p-6 bg-black bg-opacity-30">
                <h3 className="text-xl font-bold text-white mb-3">
                  HEALTHCARE WORKERS
                </h3>
                <button
                  onClick={() => navigate('/search?category=Healthcare Workers')}
                  className="bg-black bg-opacity-70 text-white text-center py-2 px-6 rounded-lg inline-block w-24 whitespace-nowrap"
                >
                  MORE
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Employer Section */}
      <div className="w-full bg-navy text-white py-6 text-center">
        <p>
          Employer? Find the perfect team for your business.{' '}
          <a href="#" className="underline">
            Register here
          </a>
          .
        </p>
      </div>

      {/* Featured Jobs Section */}
      <div className="py-10">
        <h2 className="text-center text-2xl font-bold mb-6">FEATURED JOBS</h2>
        <div className="grid grid-cols-4 gap-6 px-10">
          {Array(8)
            .fill('Job Title')
            .map((job, index) => (
              <div key={index} className="bg-navy text-white p-4 rounded-lg shadow-md">
                <h3 className="font-bold">{job}</h3>
                <p>Company Name</p>
                <p>Location</p>
              </div>
            ))}
        </div>
      </div>

      {/* Footer Section */}
      <div className="w-full bg-navy text-white py-6 text-center">
        <p>
          Looking for a job? Find the perfect job for you{' '}
          <a href="/category" className="underline">
            here
          </a>
          .
        </p>
        <p className="mt-4">&copy; 2025 Iligan JobScout</p>
      </div>
    </div>
  );
};

export default UserHomepage;