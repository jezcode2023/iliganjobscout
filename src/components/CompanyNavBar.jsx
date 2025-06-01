import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const CompanyNavBar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/company-signin');
  };

  return (
    <nav className="bg-navy text-white px-6 py-4 flex items-center justify-between shadow">
      <div className="flex items-center space-x-8">
        <Link to="/company-dashboard" className="font-bold text-xl hover:underline">
          Iligan JobScout
        </Link>
        <Link to="/company-dashboard" className="hover:underline">
          Dashboard
        </Link>
        <Link to="/company-jobs" className="hover:underline">
          My Jobs
        </Link>
        <Link to="/company-applications" className="hover:underline">
          Applications
        </Link>
        <Link to="/company-messages" className="hover:underline">
          Messages
        </Link>
      </div>
      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white font-semibold"
      >
        Logout
      </button>
    </nav>
  );
};

export default CompanyNavBar;