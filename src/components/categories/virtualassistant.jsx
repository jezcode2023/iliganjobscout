import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';

const categoryName = 'Virtual Assistant';

const VirtualAssistantJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('category', categoryName);

      if (!error) setJobs(data);
      setLoading(false);
    };
    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 pt-24 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">{categoryName} Jobs</h1>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : jobs.length === 0 ? (
        <p className="text-center">No jobs found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-2">{job.title}</h2>
              <p className="mb-2">{job.description}</p>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">Location:</span> {job.location}
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">Salary:</span>{' '}
                {job.salary_min && job.salary_max
                  ? `₱${job.salary_min} - ₱${job.salary_max}`
                  : 'Not specified'}
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">Type:</span> {job.job_type}
              </p>
              <p className="text-gray-700 text-sm mt-2">
                Posted: {new Date(job.posted_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VirtualAssistantJobs;