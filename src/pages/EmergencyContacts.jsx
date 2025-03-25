import React from 'react'
import { Link } from 'react-router-dom'
import {
  Phone,
  ChevronLeft,
  Building2,
  HeartPulse,
  Baby,
  Brain,
  Pill,
  Syringe,
  MapPin,
  BoxIcon,
} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
const emergencyNumbers = [
  {
    id: 1,
    title: 'General Emergency',
    number: '911',
    icon: Phone,
    description: 'For life-threatening emergencies',
    available: '24/7',
  },
  {
    id: 2,
    title: 'Ambulance Service',
    number: '1-800-MEDICARE',
    icon: BoxIcon,
    description: 'Emergency medical transportation',
    available: '24/7',
  },
  {
    id: 3,
    title: 'Emergency Room',
    number: '+1 (555) 123-4567',
    icon: HeartPulse,
    description: 'Immediate medical attention',
    available: '24/7',
  },
]
const departments = [
  {
    id: 1,
    name: 'Cardiology Emergency',
    icon: HeartPulse,
    contact: '+1 (555) 234-5678',
    location: 'Building A, Floor 2',
  },
  {
    id: 2,
    name: 'Pediatric Emergency',
    icon: Baby,
    contact: '+1 (555) 345-6789',
    location: 'Building B, Floor 1',
  },
  {
    id: 3,
    name: 'Neurology Emergency',
    icon: Brain,
    contact: '+1 (555) 456-7890',
    location: 'Building A, Floor 3',
  },
  {
    id: 4,
    name: 'Poison Control',
    icon: Pill,
    contact: '+1 (555) 567-8901',
    location: 'Building C, Floor 1',
  },
  {
    id: 5,
    name: 'Trauma Center',
    icon: Syringe,
    contact: '+1 (555) 678-9012',
    location: 'Building A, Floor 1',
  },
]
const locations = [
  {
    id: 1,
    name: 'Main Hospital Emergency',
    address: '123 Medical Center Drive, City, State',
    contact: '+1 (555) 123-4567',
  },
  {
    id: 2,
    name: 'North Wing Emergency Center',
    address: '456 Health Avenue, City, State',
    contact: '+1 (555) 234-5678',
  },
  {
    id: 3,
    name: 'South Wing Emergency Center',
    address: '789 Care Boulevard, City, State',
    contact: '+1 (555) 345-6789',
  },
]
function EmergencyContacts() {
  return (
    <div className="min-h-screen bg-gray-50">
     <Header/>
      <div className="bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center hover:text-red-100">
              <ChevronLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
            <div className="flex items-center">
              <Phone className="w-5 h-5 mr-2" />
              <span className="font-bold">Emergency: 911</span>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Emergency Contacts
        </h1>
        {/* Primary Emergency Numbers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {emergencyNumbers.map((emergency) => {
            const IconComponent = emergency.icon
            return (
              <div
                key={emergency.id}
                className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-red-600"
              >
                <div className="flex items-start">
                  <IconComponent className="w-8 h-8 text-red-600 mr-4" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      {emergency.title}
                    </h3>
                    <p className="text-2xl font-bold text-red-600 mb-2">
                      {emergency.number}
                    </p>
                    <p className="text-gray-600 text-sm mb-1">
                      {emergency.description}
                    </p>
                    <p className="text-sm font-medium">
                      Available: {emergency.available}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        {/* Department Emergency Contacts */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Department Emergency Contacts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {departments.map((dept) => {
            const IconComponent = dept.icon
            return (
              <div
                key={dept.id}
                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start">
                  <IconComponent className="w-6 h-6 text-red-600 mr-3" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{dept.name}</h3>
                    <p className="text-red-600 font-medium mb-2">
                      {dept.contact}
                    </p>
                    <p className="text-gray-600 text-sm">
                      <Building2 className="w-4 h-4 inline mr-1" />
                      {dept.location}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        {/* Emergency Locations */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Emergency Locations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {locations.map((location) => (
            <div
              key={location.id}
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-semibold mb-2">{location.name}</h3>
              <p className="text-gray-600 mb-3">
                <MapPin className="w-4 h-4 inline mr-1" />
                {location.address}
              </p>
              <p className="text-red-600 font-medium">
                <Phone className="w-4 h-4 inline mr-1" />
                {location.contact}
              </p>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default EmergencyContacts;