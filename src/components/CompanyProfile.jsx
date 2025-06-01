import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const CompanyProfile = () => {
  const [form, setForm] = useState({
    company_name: '',
    about_company: '',
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
    if (!user) {
      setLoading(false);
      alert('You must be logged in to update your company profile.');
      return;
    }

    // Get company info from companies table using user.id
    const { data: company, error: companyError } = await supabase
      .from('companies')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (companyError) {
      setLoading(false);
      alert('Error fetching company: ' + companyError.message);
      return;
    }

    if (!company) {
      setLoading(false);
      alert('No company record found for your account.');
      return;
    }

    // Now update or insert into company_profile using company.id as foreign key if needed
    const { data: profile, error: profileFetchError } = await supabase
      .from('company_profile')
      .select('*')
      .eq('company_id', company.id)
      .single();

    if (profileFetchError && profileFetchError.code !== 'PGRST116') {
      // PGRST116 = no rows found, which is OK for insert
      setLoading(false);
      alert('Error fetching profile: ' + profileFetchError.message);
      return;
    }

    let upsertError = null;
    if (profile) {
      // Update existing profile
      const { error } = await supabase
        .from('company_profile')
        .update({
          company_name: form.company_name,
          about_company: form.description,
          location: form.location,
          website: form.website,
        })
        .eq('company_id', company.id);
      upsertError = error;
    } else {
      // Insert new profile
      const { error } = await supabase.from('company_profile').insert([
        {
          company_id: company.id,
          company_name: form.company_name,
          about_company: form.description,
          location: form.location,
          website: form.website,
        },
      ]);
      upsertError = error;
    }

    setLoading(false);

    if (upsertError) {
      console.error(upsertError);
      alert('Failed to save company profile!\n' + upsertError.message);
    } else {
      alert('Company profile saved!');
      setForm({
        company_name: '',
        description: '',
        location: '',
        website: '',
      });
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