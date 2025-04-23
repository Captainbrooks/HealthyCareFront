import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

import {

  Menu,
  X,
  Bell,
  User,
  LogOut
} from "lucide-react";

function Header() {
  const [user, setUser] = useState('')
  const navigate=useNavigate()
  const location = useLocation()


  useEffect(() => {
    const accessToken = localStorage.getItem('access_token')

    try {
      if(accessToken){
        const decoded=jwtDecode(accessToken)
        setUser(decoded.username)
        return
      }
    } catch (error) {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
    }

   
   

  });



  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPatientPortal, setIsPatientPortal] = useState(false)

  useEffect(() => {


    if (location.pathname === "/patient-portal") {
      setIsPatientPortal(true)
      return
    } else {
      setIsPatientPortal(false)
    }
  }, [location.pathname])


  return (
    <div>
      <nav className="bg-white  mb-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <Link to="/">   <div className="flex items-center">
              <span className="text-blue-600 text-xl font-bold">HealthyCare</span>
              <img
                src="https://cdn-icons-png.flaticon.com/512/2966/2966327.png"
                alt=""
                className="ml-2 w-10 h-10"
              />
            </div>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-600 hover:text-blue-600">
                Home
              </Link>
              <Link to="/find-doctors" className="text-gray-600 hover:text-blue-600">
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
              {!isPatientPortal ? (<Link to="/patient-portal">  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Patient Portal
              </button></Link>)
                :
                (<div className="flex items-center space-x-4">
                  <div className="border-l h-6 border-gray-200 mx-2"></div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 hidden md:inline-block">
                      {user ? user : ""}
                    </span>
                  </div>
                  <button onClick={() => {
                    localStorage.removeItem("access_token");
                    localStorage.removeItem("refresh_token");
                    window.location.href = "/login";
                  }} className="ml-2 px-4 py-2 text-white  bg-red-400 hover:bg-red-600 hover:text-white rounded-2xl flex items-center transition-colors">
                    <LogOut className="h-4 w-4 mr-2" />

                    Logout
                  </button>
                </div>)




              }
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
              {isPatientPortal ? (<div className="flex items-center space-x-4">
                <button className="p-2 rounded-full hover:bg-gray-100 relative">
                  <Bell className="h-5 w-5 text-gray-500" />
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                </button>
                <div className="border-l h-6 border-gray-200 mx-2"></div>
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 hidden md:inline-block">
                    {user ? user : "" }
                  </span>
                </div>
                <button className="ml-2 px-4 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 flex items-center transition-colors">
                  <LogOut className="h-4 w-4 mr-2" />
                  <span>Logout</span>
                </button>
              </div>) : (<Link to="/patient-portal"><button className="w-full text-left px-3 py-2 text-blue-600">
                Patient Portal
              </button>
              </Link>
              )
              }
            </div>
          </div>
        )}
      </nav>
    </div>
  )
}

export default Header
