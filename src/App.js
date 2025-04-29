import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './components/signin';
import JobSeekerSignIn from './components/jobseekersignin';
import CompanySignIn from './components/companysignin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/jobseeker-signin" element={<JobSeekerSignIn />} />
        <Route path="/company-signin" element={<CompanySignIn />} />
      </Routes>
    </Router>
  );
}

export default App;
