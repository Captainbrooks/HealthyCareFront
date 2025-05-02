import { useEffect, useState } from 'react';
import { Routes, Route, Router } from 'react-router-dom';

import './App.css';
import { HomePage } from './pages/HomePage';
import BookAppointment from './pages/BookAppointment';
import EmergencyContacts from './pages/EmergencyContacts';

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
import DoctorProfile from './pages/DoctorProfile';
import ScrollToTop from './components/ScrollTop';
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from './components/PrivateRoute';
import BookSpecificDoctor from './components/BookSpecificDoctor';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import VerifyEmail from './pages/VerifyEmail';



function App() {





  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/bookappointment" element={<BookAppointment />} />
        <Route path="/emergencycontacts" element={<EmergencyContacts />} />

        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path='/login' element={<Login />} />


        <Route path="/patient-portal" element={
          <PrivateRoute>
            <PatientPortal />
          </PrivateRoute>


        } />
        <Route path="/register" element={<Register />} />
        <Route path="/find-doctors" element={<FindDoctors />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/about" element={<About />} />

        <Route path="/opening-hours" element={<OpeningHours />} />
        <Route path="/emergency-care" element={<EmergencyCare />} />
        <Route path="/qualified-doctors" element={<QualifiedDoctors />} />
        <Route path="/24-7-services" element={<Services247 />} />
        <Route path="/outdoor-checkup" element={<OutdoorCheckup />} />
        <Route path="/doctor/:doctor_name" element={<DoctorProfile />} />
        <Route path='bookappointment/:department/:doctorName' element={<BookSpecificDoctor />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password/:token' element={<ResetPassword />} />
        <Route path='/verify-email/:email' element={<VerifyEmail />} />
      </Routes>
    </>
  );
}

export default App;
