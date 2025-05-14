import React, { useEffect, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboardIcon,
  CalendarIcon,
  FileTextIcon,
  ClockIcon,
  MenuIcon,
  XIcon,
  BellIcon,
  UserIcon,
  LogOutIcon,
} from 'lucide-react'
import { jwtDecode } from 'jwt-decode'

const DashboardLayout = () => {
  const navigate = useNavigate()
  const [doctor, setDoctor] = useState('')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  const location = useLocation()

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token')
    if (accessToken) {
      const decoded = jwtDecode(accessToken)
      if (decoded.username) {
        setDoctor(decoded.username)
      }
    }
  }, [])

  const navItems = [
    {
      path: '/dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboardIcon className="w-5 h-5" />,
    },
    {
      path: '/dashboard/appointments',
      label: 'Appointments',
      icon: <CalendarIcon className="w-5 h-5" />,
    },
    {
      path: '/dashboard/test-results',
      label: 'Test Results',
      icon: <FileTextIcon className="w-5 h-5" />,
    },
    {
      path: '/dashboard/availability/',
      label: 'Availability',
      icon: <ClockIcon className="w-5 h-5" />,
    },
  ]

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('user')
    navigate('/')
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`bg-white shadow-lg fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:w-64`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-4 border-b">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-blue-600">HealthyCare</span>
            </Link>
            <button onClick={toggleSidebar} className="lg:hidden">
              <XIcon className="w-6 h-6 text-gray-500" />
            </button>
          </div>
          <div className="flex-1 px-4 py-6 overflow-y-auto">
            <nav className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg ${location.pathname === item.path ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6">
            <button onClick={toggleSidebar} className="lg:hidden">
              <MenuIcon className="w-6 h-6 text-gray-500" />
            </button>
            <div className="flex-1 flex justify-end items-center space-x-4">
              <button className="relative p-1 text-gray-500 hover:text-gray-700 focus:outline-none">
                <BellIcon className="w-6 h-6" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">
                    <UserIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <p className="hidden sm:block text-sm font-medium text-gray-700 truncate max-w-[120px]">
                    Dr. {doctor}
                  </p>
                </div>
                <button
                  onClick={() => setShowLogoutModal(true)}
                  className="hidden sm:flex items-center text-sm text-gray-700 hover:text-red-600"
                >
                  <LogOutIcon className="w-4 h-4 mr-1" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>

          {/* Mobile-only logout */}
          <div className="block sm:hidden px-4 pb-2">
            <button
              onClick={() => setShowLogoutModal(true)}
              className="flex items-center text-sm text-gray-700 hover:text-red-600 w-full"
            >
              <LogOutIcon className="w-4 h-4 mr-2" />
              Sign Out
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto bg-gray-50 p-6">
          <Outlet />
        </main>
      </div>

      {showLogoutModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300">
    <div className="bg-white p-6 rounded-xl shadow-2xl w-[90%] max-w-md animate-fadeIn">
      <h2 className="text-xl font-bold text-gray-800 mb-3">Confirm Sign Out</h2>
      <p className="text-sm text-gray-600 mb-6">
        Are you sure you want to sign out? You will be returned to the login page.
      </p>
      <div className="flex justify-end gap-3">
        <button
          onClick={() => setShowLogoutModal(false)}
          className="px-4 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-100 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm rounded-md bg-red-500 text-white hover:bg-red-600 transition"
        >
          Sign Out
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  )
}

export default DashboardLayout
