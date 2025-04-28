import React from 'react';

const Homepage = () => {
  const categoryImages = {
    'Accounting/Finance': 'Accounting/Finance',
    'Virtual Assistant': 'Virtual Assistant',
    'Human Resource': 'Human Resource',
    'Designer/Art': 'Designer/Art',
    'Service Crew': 'Service Crew',
    'Health Workers': 'Health Workers',
  };

  return (
    <div className="w-full bg-white mt-20">
      {/* Search Bar Section */}
      <div className="relative w-full h-20 bg-navy flex items-center justify-center">
        <div className="relative w-1/2">
          <input
            type="text"
            placeholder="Enter keywords..."
            className="w-full px-4 py-2 text-lg text-center border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="absolute inset-y-0 right-3 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500"
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
        </div>
      </div>

      {/* Popular Categories Section */}
      <div className="py-10">
        <h2 className="text-center text-2xl font-bold mb-6">POPULAR CATEGORIES</h2>
        <div className="grid grid-cols-3 gap-2 px-10">
          {Object.keys(categoryImages).map((category, index) => (
            <div
              key={index}
              className="relative bg-navy rounded-lg overflow-hidden shadow-md flex flex-col items-center justify-center h-40 p-4"
            >
              <p className="text-white font-bold mb-2">{categoryImages[category]}</p>
              <button className="bg-white text-black px-4 py-2 rounded-md font-bold">MORE</button>
            </div>
          ))}
        </div>
      </div>

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
          <a href="#" className="underline">
            here
          </a>
          .
        </p>
        <p className="mt-4">&copy; 2025 Iligan JobScout</p>
      </div>
    </div>
  );
};

export default Homepage;