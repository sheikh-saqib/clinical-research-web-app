import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import EditPatient from './components/Patients/EditPatient';
import AddPatient from './components/Patients/AddPatient';
import Studies from './components/Studies/Studies';
import EditStudy from './components/Studies/EditStudy';
import AddStudy from './components/Studies/AddStudy';
import Navbar from './components/Navbar/Navbar';
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
