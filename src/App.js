import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import SignIn from './components/signin';
import JobSeekerSignIn from './components/jobseekersignin';
import CompanySignIn from './components/companysignin';
import Homepage from './components/Homepage';
import UserHomepage from './components/UserHomepage';

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
      <NavBar userRole={userRole} />
      <Routes>
        {/* Default route goes to Homepage */}
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/signin" element={<SignIn setUserRole={setUserRole} />} />
        <Route path="/jobseeker-signin" element={<JobSeekerSignIn setUserRole={setUserRole} />} />
        <Route path="/company-signin" element={<CompanySignIn setUserRole={setUserRole} />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/user-homepage" element={<UserHomepage />} />
      </Routes>
    </Router>
  );
}

export default App;