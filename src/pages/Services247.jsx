import React from 'react'
import {
  Clock,
  Phone,
  Stethoscope,
  Microscope,
  HeartPulse,
  Activity,
  BoxIcon,
} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
const services = [
  {
    icon: HeartPulse,
    title: 'Emergency Care',
    description: '24/7 emergency medical services with immediate response',
  },
  {
    icon: BoxIcon,
    title: 'Urgent Care',
    description:
      'Round-the-clock treatment for non-life-threatening conditions',
  },
  {
    icon: BoxIcon,
    title: 'Ambulance Service',
    description: 'Emergency medical transportation available 24/7',
  },
  {
    icon: Microscope,
    title: 'Laboratory Services',
    description: '24-hour diagnostic and laboratory testing facilities',
  },
  {
    icon: Activity,
    title: 'ICU Care',
    description: 'Continuous intensive care unit monitoring and treatment',
  },
  {
    icon: Stethoscope,
    title: 'Medical Consultation',
    description: 'On-call doctors available for emergency consultations',
  },
]
const highlights = [
  {
    title: 'Quick Response Time',
    description: 'Average emergency response time under 10 minutes',
  },
  {
    title: 'Experienced Staff',
    description: 'Qualified medical professionals available 24/7',
  },
  {
    title: 'Modern Equipment',
    description: 'State-of-the-art medical facilities and technology',
  },
  {
    title: 'Comprehensive Care',
    description: 'Complete range of emergency medical services',
  },
]
export function Services247() {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Header />
      <div className="bg-blue-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">24/7 Services</h1>
          <p className="text-blue-100 max-w-3xl mx-auto">
            Round-the-clock healthcare services ensuring you have access to
            medical care whenever you need it.
          </p>
          <div className="mt-8">
            <a
              href="tel:911"
              className="inline-flex items-center bg-white px-6 py-3 rounded-md text-blue-600 font-semibold hover:bg-blue-50 transition-colors"
            >
              <Phone className="w-5 h-5 mr-2" />
              Emergency: 911
            </a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Available Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <Icon className="w-8 h-8 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            )
          })}
        </div>
        {/* Service Highlights */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Why Choose Our 24/7 Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {highlights.map((highlight, index) => (
              <div key={index} className="flex items-start">
                <Clock className="w-6 h-6 text-blue-600 mt-1" />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {highlight.title}
                  </h3>
                  <p className="text-gray-600">{highlight.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* CTA Section */}
        <div className="bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Need Medical Assistance?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our medical team is available 24/7 to provide you with the care you
            need. Don't hesitate to reach out in case of any medical emergency.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="tel:911"
              className="inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Emergency
            </a>
            <a
              href="/find-doctors"
              className="inline-flex items-center justify-center bg-white border border-blue-600 text-blue-600 px-6 py-3 rounded-md hover:bg-blue-50 transition-colors"
            >
              <Stethoscope className="w-5 h-5 mr-2" />
              Find a Doctor
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
export default Services247
