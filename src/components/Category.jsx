import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const slugMap = {
  'Accountant/Finance': 'accountant',
  'Secretary': 'secretary',
  'Virtual Assistant': 'virtualassistant',
  'Food Service': 'foodservice',
  'Human Resource': 'humanresource',
  'Healthcare Workers': 'healthcare',
};

const allowedCategories = [
  'Accountant/Finance',
  'Secretary',
  'Virtual Assistant',
  'Food Service',
  'Human Resource',
  'Healthcare Workers',
];

const Category = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('name')
        .in('name', allowedCategories);

      if (!error && data) {
        setCategories(data.map((cat) => cat.name));
      } else {
        setCategories(allowedCategories); // fallback if error
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col pt-20">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6 text-center">Job Categories</h1>

      {/* Categories Grid */}
      <div className="flex-1 flex flex-col items-center">
        <div className="grid grid-cols-2 gap-4 w-full max-w-4xl px-4">
          {categories.map((category, index) => (
            <a
              key={index}
              href={`/categories/${slugMap[category]}`}
              className="text-lg text-blue-600 hover:underline cursor-pointer block"
            >
              {category}
            </a>
          ))}
        </div>
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