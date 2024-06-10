import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Patients from './components/Patients/Patients';
import EditPatient from './components/Patients/EditPatient';
import AddPatient from './components/Patients/AddPatient';
import Studies from './components/Studies/Studies';
import EditStudy from './components/Studies/EditStudy';
import AddStudy from './components/Studies/AddStudy';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './components/Dashboard/Dashboard';
import ErrorPage from './components/ErrorPage/ErrorPage';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/edit/:id" element={<EditPatient />} />
          <Route path="/add-patient" element={<AddPatient />} />
          <Route path="/studies" element={<Studies />} />
          <Route path="/edit-study/:studyId" element={<EditStudy />} />
          <Route path="/add-study" element={<AddStudy />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
