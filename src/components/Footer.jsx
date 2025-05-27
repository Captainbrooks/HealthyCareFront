import React from 'react'
import {
    Calendar,
    Phone,
    Clock,
    Users,
    Building2,
    ChevronRight,
    Menu,
    X,
  } from "lucide-react";

  import { Link } from 'react-router-dom';

 function Footer() {
  return (
    <>
    <div className="bg-blue-600 text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <Phone className="w-8 h-8 mr-4" />
          <div>
            <p className="text-sm">Emergency Contact</p>
            <p className="text-2xl font-bold">1-800-HealthyCare</p>
          </div>
        </div>
       <Link to="/contact"> <button className="bg-white text-blue-600 px-6 py-3 rounded-md hover:bg-gray-100">
          Contact Now
        </button>
        </Link>
      </div>
    </div>
  </div>
  <footer className="bg-gray-800 text-gray-300">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-white text-lg font-bold mb-4">HealthyCare</h3>
          <p className="text-sm">
            Providing quality healthcare services for over 20 years.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-white">
               Home
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-white">
                Services
              </Link>
            </li>
            <li>
              <Link to="/find-doctors" className="hover:text-white">
                Doctors
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Services</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/emergency-care" className="hover:text-white">
                Emergency Care
              </Link>
            </li>
            <li>
              <Link to="/qualified-doctors" className="hover:text-white">
                Qualified Doctors
              </Link>
            </li>
            <li>
              <Link to="/outdoor-checkup" className="hover:text-white">
                Outdoor Checkup
              </Link>
            </li>
            <li>
              <Link to="/24-7-services" className="hover:text-white">
                24/7 Services
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Contact Info</h4>
          <ul className="space-y-2">
            <li>123 Medical Center Drive</li>
            <li>contact@medicare.com</li>
            <li>+1 234 567 8900</li>
          </ul>
        </div>
      </div>
    </div>
    <div className="border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <p className="text-center text-sm">
          © 2025 HealthyCare. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
  </>

              
  )
}


export default Footer;
