import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const allowedCategories = [
  'Accountant/Finance',
  'Secretary',
  'Virtual Assistant',
  'Food Service',
  'Human Resource',
  'Healthcare Workers',
  'Sales and Marketing',
];

const Category = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

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

  useEffect(() => {
    const checkRole = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || user.user_metadata?.role !== 'jobseeker') {
        navigate('/'); // or show an error
      }
    };
    checkRole();
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/search?category=${encodeURIComponent(category)}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col pt-20">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6 text-center">Job Categories</h1>

      {/* Categories Grid */}
      <div className="flex-1 flex flex-col items-center">
        <div className="grid grid-cols-2 gap-4 w-full max-w-4xl px-4">
          {categories.map((category, index) => (
            <div key={index} className="mb-2">
              <button
                onClick={() => handleCategoryClick(category)}
                className="text-lg text-blue-600 hover:underline cursor-pointer block w-full text-left"
              >
                {category}
              </button>
            </div>
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