import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const Apply = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [checking, setChecking] = useState(true);
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
      {/* Hero Section with Search */}
      <section
        className="relative bg-white py-16 w-full mt-20"
        style={{
          backgroundImage:
            "url('https://readdy.ai/api/search-image?query=professional%20modern%20office%20environment%20with%20blue%20tones%2C%20clean%20workspace%2C%20business%20atmosphere%2C%20soft%20lighting%2C%20minimal%20design%2C%20workspace%20with%20computers%20and%20office%20supplies%2C%20corporate%20setting%2C%20blurred%20background%20for%20text%20overlay&width=1280&height=400&seq=1&orientation=landscape')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-primary bg-opacity-80 mt-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h1 className="text-4xl font-bold text-black mb-4">Find Your Dream Job Today</h1>
            <p className="text-xl text-black opacity-90">
              Connect with thousands of employers and opportunities
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <div className="flex bg-navy rounded-button overflow-hidden shadow-lg">
              <input
                type="text"
                placeholder="Search for jobs, companies, or keywords"
                className="search-input w-full px-6 py-4 border-none text-gray-700"
              />
              <button className="bg-primary text-white px-8 py-4 rounded-button whitespace-nowrap flex items-center">
                <span className="w-5 h-5 flex items-center justify-center mr-2">
                  <i className="ri-search-line"></i>
                </span>
                Search
              </button>
            </div>
          </div>
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