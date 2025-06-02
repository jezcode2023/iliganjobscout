import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jobscoutlogo from './jobscout.png';
import { supabase } from '../supabaseClient';

const JobSeekerRegistration = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    resume_url: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Register user with Supabase Auth
    const { data, error: authError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: { role: 'jobseeker' },
      },
    });

    if (authError) {
      setLoading(false);
      return alert(authError.message);
    }

    // Insert jobseeker details into jobseekers table
    const user = data.user;
    if (user) {
      const { error: jobseekerError } = await supabase.from('jobseekers').insert([
        {
          first_name: form.first_name,
          last_name: form.last_name,
          email: form.email,
          phone_number: form.phone_number,
          resume_url: form.resume_url,
          user_id: user.id,
        },
      ]);
      setLoading(false);

      if (jobseekerError) {
        alert(jobseekerError.message);
      } else {
        alert('Registration successful! Please check your email to verify your account.');
        navigate('/jobseeker-signin');
      }
    } else {
      setLoading(false);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 mt-10">
      
      <div className="bg-white p-7 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-navy text-2xl font-bold mb-6 text-center">
          Job Seeker Registration
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="first_name" className="block text-gray-700 font-medium mb-2">
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your first name"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="last_name" className="block text-gray-700 font-medium mb-2">
              Last Name
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your last name"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone_number" className="block text-gray-700 font-medium mb-2">
              Phone Number
            </label>
            <input
              type="text"
              id="phone_number"
              name="phone_number"
              value={form.phone_number}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your phone number"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="resume_url" className="block text-gray-700 font-medium mb-2">
              Resume URL
            </label>
            <input
              type="text"
              id="resume_url"
              name="resume_url"
              value={form.resume_url}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Paste your resume link (Google Drive, Dropbox, etc.)"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-navy text-white px-4 py-2 rounded-md hover:bg-blue"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <div className="mt-6 text-center">
          <span className="text-gray-700">Already have an account? </span>
          <a
            href="/jobseeker-signin"
            className="text-blue-600 hover:underline font-semibold"
          >
            Sign in here
          </a>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerRegistration;