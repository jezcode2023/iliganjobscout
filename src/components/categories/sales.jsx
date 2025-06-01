import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';

const categoryName = 'Sales';

const SalesJobs = () => {
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
                Posted: {job.posted_at ? new Date(job.posted_at).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const SalesCategory = () => {
  return (
    <div className="category-details p-8 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-3xl font-bold text-navy mb-4">SALES</h2>
      <p className="mb-4 text-gray-700">
        Sales professionals are responsible for selling products or services, building relationships with clients, and achieving sales targets. They play a key role in driving business growth and customer satisfaction.
      </p>
      <h3 className="text-xl font-semibold text-navy mb-2">Common Sales Roles:</h3>
      <ul className="list-disc list-inside mb-4 text-gray-700">
        <li>Sales Representative</li>
        <li>Account Executive</li>
        <li>Sales Associate</li>
        <li>Business Development Officer</li>
        <li>Sales Manager</li>
        <li>Retail Salesperson</li>
      </ul>
      <h3 className="text-xl font-semibold text-navy mb-2">Key Skills:</h3>
      <ul className="list-disc list-inside mb-4 text-gray-700">
        <li>Communication and negotiation</li>
        <li>Customer relationship management</li>
        <li>Persuasion and closing skills</li>
        <li>Product knowledge</li>
        <li>Goal-oriented mindset</li>
        <li>Time management</li>
      </ul>
      <h3 className="text-xl font-semibold text-navy mb-2">Typical Employers:</h3>
      <ul className="list-disc list-inside text-gray-700">
        <li>Retail companies</li>
        <li>Wholesale distributors</li>
        <li>Manufacturing firms</li>
        <li>Service providers</li>
        <li>Real estate agencies</li>
        <li>Pharmaceutical companies</li>
      </ul>
    </div>
  );
};

export default SalesJobs;