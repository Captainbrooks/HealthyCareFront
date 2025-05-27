import React from 'react'
import {
  Heart,
  Award,
  Users,
  Building2,
  Star,
  Clock,
  CheckCircle,
  Trophy,
} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
const stats = [
  {
    icon: Users,
    value: '50,000+',
    label: 'Patients Served',
  },
  {
    icon: Building2,
    value: '12',
    label: 'Departments',
  },
  {
    icon: Star,
    value: '150+',
    label: 'Specialist Doctors',
  },
  {
    icon: Trophy,
    value: '25+',
    label: 'Years of Excellence',
  },
]
const values = [
  {
    title: 'Patient-Centered Care',
    description:
      'We put our patients first, ensuring personalized care that meets individual needs.',
  },
  {
    title: 'Excellence',
    description:
      'We strive for excellence in healthcare delivery and patient outcomes.',
  },
  {
    title: 'Innovation',
    description: 'We embrace cutting-edge medical technologies and procedures.',
  },
  {
    title: 'Integrity',
    description:
      'We maintain the highest standards of professional and ethical conduct.',
  },
]
const leadership = [
  {
    name: 'Dr. Robert Anderson',
    role: 'Chief Executive Officer',
    image:
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
  },
  {
    name: 'Dr. Sarah Mitchell',
    role: 'Chief Medical Officer',
    image:
      'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
  },
  {
    name: 'Dr. James Chen',
    role: 'Director of Operations',
    image:
      'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
  },
]
export function About() {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="bg-blue-600 py-4 md:py-6 lg:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            About HealthyCare
          </h1>
          <p className="text-blue-100 text-base text-center">
            Delivering exceptional healthcare services with compassion and
            excellence for over 25 years.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-8">
        {/* Mission Statement */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
          <div className="max-w-3xl mx-auto text-center">
            <Heart className="w-12 h-12 text-blue-600 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 text-lg">
              To enhance the health and well-being of our community by providing
              accessible, high-quality healthcare services with compassion,
              expertise, and innovation.
            </p>
          </div>
        </div>
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm p-6 text-center"
              >
                <Icon className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                <div className="text-2xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            )
          })}
        </div>
        {/* Core Values */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-blue-600 mt-1" />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {value.title}
                    </h3>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Leadership */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Our Leadership
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {leadership.map((leader, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm p-6 text-center"
              >
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {leader.name}
                </h3>
                <p className="text-gray-600">{leader.role}</p>
              </div>
            ))}
          </div>
        </div>
        {/* CTA */}
        <div className="bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Experience the HealthCare Difference
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join thousands of satisfied patients who trust us with their
            healthcare needs. Book an appointment today and experience our
            commitment to excellence.
          </p>
          <a
            href="/find-doctors"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Find a Doctor
          </a>
        </div>
      </div>
    
    </div>
  )
}
export default About
