import React from 'react'
import {
  Home,
  Users,
  ClipboardCheck,
  Calendar,
  MapPin,
  Phone,
  Mail,
  BoxIcon,
} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
const services = [
  {
    icon: Home,
    title: 'Home Visits',
    description: 'Professional medical care in the comfort of your home',
    features: [
      'Experienced doctors',
      'Comprehensive checkups',
      'Flexible scheduling',
      'Medical equipment on-site',
    ],
  },
  {
    icon: BoxIcon,
    title: 'Vaccination Programs',
    description: 'Preventive healthcare through vaccination drives',
    features: [
      'All age groups',
      'Latest vaccines available',
      'Safe administration',
      'Digital records',
    ],
  },
  {
    icon: Users,
    title: 'Health Camps',
    description: 'Community health initiatives and screening camps',
    features: [
      'Free health checkups',
      'Multiple specialties',
      'Health awareness',
      'Community focus',
    ],
  },
  {
    icon: ClipboardCheck,
    title: 'Preventive Checkups',
    description: 'Regular health monitoring and preventive care',
    features: [
      'Comprehensive screening',
      'Lab tests included',
      'Health reports',
      'Follow-up care',
    ],
  },
]
export function OutdoorCheckup() {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Header />
      <div className="bg-blue-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">
            Outdoor Checkup Services
          </h1>
          <p className="text-blue-100 max-w-3xl mx-auto">
            Quality healthcare services at your doorstep. Book a home visit or
            join our community health programs.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 ml-4">
                    {service.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-600">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
        {/* Book a Visit */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Book a Home Visit
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                  <h4 className="font-medium text-gray-900">
                    Flexible Scheduling
                  </h4>
                  <p className="text-sm text-gray-600">
                    Choose a time that works best for you
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                  <h4 className="font-medium text-gray-900">Service Areas</h4>
                  <p className="text-sm text-gray-600">
                    Available within city limits
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                  <h4 className="font-medium text-gray-900">Phone Booking</h4>
                  <p className="text-sm text-gray-600">Call: (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                  <h4 className="font-medium text-gray-900">Email Booking</h4>
                  <p className="text-sm text-gray-600">
                    homecare@healthcare.com
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-4">
                What to Expect
              </h4>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-2"></div>
                  Professional medical staff at your doorstep
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-2"></div>
                  Complete medical examination
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-2"></div>
                  Digital health records
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-2"></div>
                  Prescription and follow-up care
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* CTA */}
        <div className="bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Need a Home Visit?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Book a home visit with our qualified medical professionals. We bring
            healthcare to your doorstep.
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors">
            Schedule Now
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}
export default OutdoorCheckup
