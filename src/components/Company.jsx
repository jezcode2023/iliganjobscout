import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const Company = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkRole = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || user.user_metadata?.role !== 'jobseeker') {
        navigate('/'); // or show an error
      }
    };
    checkRole();
  }, []);

  useEffect(() => {
    const fetchCompanies = async () => {
      // Fetch company names from jobs table
      const { data: jobsData } = await supabase
        .from('jobs')
        .select('company_name')
        .neq('company_name', null)
        .neq('company_name', '');

      // Fetch company names from company_profile table
      const { data: profileData } = await supabase
        .from('company_profile')
        .select('company_name')
        .neq('company_name', null)
        .neq('company_name', '');

      // Combine and deduplicate company names
      const jobCompanies = jobsData ? jobsData.map(c => c.company_name) : [];
      const profileCompanies = profileData ? profileData.map(c => c.company_name) : [];
      const unique = Array.from(new Set([...jobCompanies, ...profileCompanies])).sort();

      setCompanies(unique);
      setLoading(false);
    };
    fetchCompanies();
  }, []);

  const handleCompanyClick = (companyName) => {
    // Navigate to a company jobs page, passing the company name as a query param
    navigate(`/search?company=${encodeURIComponent(companyName)}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-24 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">All Companies</h1>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : companies.length === 0 ? (
        <p className="text-center">No companies found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {companies.map((company, idx) => (
            <button
              key={idx}
              className="flex items-center justify-center bg-white rounded-lg shadow-md h-40 w-40 mx-auto text-center text-lg font-medium text-navy hover:bg-blue-100 transition"
              onClick={() => handleCompanyClick(company)}
              title={`View jobs posted by ${company}`}
            >
              {company}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Company;