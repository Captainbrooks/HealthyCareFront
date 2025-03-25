import { useState } from 'react';
import { Routes, Route, Router } from 'react-router-dom';

import './App.css';
import { HomePage } from './pages/HomePage';
import BookAppointment from './pages/BookAppointment';
import  EmergencyContacts  from './pages/EmergencyContacts';
import Doctors from './pages/Doctors';
import Services from './pages/Services';
import Contact from './pages/Contact';
import PatientPortal from './pages/PatientPortal';
import FindDoctors from './pages/FindDoctors';
import Departments from './pages/Departments';
import OpeningHours from './pages/OpeningHours';
import About from './pages/About';
import EmergencyCare from './pages/EmergencyCare';
import QualifiedDoctors from './pages/QualifiedDoctors';
import Services247 from './pages/Services247';
import OutdoorCheckup from './pages/OutdoorCheckup';

function App() {
  

  return (
    <>
   
   
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/bookappointment" element={<BookAppointment />} />
        <Route path="/emergencycontacts" element={<EmergencyContacts />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/patient-portal" element={<PatientPortal />} />
        <Route path="/find-doctors" element={<FindDoctors />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/opening-hours" element={<OpeningHours />} />
        <Route path="/emergency-care" element={<EmergencyCare />} />
        <Route path="/qualified-doctors" element={<QualifiedDoctors />} />
        <Route path="/24-7-services" element={<Services247 />} />
        <Route path="/outdoor-checkup" element={<OutdoorCheckup />} />

      
      </Routes>
    
     
    </>
  );
}

export default App;
