import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jobscoutlogo from './jobscout.png';
import { supabase } from '../supabaseClient';

const CompanyRegistration = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
    company_name: '',
    contact_person: '',
    contact_number: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Register company with Supabase Auth
    const { data, error: authError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          role: 'company',
          company_name: form.company_name,
          contact_person: form.contact_person,
          contact_number: form.contact_number,
          address: form.address,
        },
      },
    });

    if (authError) {
      setLoading(false);
      if (authError.message.includes("For security purposes")) {
        alert("Please wait a moment before trying to register again.");
      } else {
        alert(authError.message);
      }
      console.error('Auth Error:', authError);
      return;
    }

    // Get the user id from the signUp response (if available)
    let userId = data.user?.id;
    if (!userId) {
      // Try to get the user id from the current session (for email confirmation flows)
      const { data: sessionData } = await supabase.auth.getSession();
      userId = sessionData?.session?.user?.id || null;
    }

    // Insert company details into companies table
    if (userId) {
      const { error: insertError } = await supabase.from('companies').insert([
        {
          user_id: userId,
          company_name: form.company_name,
          contact_person: form.contact_person,
          contact_number: form.contact_number,
          address: form.address,
          email: form.email,
        },
      ]);

      setLoading(false);

      if (insertError) {
        alert('Registration succeeded, but there was a problem saving company details.');
        console.error(insertError);
      } else {
        alert('Registration successful! Please check your email to verify your account.');
        navigate('/company-dashboard');
      }
    } else {
      setLoading(false);
      alert('Registration successful! Please check your email to verify your account.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white mt-6 p-7 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-navy text-2xl font-bold mb-6 text-center">
          Company Registration
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter company email"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter password"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="company_name"
              className="block text-gray-700 font-medium mb-2"
            >
              Company Name
            </label>
            <input
              type="text"
              id="company_name"
              name="company_name"
              value={form.company_name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter company name"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="contact_person"
              className="block text-gray-700 font-medium mb-2"
            >
              Contact Person
            </label>
            <input
              type="text"
              id="contact_person"
              name="contact_person"
              value={form.contact_person}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter contact person"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="contact_number"
              className="block text-gray-700 font-medium mb-2"
            >
              Contact Number
            </label>
            <input
              type="text"
              id="contact_number"
              name="contact_number"
              value={form.contact_number}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter contact number"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="address"
              className="block text-gray-700 font-medium mb-2"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter address"
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
            href="/company-signin"
            className="text-blue-600 hover:underline font-semibold"
          >
            Sign in here
          </a>
        </div>
      </div>
    </div>
  );
};

export default CompanyRegistration;