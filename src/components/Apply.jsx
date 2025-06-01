import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const Apply = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [checking, setChecking] = useState(true);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  // Fetch job info
  useEffect(() => {
    const fetchJob = async () => {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', jobId)
        .single();
      if (!error && data) setJob(data);
      setChecking(false);
    };
    fetchJob();
  }, [jobId]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?query=${encodeURIComponent(search)}`);
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
        <div className="text-lg text-white">Loading job information...</div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
        <div className="text-lg text-gray-600">Job not found.</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section with Search (copied from Homepage, no background image) */}
      <section className="py-16 w-full mt-20 bg-navy">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h1 className="text-4xl font-bold text-whites mb-4">
              Find Your Dream Job Today
            </h1>
            <p className="text-xl text-white opacity-90">
              Connect with thousands of employers and opportunities
            </p>
          </div>
          <form className="max-w-2xl mx-auto" onSubmit={handleSearch}>
            <div className="flex bg-gray rounded-lg overflow-hidden shadow-lg">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for jobs, companies, or keywords"
                className="w-full px-6 py-4 border-none text-gray-700"
              />
              <button
                type="submit"
                className="bg-black text-white px-8 py-4 whitespace-nowrap flex items-center"
              >
                <span className="w-5 h-5 flex items-center justify-center mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </span>
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Job Details Section */}
      <section className="py-16 bg-whites min-h-screen">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-whites rounded-lg shadow-lg p-8">
            <div className="mb-8">
              <div className="flex items-center gap-6 mb-6">
                <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">
                    {job.company_name ? job.company_name.substring(0, 2).toUpperCase() : "JC"}
                  </span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
                  <p className="text-lg text-gray-600">{job.company_name}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <i className="ri-map-pin-line"></i> {job.location}
                </span>
                {job.job_type && (
                  <span className="flex items-center gap-1">
                    <i className="ri-time-line"></i> {job.job_type}
                  </span>
                )}
                {(job.salary_min || job.salary_max) && (
                  <span className="flex items-center gap-1">
                    <i className="ri-money-dollar-circle-line"></i>
                    {job.salary_min && job.salary_max
                      ? `₱${job.salary_min} - ₱${job.salary_max}`
                      : job.salary_min
                      ? `₱${job.salary_min}`
                      : job.salary_max
                      ? `₱${job.salary_max}`
                      : ""}
                  </span>
                )}
              </div>
            </div>
            <div className="space-y-8">
              {job.company_overview && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Company Overview</h2>
                  <p className="text-gray-600 leading-relaxed">{job.company_overview}</p>
                </div>
              )}
              {job.description && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Description</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">{job.description}</p>
                </div>
              )}
              {job.responsibilities && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Responsibilities:</h2>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    {job.responsibilities.split('\n').map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              {job.qualifications && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Qualifications:</h2>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    {job.qualifications.split('\n').map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="mt-10">
              {job.job_url ? (
                <a
                  href={job.job_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-navy text-white py-4 rounded-button text-lg font-semibold hover:bg-opacity-90 transition-all whitespace-nowrap inline-block text-center"
                >
                  Apply Now
                </a>
              ) : (
                <button
                  className="w-full bg-navy text-white py-4 rounded-button text-lg font-semibold hover:bg-opacity-90 transition-all whitespace-nowrap inline-block text-center"
                  onClick={() => navigate(`/application-form/${job.id}`)}
                >
                  Apply with Iligan JobScout
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Apply;