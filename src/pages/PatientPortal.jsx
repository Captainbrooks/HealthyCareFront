import React from 'react'
import { Link } from 'react-router-dom'
import  Header  from '../components/Header'
import  Footer  from '../components/Footer'
import {
  Calendar,
  FileText,
  MessageSquare,
  ChevronRight,
  Bell,
  Activity,
  User,
  ClipboardCheck,
} from 'lucide-react'
export function PatientPortal() {
  const upcomingAppointments = [
    {
      id: 1,
      doctor: 'Dr. Sarah Wilson',
      department: 'Cardiology',
      date: '2024-02-15',
      time: '10:00 AM',
    },
    {
      id: 2,
      doctor: 'Dr. Michael Chen',
      department: 'General Check-up',
      date: '2024-02-20',
      time: '2:30 PM',
    },
  ]
  const availableServices = [
    {
      icon: <Calendar className="w-6 h-6 text-blue-600" />,
      title: 'Schedule Appointment',
      description: 'Book appointments with our healthcare professionals',
      link: '/book-appointment',
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-blue-600" />,
      title: 'Message Doctors',
      description: 'Communicate directly with your healthcare providers',
      link: '/messages',
    },
    {
      icon: <ClipboardCheck className="w-6 h-6 text-blue-600" />,
      title: 'View Test Results',
      description: 'Access your medical test results and reports',
      link: '/test-results',
    },
    {
      icon: <Activity className="w-6 h-6 text-blue-600" />,
      title: 'Health Records',
      description: 'View and manage your medical history',
      link: '/health-records',
    },
  ]
  const quickLinks = [
    {
      title: 'Emergency Services',
      description: '24/7 emergency care access',
      link: '/emergency',
    },
    {
      title: 'Find a Doctor',
      description: 'Search our network of specialists',
      link: '/doctors',
    },
    {
      title: 'Medical Records',
      description: 'Access your health information',
      link: '/records',
    },
    {
      title: 'Billing & Insurance',
      description: 'Manage your payments and coverage',
      link: '/billing',
    },
  ]
  return (
    <div className="min-h-screen bg-gray-50">
    <Header/>
      <div className="bg-blue-600 text-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Patient Portal
          </h1>
          <p className="text-xl">
            Access your healthcare information, schedule appointments, and
            communicate with your healthcare providers.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {availableServices.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <Link
                to={service.link}
                className="text-blue-600 flex items-center"
              >
                Access <ChevronRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Quick Links</h2>
            <div className="space-y-4">
              {quickLinks.map((link, index) => (
                <Link key={index} to={link.link}>
                  <div className="p-4 hover:bg-gray-50 rounded-md transition-colors">
                    <h3 className="font-semibold text-gray-900">
                      {link.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{link.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-6">
              Available Appointments
            </h2>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="border-b pb-4 last:border-0"
                >
                  <p className="font-medium">{appointment.doctor}</p>
                  <p className="text-sm text-gray-600">
                    {appointment.department}
                  </p>
                  <p className="text-sm text-gray-600">
                    {appointment.date} at {appointment.time}
                  </p>
                  <button className="mt-2 text-blue-600 text-sm hover:text-blue-700">
                    Book this slot
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Need Immediate Assistance?
          </h2>
          <p className="text-gray-600 mb-6">
            Our support team is available 24/7 to help you with any questions or
            concerns.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/contact">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700">
                Contact Support
              </button>
            </Link>
            <Link to="/emergency">
              <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-md hover:bg-blue-50">
                Emergency Services
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}


export default PatientPortal;