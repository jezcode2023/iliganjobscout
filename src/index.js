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
import UserHomepage from './components/UserHomepage'; // Import UserHomepage component
import Company from './components/Company';
import JobSeekerRegistration from './components/jobseekerreg';
import CompanyRegistration from './components/companyreg'; // Import CompanyRegistration component
import CompanyHomepage from './components/CompanyHomepage';
import PostJob from './components/postajob';
import SearchResults from './components/SearchResults';
import CompanyProfile from './components/CompanyProfile';
import CompanyDashboard from './components/CompanyDashboard'; // Import CompanyDashboard
import Apply from './components/Apply'; // Import Apply component
import ApplicationForm from './components/applicationform';
import JobseekerNavBar from './components/JobseekerNavBar';
import CompanyNavBar from './components/CompanyNavBar';

// Import category job pages
import AccountantJobs from './components/categories/accountant';
import SecretaryJobs from './components/categories/secretary';
import VirtualAssistantJobs from './components/categories/virtualassistant';
import FoodServiceJobs from './components/categories/foodservice';
import HumanResourceJobs from './components/categories/humanresource';
import HealthcareJobs from './components/categories/healthcare';
import JobseekerDashboard from './components/JobseekerDashboard';


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <NavBar /> {/* Place NavBar here, outside Routes */}
      <Homepage />
      
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/jobseeker-signin" element={<JobSeekerSignIn />} />
        <Route path="/jobseeker-registration" element={<JobSeekerRegistration />} />
        <Route path="/company-signin" element={<CompanySignIn />} />
        <Route path="/company-homepage" element={<CompanyHomepage />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/company-registration" element={<CompanyRegistration />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/category" element={<Category />} />
        <Route path="/company" element={<Company />} />
        <Route path="/user-homepage" element={<UserHomepage />} />
        <Route path="/company-profile" element={<CompanyProfile />} />
        <Route path="/company-dashboard" element={
          <>
            <CompanyNavBar />
            <CompanyDashboard />
          </>
        } />
        <Route path="/apply/:jobId" element={<Apply />} />
        <Route path="/application-form/:jobId" element={<ApplicationForm />} />
        <Route path="/jobseeker-dashboard" element={<JobseekerDashboard />} />
        <Route path="/jobseeker-navbar" element={<JobseekerNavBar />} />
        <Route path="/categories/accountant" element={<AccountantJobs />} />
        <Route path="/categories/secretary" element={<SecretaryJobs />} />
        <Route path="/categories/virtualassistant" element={<VirtualAssistantJobs />} />
        <Route path="/categories/foodservice" element={<FoodServiceJobs />} />
        <Route path="/categories/humanresource" element={<HumanResourceJobs />} />
        <Route path="/categories/healthcare" element={<HealthcareJobs />} />
        <Route path="/search" element={<SearchResults />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);