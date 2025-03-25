import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import Health from '../assets/Health.png'

import {

    Menu,
    X,
  } from "lucide-react";

function Header() {
      const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div>
            <nav className="bg-white  mb-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-blue-600 text-xl font-bold">HealthyCare</span>
              <img
              src="https://cdn-icons-png.flaticon.com/512/2966/2966327.png"
              alt=""
              className="ml-2 w-10 h-10"
            />
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-600 hover:text-blue-600">
                Home
              </Link>
              <Link to="/doctors" className="text-gray-600 hover:text-blue-600">
                Doctors
              </Link>
              <Link
                to="/services"
                className="text-gray-600 hover:text-blue-600"
              >
                Services
              </Link>
              <Link to="/contact" className="text-gray-600 hover:text-blue-600">
                Contact
              </Link>
            <Link to="/patient-portal">  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Patient Portal
              </button></Link>
            </div>
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/" className="block px-3 py-2 text-gray-600">
                Home
              </Link>
              <Link to="/doctors" className="block px-3 py-2 text-gray-600">
                Doctors
              </Link>
              <Link to="/services" className="block px-3 py-2 text-gray-600">
                Services
              </Link>
              <Link to="/contact" className="block px-3 py-2 text-gray-600">
                Contact
              </Link>
             <Link to="/patient-portal"><button className="w-full text-left px-3 py-2 text-blue-600">
                Patient Portal
              </button>
              </Link> 
            </div>
          </div>
        )}
      </nav>
    </div>
  )
}

export default Header
