import React from 'react';

const Category = () => {
  const categories = [
    'Accounting',
    'Administration & Office Support',
    'Advertising, Arts & Media',
    'Banking & Financial Services',
    'Call Center & Customer Services',
    'CEO & General Management',
    'Community Services & Development',
    'Construction',
    'Consulting & Strategy',
    'Design & Architecture',
    'Education & Training',
    'Engineering',
    'Farming, Animals & Conservation',
    'Government / Public Office',
    'Healthcare & Medical',
    'Information & Communication Technology',
    'Insurance',
    'Legal',
    'Manufacturing, Transport & Logistics',
    'Marketing & Communications',
    'Mining, Resources & Energy',
    'Real Estate & Property',
    'Retail & Consumer Products',
    'Sales',
    'Science & Technology',
    'Self Employment',
    'Sport & Recreation',
    'Trade & Services',
    'Virtual Assistant & Online Jobs',
  ];
  

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-20">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6">Job Categories</h1>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-4xl px-4">
        {categories.map((category, index) => (
          <div
            key={index}
            className="text-lg text-blue-600 hover:underline cursor-pointer"
          >
            {category}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="w-full bg-navy text-white py-6 text-center mt-8">
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

export default Category;