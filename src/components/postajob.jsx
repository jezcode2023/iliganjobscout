import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jobscoutlogo from './jobscout.png';
import { supabase } from '../supabaseClient';

const categories = [
  'Accountant/Finance',
  'Secretary',
  'Virtual Assistant',
  'Food Service',
  'Human Resource',
  'Healthcare Workers',
];

const jobTypes = [
  'Full-time',
  'Part-time',
  'Remote',
  'Contract',
  'Temporary',
  'Internship',
];

const PostJob = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    company_name: '',
    title: '',
    description: '',
    location: '',
    salary_min: '',
    salary_max: '',
    job_type: '',
    category: '',
  });
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoFile, setLogoFile] = useState(null);

  // Simulate company user role (replace with your auth logic)
  const role = 'companyuser';

  // Assume company_id is stored in localStorage after login
  const company_id = localStorage.getItem('company_id');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setLogoFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let logo_url = '';
    if (logoFile) {
      const fileExt = logoFile.name.split('.').pop();
      const fileName = `${form.company_name.replace(/\s+/g, '_')}_${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('company-logos')
        .upload(fileName, logoFile, { cacheControl: '3600', upsert: false });

      if (uploadError) {
        alert('Logo upload failed!');
        setLoading(false);
        return;
      }
      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from('company-logos')
        .getPublicUrl(fileName);
      logo_url = publicUrlData.publicUrl;
    }

    const { error } = await supabase.from('jobs').insert([
      {
        company_id,
        company_name: form.company_name,
        title: form.title,
        description: form.description,
        location: form.location,
        salary_min: form.salary_min ? parseInt(form.salary_min) : null,
        salary_max: form.salary_max ? parseInt(form.salary_max) : null,
        job_type: form.job_type,
        category: form.category,
        logo_url, // Save logo URL with the job
      },
    ]);

    setLoading(false);

    if (error) {
      alert(error.message);
    } else {
      alert('Job posted successfully!');
      navigate('/company-homepage');
    }
  };

  const handleLogout = () => {
    // Add your logout logic here
    navigate('/company-signin');
  };

  if (role !== 'companyuser') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Access denied. Company users only.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Hamburger Menu */}
      <div className="fixed top-4 right-4 z-50">
        <button
          className="flex items-center justify-center w-10 h-10 rounded-full bg-navy text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Open user menu"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
          </svg>
        </button>
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-2 z-50">
            <button
              className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
              onClick={() => {
                setMenuOpen(false);
                navigate('/company-dashboard');
              }}
            >
              Dashboard
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
      <div className="bg-white mt-20 p-7 rounded-lg shadow-md w-full max-w-lg">
        {/* ↑↑↑ changed mt-10 to mt-20 for more top margin */}
        <h2 className="text-navy text-2xl font-bold mb-6 text-center">
          Post a Job
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Company Name
            </label>
            <input
              type="text"
              name="company_name"
              value={form.company_name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter company name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Company Logo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              className="w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Job Title
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter job title"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter job description"
              rows={4}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter job location"
              required
            />
          </div>
          <div className="mb-4 flex gap-4">
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-2">
                Salary Min (₱)
              </label>
              <input
                type="number"
                name="salary_min"
                value={form.salary_min}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Min"
                min="0"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-2">
                Salary Max (₱)
              </label>
              <input
                type="number"
                name="salary_max"
                value={form.salary_max}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Max"
                min="0"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Job Type
            </label>
            <select
              name="job_type"
              value={form.job_type}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select job type</option>
              {jobTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Category
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-navy text-white px-4 py-2 rounded-md hover:bg-blue"
            disabled={loading}
          >
            {loading ? 'Posting...' : 'Post Job'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;