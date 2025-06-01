import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const JobseekerDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [applications, setApplications] = useState([]);
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
      // Get jobseeker profile
      const { data: jobseeker } = await supabase
        .from('jobseekers')
        .select('full_name, email')
        .eq('user_id', user.id)
        .single();
      setProfile(jobseeker);
      setLoading(false);
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchApplications = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }
      // Fetch applications by this jobseeker
      const { data: apps } = await supabase
        .from('applications')
        .select('id, job_id, cover_letter, created_at, job:jobs(title, company_name)')
        .eq('user_id', user.id);

      setApplications(apps || []);
      setLoading(false);
    };
    fetchApplications();
  }, []);

  const handleLogout = () => {
    navigate('/jobseeker-signin');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 pt-16">
      {/* Header */}
      <div className="w-full bg-navy text-white py-6 shadow text-center mb-8">
        <h1 className="text-3xl font-bold">
          {profile ? `${profile.full_name}'s Dashboard` : 'Jobseeker Dashboard'}
        </h1>
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
                navigate('/jobseekerdashboard');
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
      {/* Applications Section */}
      <div className="max-w-4xl mx-auto mt-8 bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-navy">My Applications</h2>
        {applications.length === 0 ? (
          <div>No applications yet.</div>
        ) : (
          <table className="min-w-full text-left">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Job Title</th>
                <th className="py-2 px-4 border-b">Company</th>
                <th className="py-2 px-4 border-b">Cover Letter</th>
                <th className="py-2 px-4 border-b">Date Applied</th>
              </tr>
            </thead>
            <tbody>
              {applications.map(app => (
                <tr key={app.id}>
                  <td className="py-2 px-4 border-b">{app.job?.title || 'N/A'}</td>
                  <td className="py-2 px-4 border-b">{app.job?.company_name || 'N/A'}</td>
                  <td className="py-2 px-4 border-b">{app.cover_letter}</td>
                  <td className="py-2 px-4 border-b">{new Date(app.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default JobseekerDashboard;