import './index.css'; // Import Tailwind CSS
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar'; // Import NavBar
import SignIn from './components/signin';
import JobSeekerSignIn from './components/jobseekersignin';
import Homepage from './components/Homepage';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      {/* NavBar is placed outside Routes to ensure it is always visible */}
      <NavBar />
      <Routes>
        <Route path="/" element={<SignIn />} /> {/* Default route */}
        <Route path="/jobseeker-signin" element={<JobSeekerSignIn />} />
        <Route path="/homepage" element={<Homepage />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);