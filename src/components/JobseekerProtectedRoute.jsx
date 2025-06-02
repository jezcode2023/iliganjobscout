import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const JobseekerProtectedRoute = ({ children }) => {
  const [checking, setChecking] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkRole = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user && user.user_metadata?.role === 'jobseeker') {
        setAuthorized(true);
      }
      setChecking(false);
    };
    checkRole();
  }, []);

  if (checking) return <div>Loading...</div>;
  if (!authorized) return <Navigate to="/signin" replace />;
  return children;
};

export default JobseekerProtectedRoute;