import React from 'react'
import { Clock, Phone, AlertCircle, Calendar } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ScheduleTable from '../components/ScheduleTable'
const departmentSchedules = [
  {
    department: 'General Practice',
    schedule: {
      monday: '8:00 AM - 8:00 PM',
      tuesday: '8:00 AM - 8:00 PM',
      wednesday: '8:00 AM - 8:00 PM',
      thursday: '8:00 AM - 8:00 PM',
      friday: '8:00 AM - 6:00 PM',
      saturday: '9:00 AM - 4:00 PM',
      sunday: 'Closed',
    },
  },
  {
    department: 'Emergency Department',
    schedule: {
      monday: '24/7',
      tuesday: '24/7',
      wednesday: '24/7',
      thursday: '24/7',
      friday: '24/7',
      saturday: '24/7',
      sunday: '24/7',
    },
  },
  {
    department: 'Pediatrics',
    schedule: {
      monday: '8:00 AM - 6:00 PM',
      tuesday: '8:00 AM - 6:00 PM',
      wednesday: '8:00 AM - 6:00 PM',
      thursday: '8:00 AM - 6:00 PM',
      friday: '8:00 AM - 5:00 PM',
      saturday: '9:00 AM - 2:00 PM',
      sunday: 'Closed',
    },
  },
  {
    department: 'Laboratory Services',
    schedule: {
      monday: '7:00 AM - 7:00 PM',
      tuesday: '7:00 AM - 7:00 PM',
      wednesday: '7:00 AM - 7:00 PM',
      thursday: '7:00 AM - 7:00 PM',
      friday: '7:00 AM - 7:00 PM',
      saturday: '8:00 AM - 3:00 PM',
      sunday: '9:00 AM - 1:00 PM',
    },
  },
]
const holidays = [
  "New Year's Day - Limited Hours (9:00 AM - 5:00 PM)",
  'Christmas Day - Emergency Services Only',
  'Independence Day - Limited Hours (9:00 AM - 5:00 PM)',
  'Thanksgiving Day - Emergency Services Only',
]
export function OpeningHours() {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Header />
      <div className="bg-blue-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Opening Hours</h1>
          <p className="text-blue-100 max-w-3xl mx-auto">
            Find out when our departments and services are available. Emergency
            services are available 24/7.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Department Hours
              </h2>
              <div className="space-y-8">
                {departmentSchedules.map((dept) => (
                  <ScheduleTable
                    key={dept.department}
                    department={dept.department}
                    schedule={dept.schedule}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-4">
                <AlertCircle className="w-5 h-5 text-blue-600 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Emergency Services
                </h2>
              </div>
              <p className="text-gray-600 mb-4">
                Our emergency department is open 24 hours a day, 7 days a week,
                including holidays.
              </p>
              <div className="flex items-center text-blue-600">
                <Phone className="w-5 h-5 mr-2" />
                <span className="font-semibold">Emergency: 911</span>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-4">
                <Calendar className="w-5 h-5 text-blue-600 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Holiday Hours
                </h2>
              </div>
              <ul className="space-y-3">
                {holidays.map((holiday, index) => (
                  <li key={index} className="text-gray-600 text-sm">
                    • {holiday}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Clock className="w-5 h-5 text-blue-600 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Need to see a doctor?
                </h2>
              </div>
              <p className="text-gray-600 mb-4">
                Don't wait in line. Book an appointment with your preferred
                doctor at your convenient time.
              </p>
              <a
                href="/find-doctors"
                className="inline-block w-full bg-blue-600 text-white text-center px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
              >
                Book Appointment
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
export default OpeningHours
