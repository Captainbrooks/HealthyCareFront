import React from 'react'
import {
  Phone,
  Clock,
  MapPin,
  AlertTriangle,
  HeartPulse,
  Stethoscope,
  Building2,
  BoxIcon,
} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
const emergencyServices = [
  {
    icon: HeartPulse,
    title: 'Critical Care',
    description: '24/7 intensive care unit with advanced life support systems',
  },
  {
    icon: BoxIcon,
    title: 'Ambulance Service',
    description: 'Rapid response emergency medical transportation',
  },
  {
    icon: Stethoscope,
    title: 'Trauma Care',
    description: 'Specialized trauma team available round the clock',
  },
  {
    icon: Building2,
    title: 'Emergency Room',
    description: 'State-of-the-art emergency department with immediate care',
  },
]
const locations = [
  {
    name: 'Main Hospital Emergency',
    address: '123 Healthcare Ave, Medical District',
    phone: '911',
    available: '24/7',
  },
  {
    name: 'North Wing Emergency',
    address: '456 Wellness Blvd, North Campus',
    phone: '911',
    available: '24/7',
  },
]
export function EmergencyCare() {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Header />
      <div className="bg-red-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Emergency Care</h1>
          <p className="text-red-100 max-w-3xl mx-auto">
            24/7 emergency medical services with immediate response. Your
            emergency is our priority.
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href="tel:911"
              className="inline-flex items-center bg-white px-6 py-3 rounded-md text-red-600 font-semibold hover:bg-red-50 transition-colors"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Emergency: 911
            </a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Emergency Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {emergencyServices.map((service, index) => {
            const Icon = service.icon
            return (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <Icon className="w-8 h-8 text-red-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            )
          })}
        </div>
        {/* What to Expect */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            What to Expect in Emergency
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Initial Assessment
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-red-600 mr-2 mt-0.5" />
                  <span className="text-gray-600">
                    Immediate triage by qualified medical staff
                  </span>
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-red-600 mr-2 mt-0.5" />
                  <span className="text-gray-600">
                    Vital signs monitoring and quick medical history
                  </span>
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-red-600 mr-2 mt-0.5" />
                  <span className="text-gray-600">
                    Priority-based care allocation
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Treatment Process
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-red-600 mr-2 mt-0.5" />
                  <span className="text-gray-600">
                    Immediate medical intervention when needed
                  </span>
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-red-600 mr-2 mt-0.5" />
                  <span className="text-gray-600">
                    Access to advanced medical equipment
                  </span>
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-red-600 mr-2 mt-0.5" />
                  <span className="text-gray-600">
                    Specialist consultation if required
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* Emergency Locations */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Emergency Locations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {locations.map((location, index) => (
              <div
                key={index}
                className="border border-gray-100 rounded-lg p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {location.name}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-gray-400 mr-2 mt-0.5" />
                    <span className="text-gray-600">{location.address}</span>
                  </div>
                  <div className="flex items-start">
                    <Phone className="w-5 h-5 text-gray-400 mr-2 mt-0.5" />
                    <span className="text-gray-600">{location.phone}</span>
                  </div>
                  <div className="flex items-start">
                    <Clock className="w-5 h-5 text-gray-400 mr-2 mt-0.5" />
                    <span className="text-gray-600">{location.available}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
export default EmergencyCare
