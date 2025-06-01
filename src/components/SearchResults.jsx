import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResults = () => {
  const query = useQuery().get('query') || '';
  const company = useQuery().get('company') || '';
  const category = useQuery().get('category') || '';
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      setSearching(true);
      let jobsQuery = supabase.from('jobs').select('*');

      if (category) {
        jobsQuery = jobsQuery.eq('category', category);
      } else if (company) {
        jobsQuery = jobsQuery.eq('company_name', company);
      } else if (query) {
        jobsQuery = jobsQuery.or(
          `title.ilike.%${query}%,description.ilike.%${query}%,location.ilike.%${query}%`
        );
      }

      const { data, error } = await jobsQuery;
      if (!error) setSearchResults(data || []);
      setSearching(false);
    };
    fetchResults();
  }, [query, company, category]);

  return (
    <div className="container mx-auto px-4 mt-24">
      <h2 className="text-xl font-bold mb-4">
        {company
          ? `Jobs at "${company}"`
          : category
          ? `Jobs in "${category}"`
          : `Search Results for "${query}"`}
      </h2>
      {searching ? (
        <p>Searching...</p>
      ) : searchResults.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchResults.map((job) => (
            <div key={job.id} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-2">{job.title}</h2>
              <p className="mb-2">{job.description}</p>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">Company:</span> {job.company_name}
              </p>
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
              <button
                className="mt-4 w-full bg-navy text-white py-2 rounded-md hover:bg-blue-700 transition"
                onClick={() => navigate(`/apply/${job.id}`)}
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;