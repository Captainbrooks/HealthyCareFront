import { useEffect, useState } from 'react';
import { Routes, Route, Router } from 'react-router-dom';

import './App.css';
import { HomePage } from './pages/HomePage';
import BookAppointment from './pages/BookAppointment';
import EmergencyContacts from './pages/EmergencyContacts';
import toast, { Toaster } from 'react-hot-toast';


import Services from './pages/Services';
import Contact from './pages/Contact';
import PatientPortal from './pages/PatientPortal';
import FindDoctors from './pages/FindDoctors';
import Departments from './pages/Departments';
import OpeningHours from './pages/OpeningHours';
import EmergencyCare from './pages/EmergencyCare';
import QualifiedDoctors from './pages/QualifiedDoctors';
import Services247 from './pages/Services247';
import OutdoorCheckup from './pages/OutdoorCheckup';
import DoctorProfile from './pages/DoctorProfile';
import ScrollToTop from './components/ScrollTop';
import Login from './components/Login';
import Register from './components/Register';
import BookSpecificDoctor from './components/BookSpecificDoctor';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import VerifyEmail from './pages/VerifyEmail';
import DashboardLayout from './dashboard/DashboardLayout';
import DashboardHome from './dashboard/DashboardHome';
import AppointmentsPage from './dashboard/AppointmentsPage';
import TestResultsPage from './dashboard/TestResults';
import AvailabilityPage from './dashboard/AvailabilityPage';
import PatientHistory from './dashboard/PatientHistory';
import { useAuthContext } from './hooks/useAuthContext';
import { Navigate } from 'react-router-dom';
import Unauthorized from './pages/Unauthorized';
import NotFound from './pages/NotFound';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import { Loader } from 'lucide-react';
import ProtectedDoctorRoute from './components/ProtectedDoctorRoute';
import PatientTest from './pages/PatientTest';
import PatientHealth from './pages/PatientHealth';



function App() {






  const { user} = useAuthContext();






  const access_token = localStorage.getItem('access_token')


  return (
    <>
    


<Toaster />
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/bookappointment" element={access_token ? <BookAppointment /> : <Navigate to="/login" />} />
        <Route path="/emergencycontacts" element={<EmergencyContacts />} />

        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path='/login' element={<Login />} />


        <Route path="/patient-portal" element={

          access_token ?



            <PatientPortal />

            :

            <Navigate to="/login" />



        } />
        <Route path="/register" element={<Register />} />
        <Route path="/find-doctors" element={<FindDoctors />} />
        <Route path="/departments" element={<Departments />} />

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
        <Route path='/unauthorized' element={<Unauthorized />} />
        <Route path='/test-results/:patientId' element={<PatientTest />} />
        <Route path='/health-records/:patientId' element={<PatientHealth />} />

        {/*Doctor Dashboard */}
        <Route
          path="/dashboard"
          element={

              <ProtectedDoctorRoute>
                 <DashboardLayout />
              </ProtectedDoctorRoute>
             
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="appointments" element={<AppointmentsPage />} />
          <Route path="test-results" element={<TestResultsPage />} />
          <Route path="availability" element={<AvailabilityPage />} />
        </Route>

        <Route path="/patient/:patientId" element={
        <ProtectedDoctorRoute>
          <PatientHistory />  
          </ProtectedDoctorRoute>
          
          } />
       
      
  
        {/*Doctor Dashboard */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
    
  );
}

export default App;
