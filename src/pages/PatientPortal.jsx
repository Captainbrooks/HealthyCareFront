import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
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

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
export function PatientPortal() {

  const [upcomingAppointments, setUpComingAppointments] = useState([])
  const [loading,setLoading]=useState(true)
  const[message,setMessage]=useState('')


  const today = new Date().toLocaleString('en-us', { weekday: 'long' });








  useEffect(() => {
    const fetchAvailavleDoctors = async () => {

      axios.get("http://127.0.0.1:8000/api/doctors/list/availabletoday/", {
        withCredentials: true
      })
        .then((response) => {
          setUpComingAppointments(response.data)
          setLoading(false)
          if(response.data.length === 0){
            setMessage("No Available Appointments")
          }

        }).catch((error)=>{
          console.log(error)
          setMessage("Failed to fetch the available appointments.Please try refreshing the page")
          setLoading(false)
        })


    }

    fetchAvailavleDoctors()
  }, [])
  const availableServices = [
    {
      icon: <Calendar className="w-6 h-6 text-blue-600" />,
      title: 'Schedule Appointment',
      description: 'Book appointments with our healthcare professionals',
      link: '/bookappointment',
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
      link: '/find-doctors',
    },
    {
      title: 'Medical Records',
      description: 'Access your health information',
      link: '/health-records',
    },
    {
      title: 'Billing & Insurance',
      description: 'Manage your payments and coverage',
      link: '/billing',
    },
  ]
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />





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
            
            <div className="space-y-6">

  {
  loading ? (<LoadingSpinner/>):(

    upcomingAppointments.length > 0 ?
  upcomingAppointments.map((appointment) => (
    <div
      key={appointment.doctor_name}
      className="shadow-sm p-2 flex items-start space-x-4  pb-6 last:border-none"
    >
      <img
        src={appointment.image}
        alt={appointment.doctor_name}
        className="w-16 h-16 rounded-full object-cover shadow"
      />

      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-semibold">{appointment.doctor_name}</p>
            <p className="text-sm text-gray-600">{appointment.department_name}</p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="text-green-600 text-sm font-medium">Available today</span>
          </div>
        </div>

        <div className="mt-4 flex space-x-3">
          <Link
            to={`/doctor/${appointment.doctor_name.replace(/\s+/g, '-')}`}
            className="flex-1"
          >
            <button className="w-full bg-white border border-blue-600 text-blue-600 px-4 py-2 rounded-md text-sm hover:bg-blue-50 transition">
              View Profile
            </button>
          </Link>

          <Link
            to={`/bookappointment/${appointment.department_name}/${appointment.doctor_name.replace(/\s+/g, '-')}`}
            className="flex-1"
          >
            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition flex items-center justify-center">
              <Calendar className="w-4 h-4 mr-2" />
              Book Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  )):(<div>
{message && <Alert severity='warning'>{message}</Alert>}
  </div>))}
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