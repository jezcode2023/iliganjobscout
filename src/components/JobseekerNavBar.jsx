import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const JobseekerNavBar = () => {
  const [isJobseeker, setIsJobseeker] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkRole = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || user.user_metadata?.role !== 'jobseeker') {
        navigate('/'); // or show an error
      } else {
        setIsJobseeker(true);
      }
    };
    checkRole();
  }, [location.pathname]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/'); // Only logout on button click
  };

  if (!isJobseeker) return null;

  return (
    <nav className="bg-navy text-white px-6 py-3 flex items-center justify-between shadow">
      <div className="flex items-center gap-6">
        <Link to="/user-homepage" className="font-bold text-xl hover:underline">Iligan JobScout</Link>
        <Link to="/category" className="hover:underline">Categories</Link>
        <Link to="/search" className="hover:underline">Search</Link>
        <Link to="/jobseeker-dashboard" className="hover:underline">My Profile</Link>
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

export default JobseekerNavBar;