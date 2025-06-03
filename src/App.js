import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import JobseekerNavBar from './components/JobseekerNavBar';
import CompanyNavBar from './components/CompanyNavBar'; // If you have one
import SignIn from './components/signin';
import JobSeekerSignIn from './components/jobseekersignin';
import CompanySignIn from './components/companysignin';
import Homepage from './components/Homepage';
import UserHomepage from './components/UserHomepage';
import Apply from './components/Apply';
import JobseekerProtectedRoute from './components/JobseekerProtectedRoute';
import CompanyHomepage from './components/CompanyHomepage';
// import CompanyHomepage from './components/CompanyHomepage'; // If you have one

function App() {
  const [userRole, setUserRole] = useState(() => localStorage.getItem('userRole'));

  useEffect(() => {
    if (userRole) {
      localStorage.setItem('userRole', userRole);
    } else {
      localStorage.removeItem('userRole');
    }
  }, [userRole]);

  return (
    <Router>
      {/* Public NavBar for public pages only */}
       
      {/* Render NavBar only on public routes, not on jobseeker/company pages */}
      {/* You can use a layout or check location.pathname if you want more control */}

      <Routes>
        {/* -------- PUBLIC ROUTES -------- */}
        <Route path="/homepage" element={<><NavBar userRole={userRole} /><Homepage /></>} />
        <Route path="/signin" element={<><NavBar userRole={userRole} /><SignIn setUserRole={setUserRole} /></>} />
        <Route path="/jobseeker-signin" element={<><NavBar userRole={userRole} /><JobSeekerSignIn setUserRole={setUserRole} /></>} />
        <Route path="/company-signin" element={<><NavBar userRole={userRole} /><CompanySignIn setUserRole={setUserRole} /></>} />

        {/* -------- JOBSEEKER ROUTES -------- */}
        <Route path="/user-homepage" element={<><JobseekerNavBar /><UserHomepage /></>} />
        <Route path="/apply/:jobId" element={<><JobseekerNavBar /><Apply /></>} />
        <Route path="/user-homepage" element={
      <JobseekerProtectedRoute>
        <UserHomepage />
      </JobseekerProtectedRoute>
    }
  />

        {/* -------- COMPANY ROUTES -------- */}
        <Route path="/company-homepage" element={<><CompanyNavBar /><CompanyHomepage /></>} />
        <Route path="/company-dashboard" element={<><CompanyNavBar /><CompanyHomepage /></>} />
        {/* Example: Uncomment and use if you have company-specific pages */}
        {/* <Route path="/company-homepage" element={<><CompanyNavBar /><CompanyHomepage /></>} /> */}

        {/* -------- DEFAULT ROUTE -------- */}
        <Route path="*" element={<><NavBar userRole={userRole} /><Homepage /></>} />
      </Routes>
    </Router>
  );
}

export default App;