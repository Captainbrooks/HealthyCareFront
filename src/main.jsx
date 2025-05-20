import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App';
import { BrowserRouter,  Routes, Route, Navigate } from "react-router-dom";
import BookAppointment from './pages/BookAppointment';
import { AuthContextProvider } from './context/AuthContext';
import { IsDoctorContextProvider } from './context/IsDoctorContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    
    <AuthContextProvider>
      <IsDoctorContextProvider>
    <App />
    </IsDoctorContextProvider>
    </AuthContextProvider>


    </BrowserRouter>
  
  
 </StrictMode>,
)


const hardLoader = document.getElementById('startup-loader');
if (hardLoader) {
  hardLoader.parentNode.removeChild(hardLoader);
}

