import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JobseekerNavBar from "./JobseekerNavBar";
import { supabase } from "../supabaseClient";

const ApplicationForm = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [fbOrEmail, setFbOrEmail] = useState("");
  const [checking, setChecking] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);

  // Only allow jobseekers
  useEffect(() => {
    const checkRole = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || user.user_metadata?.role !== "jobseeker") {
        setUnauthorized(true);
      }
      setChecking(false);
    };
    checkRole();
  }, []);

  // Fetch job info for display
  useEffect(() => {
    const fetchJob = async () => {
      const { data, error } = await supabase
        .from("jobs")
        .select("title, company_name, location, company_email")
        .eq("id", jobId)
        .single();
      if (!error && data) setJob(data);
    };
    fetchJob();
  }, [jobId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!job?.company_email) {
      alert("No company email found for this job.");
      return;
    }

    // Get the current logged-in user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      alert("You must be logged in to apply.");
      return;
    }

    // Store the application in the 'applications' table
    const { error } = await supabase.from('applications').insert([
      {
        job_id: jobId,
        user_id: user.id,
        cover_letter: message,
        subject: subject,
        contact_info: fbOrEmail,
        applied_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      alert("Failed to submit application. " + error.message);
      console.error(error);
      return;
    }

    // Send email as before
    const mailSubject = subject || `Job Application for ${job.title}`;
    const mailBody =
      `Dear ${job.company_name},%0D%0A%0D%0A` +
      `${message}%0D%0A%0D%0A` +
      `Facebook Profile URL or Email:%0D%0A${fbOrEmail}%0D%0A%0D%0AThank you!`;
    window.location.href = `mailto:${job.company_email}?subject=${encodeURIComponent(mailSubject)}&body=${mailBody}`;

    // Optionally, show a success message or redirect
    // alert("Application submitted!");
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-20">
        <div className="text-lg text-gray-600">Checking access...</div>
      </div>
    );
  }

  if (unauthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-20">
        <div className="text-lg text-red-600">Access denied. Job seekers only.</div>
      </div>
    );
  }

  return (
    <>
      <JobseekerNavBar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 pt-10">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full">
          <h2 className="text-2xl font-bold mb-2 text-navy text-center">
            Apply for {job ? job.title : "Job"}
          </h2>
          {job && (
            <div className="text-center mb-6 text-gray-700">
              <div className="font-semibold">{job.company_name}</div>
              <div className="text-sm">{job.location}</div>
              <div className="text-blue-700 font-semibold mt-2">
                Job Title: {job.title}
              </div>
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
            <input
              type="text"
              placeholder="Enter subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full p-3 bg-gray-100 text-black rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <textarea
              placeholder="Enter your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 h-32 bg-gray-100 text-black rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              placeholder="Facebook Profile URL or Email"
              value={fbOrEmail}
              onChange={(e) => setFbOrEmail(e.target.value)}
              className="w-full p-3 bg-gray-100 text-black rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="w-full bg-navy text-white font-bold py-3 rounded-md border border-gray-400 hover:bg-blue-700 transition duration-300"
            >
              Send Application via Email
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ApplicationForm;