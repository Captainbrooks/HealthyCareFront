import React from 'react'
import { Link } from 'react-router-dom'


import {
  Stethoscope,
  HeartPulse,
  Brain,
  Baby,
  Bone,
  Eye,
  Microscope,
  Syringe,
  Activity,
  ChevronRight
  
} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'


function Services() {
  const specialtyServices = [
    {
      icon: <HeartPulse size={40} className="text-blue-600" />,
      title: 'Cardiology',
      description:
        'Comprehensive care for heart conditions with advanced diagnostic and treatment options',
      link: '/services/cardiology',
    },
    {
      icon: <Brain size={40} className="text-blue-600" />,
      title: 'Neurology',
      description:
        'Expert care for disorders of the nervous system, brain, and spinal cord',
      link: '/services/neurology',
    },
    {
      icon: <Baby size={40} className="text-blue-600" />,
      title: 'Pediatrics',
      description:
        'Specialized healthcare for infants, children, and adolescents',
      link: '/services/pediatrics',
    },
    {
      icon: <Bone size={40} className="text-blue-600" />,
      title: 'Orthopedics',
      description:
        'Treatment for musculoskeletal injuries, disorders, and conditions',
      link: '/services/orthopedics',
    },
    {
      icon: <Eye size={40} className="text-blue-600" />,
      title: 'Ophthalmology',
      description:
        'Complete eye care services from routine exams to complex surgeries',
      link: '/services/ophthalmology',
    },
    {
        icon: (
          <div ><span className="material-symbols-outlined text-blue-600">
          dentistry
          </span>
          </div>
        ),
        title: 'Dental Care',
        description: 'Preventive, restorative, and cosmetic dental services for all ages',
        link: '/services/dental',
      }
  ]
  const diagnosticServices = [
    {
      title: 'Laboratory Testing',
      description:
        'Comprehensive blood work, urinalysis, and other diagnostic tests',
      image:
        'https://img.freepik.com/free-photo/scientist-working-laboratory_23-2148785693.jpg',
    },
    {
      title: 'Medical Imaging',
      description:
        'X-rays, CT scans, MRI, ultrasound, and other imaging services',
      image:
        'https://img.freepik.com/free-photo/doctor-examining-x-ray_53876-14156.jpg',
    },
    {
      title: 'Pathology Services',
      description:
        'Tissue analysis and disease diagnosis by expert pathologists',
      image:
        'https://img.freepik.com/free-photo/medical-researcher-looking-test-tube_23-2148882756.jpg',
    },
  ]
  return (

    <><Header/>
    
    <div className="w-full min-h-screen bg-gray-50">

        
    
      {/* Hero Section */}
      <div className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Our Healthcare Services
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              Comprehensive medical care delivered by expert healthcare
              professionals using cutting-edge technology
            </p>
          </div>
        </div>
      </div>
      {/* Overview Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="lg:flex items-center gap-12">
          <div className="lg:w-1/2 mb-8 lg:mb-0">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Comprehensive Healthcare Services
            </h2>
            <p className="text-gray-600 mb-6">
              At HealthyCare, we offer a wide range of medical services designed
              to meet all your healthcare needs. Our state-of-the-art facilities
              and expert medical professionals ensure you receive the highest
              quality care for prevention, diagnosis, treatment, and ongoing
              management of health conditions.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <Stethoscope className="text-blue-600 w-6 h-6 mr-3 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">Expert Specialists</h3>
                  <p className="text-gray-600">
                    Access to board-certified physicians across all major
                    specialties
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Microscope className="text-blue-600 w-6 h-6 mr-3 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">
                    Advanced Diagnostics
                  </h3>
                  <p className="text-gray-600">
                    Cutting-edge diagnostic equipment for accurate testing and
                    imaging
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Syringe className="text-blue-600 w-6 h-6 mr-3 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">Preventive Care</h3>
                  <p className="text-gray-600">
                    Comprehensive wellness programs and preventive health
                    services
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Activity className="text-blue-600 w-6 h-6 mr-3 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">Rehabilitation</h3>
                  <p className="text-gray-600">
                    Physical, occupational, and speech therapy by experienced
                    therapists
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2">
            <img
              src="https://img.freepik.com/free-photo/team-doctors-standing-hospital-corridor_107420-84827.jpg"
              alt="Healthcare professionals"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        </div>
      </div>
      {/* Specialty Services Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Specialty Departments
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our hospital features specialized departments staffed by experts
              in their respective fields, ensuring comprehensive care for all
              medical conditions
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {specialtyServices.map((service, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-4 size-20 flex justify-start">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Link
                  to={service.link}
                  className="text-blue-600 flex items-center"
                >
                  Learn More <ChevronRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to="/services/all">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700">
                View All Departments
              </button>
            </Link>
          </div>
        </div>
      </div>
      {/* Diagnostic Services Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Diagnostic Services
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Our comprehensive diagnostic services utilize state-of-the-art
            technology to provide accurate results for better clinical decisions
            and treatment plans
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {diagnosticServices.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Emergency Services Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img
                  src="https://img.freepik.com/free-photo/ambulance-paramedic-emergency-service_342744-1291.jpg"
                  alt="Emergency services"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8 md:p-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  24/7 Emergency Services
                </h2>
                <p className="text-gray-600 mb-6">
                  Our emergency department is staffed around the clock with
                  experienced physicians, nurses, and support personnel ready to
                  provide immediate care for all emergencies. With
                  state-of-the-art equipment and dedicated trauma rooms, we're
                  prepared to handle any medical crisis.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <div className="bg-blue-100 rounded-full p-2 mr-4">
                      <div className="bg-blue-600 rounded-full w-2 h-2"></div>
                    </div>
                    <p className="font-medium">Trauma and acute care</p>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-blue-100 rounded-full p-2 mr-4">
                      <div className="bg-blue-600 rounded-full w-2 h-2"></div>
                    </div>
                    <p className="font-medium">Critical care units</p>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-blue-100 rounded-full p-2 mr-4">
                      <div className="bg-blue-600 rounded-full w-2 h-2"></div>
                    </div>
                    <p className="font-medium">Rapid response teams</p>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-blue-100 rounded-full p-2 mr-4">
                      <div className="bg-blue-600 rounded-full w-2 h-2"></div>
                    </div>
                    <p className="font-medium">Ambulance services</p>
                  </div>
                </div>
                <Link to="/emergency">
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700">
                    Learn More
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Preventive Care Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Preventive Care Programs
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Our preventive care programs focus on maintaining health and
            wellness through regular screenings, vaccinations, and lifestyle
            guidance
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
        
            </div>
            <h3 className="font-semibold mb-2">Health Screenings</h3>
            <p className="text-gray-600">
              Regular screenings to detect conditions early
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Syringe className="text-blue-600 w-8 h-8" />
            </div>
            <h3 className="font-semibold mb-2">Vaccinations</h3>
            <p className="text-gray-600">
              Comprehensive immunization services for all ages
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">

            </div>
            <h3 className="font-semibold mb-2">Nutrition Counseling</h3>
            <p className="text-gray-600">
              Personalized dietary guidance for optimal health
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Activity className="text-blue-600 w-8 h-8" />
            </div>
            <h3 className="font-semibold mb-2">Wellness Programs</h3>
            <p className="text-gray-600">
              Holistic programs for overall wellbeing
            </p>
          </div>
        </div>
      </div>
      {/* Appointment CTA */}
      <div className="bg-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Schedule an Appointment?
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto mb-8">
              Our friendly staff is ready to help you schedule an appointment
              with the right specialist for your needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/bookappointment">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 w-full sm:w-auto">
                  Book Appointment
                </button>
              </Link>
              <Link to="/contact">
                <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-md hover:bg-blue-50 w-full sm:w-auto">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer/>
     
    
    </div>
    </>
  )
}


export default Services;
