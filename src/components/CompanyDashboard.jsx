import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const CompanyDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }
      const { data: profile, error } = await supabase
        .from('company_profile')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (!error && profile) setProfile(profile);
      setLoading(false);
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    navigate('/company-signin');
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-16">
      {/* Header */}
      <div className="w-full bg-navy text-white py-6 shadow text-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard Profile</h1>
      </div>
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
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
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
              onClick={() => {
                setMenuOpen(false);
                navigate('/post-job');
              }}
            >
              Post a Job
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
      {/* Company Profile Display */}
      <div className="max-w-2xl mx-auto mt-16 bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-navy">
          {profile ? profile.company_name : 'Company Profile'}
        </h2>
        {loading ? (
          <p>Loading...</p>
        ) : profile ? (
          <div>
            <div className="mb-4">
              <span className="font-semibold">Description:</span> {profile.about_company || 'N/A'}
            </div>
            <div className="mb-4">
              <span className="font-semibold">Location:</span> {profile.location || 'N/A'}
            </div>
            <div className="mb-4">
              <span className="font-semibold">Website:</span>{' '}
              {profile.website ? (
                <a href={profile.website} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
                  {profile.website}
                </a>
              ) : (
                'N/A'
              )}
            </div>
          </div>
        ) : (
          <p>No company profile found. <span className="text-blue-600 underline cursor-pointer" onClick={() => navigate('/company-profile')}>Create Profile</span></p>
        )}
      </div>
    </div>
  );
};

export default CompanyDashboard;