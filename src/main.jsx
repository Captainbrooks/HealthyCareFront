import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App';
import { BrowserRouter,  Routes, Route, Navigate } from "react-router-dom";
import BookAppointment from './pages/BookAppointment';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <App />

    </BrowserRouter>
  
  </StrictMode>,
)
