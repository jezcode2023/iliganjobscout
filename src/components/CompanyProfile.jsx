import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const CompanyProfile = () => {
  const [form, setForm] = useState({
    company_name: '',
    description: '',
    location: '',
    website: '',
  });
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Get the current logged-in user
    const { data: { user } } = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from('company_profile')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (data) {
      // Update existing profile
      await supabase
        .from('company_profile')
        .update({
          company_name: form.company_name,
          about_company: form.description,
          location: form.location,
          website: form.website,
        })
        .eq('user_id', user.id);
    } else {
      // Insert new profile
      await supabase.from('company_profile').insert([
        {
          user_id: user.id, // This must match the logged-in user's id
          company_name: form.company_name,
          about_company: form.description,
          location: form.location,
          website: form.website,
        },
      ]);
    }

    setLoading(false);

    if (error) {
      console.error(error);
      alert('Failed to save company profile!');
    } else {
      alert('Company profile saved!');
      setForm({
        company_name: '',
        description: '',
        location: '',
        website: '',
      });
      // Redirect to dashboard after saving
      navigate('/company-dashboard');
    }
  };

  const handleLogout = () => {
    // Add your logout logic here
    navigate('/company-signin');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-24">
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
      {/* Profile Form */}
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-xl mt-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Company Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-medium mb-2">Company Name</label>
            <input
              type="text"
              name="company_name"
              value={form.company_name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
              rows={3}
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-2">Website</label>
            <input
              type="text"
              name="website"
              value={form.website}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-navy text-white py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompanyProfile;