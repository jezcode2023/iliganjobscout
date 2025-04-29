import './index.css'; // Import Tailwind CSS
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar'; // Import NavBar
import SignIn from './components/signin';
import JobSeekerSignIn from './components/jobseekersignin';
import CompanySignIn from './components/companysignin';
import Homepage from './components/Homepage';
import ContactUs from './components/ContactUs'; // Import ContactUs component
import Category from './components/Category'; // Import Category component

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/jobseeker-signin" element={<JobSeekerSignIn />} />
        <Route path="/company-signin" element={<CompanySignIn />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/category" element={<Category />} /> {/* Added route */}
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);