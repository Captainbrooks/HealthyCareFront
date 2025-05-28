import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { User, LogOut, Bell, Menu, X } from "lucide-react";
import Headroom from 'react-headroom';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUserName] = useState("Guest");
  const [isDoctor, setIsDoctor] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPatientPortal, setIsPatientPortal] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserName(user.username);
      setIsDoctor(user.role === "Doctor");
    }
  }, [navigate]);

  useEffect(() => {
    setIsPatientPortal(location.pathname === "/patient-portal");
  }, [location.pathname]);

  const navItems = [
    { name: 'Home', path: '/', activeColor: 'text-orange-500' },
    { name: 'Doctors', path: '/find-doctors', activeColor: 'text-orange-500' },
    { name: 'Services', path: '/services', activeColor: 'text-orange-500' },
    { name: 'Contact', path: '/contact', activeColor: 'text-orange-500' },
  ];

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <Headroom>
      <div>
        <nav className="bg-white mb-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-3 lg:px-6">
            <div className="flex justify-between items-center h-16">
              <Link to="/">
                <div className="flex items-center">
                  <span className="text-blue-600 text-xl font-bold">HealthyCare</span>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/2966/2966327.png"
                    alt="logo"
                    className="ml-2 w-10 h-10"
                  />
                </div>
              </Link>

              <div className={`hidden md:flex md:items-center  lg:space-x-10 ${isPatientPortal ? 'space-x-0 md:justify-between' : 'space-x-5'}`}>
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`transition-colors duration-200 rounded-md px-3 py-1 ${isActive
                        ? `font-medium ${item.activeColor} rounded-full  text-orange-400`
                        : 'text-gray-600'
                        }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}

                {!isPatientPortal ? (
                  <Link to={!isDoctor ? "/patient-portal" : "/dashboard"}>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                      {isDoctor ? "Doctor Dashboard" : "Patient Portal"}
                    </button>
                  </Link>
                ) : (
                  <div className="flex items-center space-x-4">
                    <div className="border-l h-6 border-gray-200 mx-2"></div>
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-700 hidden md:inline-block">
                        {username}
                      </span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="ml-2 px-4 py-2 text-white bg-red-400 hover:bg-red-600 rounded-2xl flex items-center transition-colors"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
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

          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out md:hidden ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
              }`}
          >
            <div className="px-2 pt-2 pb-3 space-y-2">

              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={` block px-3 py-2 transition-colors duration-200 rounded-md ${isActive
                      ? `font-medium ${item.activeColor} rounded-full text-orange-500`
                      : 'text-gray-600'
                      }`}
                  >
                    {item.name}
                  </Link>
                );
              })}

              {isPatientPortal ? (
                <div className="flex space-x-4 p-2 rounded-md bg-gray-50">
                  <button className="p-2 rounded-full hover:bg-gray-100 relative">
                    <Bell className="h-5 w-5 text-gray-500" />
                    <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                  </button>
                  <div className="border-l h-6 border-gray-200 mx-2"></div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{username}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="ml-2 px-4 py-2 text-white bg-red-400 hover:bg-red-600 rounded-2xl flex items-center transition-colors"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </div>
              ) : (
                <Link to={!isDoctor ? "/patient-portal" : "/dashboard"}>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full">
                    {isDoctor ? "Doctor Dashboard" : "Patient Portal"}
                  </button>
                </Link>
              )}
            </div>
          </div>
        </nav>
      </div>
    </Headroom>
  );
}
export default Header;
