import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const JobseekerProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    contact_number: '',
    location: '',
    skills: '',
    about_me: '',
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchJobseeker = async () => {
      // Get logged-in user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }
      // Fetch jobseeker info from your jobseekers table
      const { data: jobseeker } = await supabase
        .from('jobseekers')
        .select('*')
        .eq('user_id', user.id)
        .single();
      setProfile(jobseeker);
      if (jobseeker) {
        setForm({
          full_name: jobseeker.full_name || '',
          email: jobseeker.email || '',
          contact_number: jobseeker.contact_number || '',
          location: jobseeker.location || '',
          skills: jobseeker.skills || '',
          about_me: jobseeker.about_me || '',
        });
      }
      setLoading(false);
    };
    fetchJobseeker();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setLoading(false);
      alert('You must be logged in.');
      return;
    }

    if (profile) {
      // Update existing profile
      const { error } = await supabase
        .from('jobseekers')
        .update({
          full_name: form.full_name,
          email: form.email,
          contact_number: form.contact_number,
          location: form.location,
          skills: form.skills,
          about_me: form.about_me,
        })
        .eq('user_id', user.id);
      if (error) {
        alert('Failed to update profile: ' + error.message);
      } else {
        alert('Profile updated!');
        setEditing(false);
        setProfile({ ...profile, ...form });
      }
    } else {
      // Create new profile
      const { error } = await supabase.from('jobseekers').insert([
        {
          user_id: user.id,
          full_name: form.full_name,
          email: form.email,
          contact_number: form.contact_number,
          location: form.location,
          skills: form.skills,
          about_me: form.about_me,
        },
      ]);
      if (error) {
        alert('Failed to create profile: ' + error.message);
      } else {
        alert('Profile created!');
        setEditing(false);
        setProfile({ ...form, user_id: user.id });
      }
    }
    setLoading(false);
  };

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white shadow rounded p-8 mt-40">
      <h2 className="text-2xl font-bold mb-4">Jobseeker Profile</h2>
      {profile && !editing ? (
        <>
          <p className="mb-2"><strong>Name:</strong> {profile.full_name}</p>
          <p className="mb-2"><strong>Email:</strong> {profile.email}</p>
          <p className="mb-2"><strong>Contact:</strong> {profile.contact_number}</p>
          <p className="mb-2"><strong>Location:</strong> {profile.location}</p>
          <p className="mb-2"><strong>Skills:</strong> {profile.skills}</p>
          <p className="mb-2"><strong>About Me:</strong> {profile.about_me}</p>
          <button
            className="mt-4 bg-navy text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => setEditing(true)}
          >
            Edit Profile
          </button>
        </>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="full_name"
              value={form.full_name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Contact Number</label>
            <input
              type="text"
              name="contact_number"
              value={form.contact_number}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Skills</label>
            <input
              type="text"
              name="skills"
              value={form.skills}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">About Me</label>
            <textarea
              name="about_me"
              value={form.about_me}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
              rows={3}
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-navy text-white px-4 py-2 rounded hover:bg-blue-700"
              disabled={loading}
            >
              {profile ? 'Update Profile' : 'Create Profile'}
            </button>
            {profile && (
              <button
                type="button"
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default JobseekerProfile;