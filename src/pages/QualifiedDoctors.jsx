import React, { useEffect, useState } from 'react'
import {
  Award,
  Star,
  GraduationCap,
  Trophy,
  Newspaper,
  ChevronRight,
  Calendar
} from 'lucide-react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import axios from 'axios'
// const featuredDoctors = [
//   {
//     name: 'Dr. Sarah Johnson',
//     specialty: 'Cardiology',
//     image:
//       'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
//     qualifications: 'MD, FACC, PhD',
//     experience: '15+ years',
//     awards: ['Best Cardiologist 2023', 'Research Excellence Award'],
//     publications: 45,
//   },
//   {
//     name: 'Dr. Michael Chen',
//     specialty: 'Neurosurgery',
//     image:
//       'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
//     qualifications: 'MD, FAANS, DNB',
//     experience: '20+ years',
//     awards: ['Neurosurgery Innovation Award', 'Excellence in Patient Care'],
//     publications: 72,
//   },
//   {
//     name: 'Dr. Emily Rodriguez',
//     specialty: 'Pediatrics',
//     image:
//       'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
//     qualifications: 'MD, FAAP, DCH',
//     experience: '12+ years',
//     awards: ['Child Healthcare Excellence', 'Community Service Award'],
//     publications: 28,
//   },
// ]
const specializations = [
  'Cardiology',
  'Neurology',
  'Pediatrics',
  'Orthopedics',
  'Oncology',
  'Dermatology',
  'Ophthalmology',
  'Gynecology',
]




export function QualifiedDoctors() {

  const [featuredDoctors,setFeaturedDoctors]=useState([])




  useEffect(()=>{
    const fetchfeaturedDoctors=async()=>{
  
    axios.get("http://127.0.0.1:8000/api/doctors/all/qualified/",{
        withCredentials:true
      }).then((response)=>{
        console.log(response.data)
        setFeaturedDoctors(response.data)
        
      }).catch((error)=>{
        console.log("There was an error", error)
      })
  
    }
  
    fetchfeaturedDoctors()
  },[])


  
  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Header />
      <div className="bg-blue-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">
            Our Qualified Doctors
          </h1>
          <p className="text-blue-100 max-w-3xl mx-auto">
            Meet our team of highly qualified and experienced medical
            professionals dedicated to providing exceptional healthcare
            services.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Doctors */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredDoctors.map((doctor) => (
            <div
              key={doctor.doctor_name}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={doctor.image}
                    alt={doctor.doctor_name}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {doctor.doctor_name}
                    </h3>
                    <p className="text-blue-600">{doctor.department_name}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <GraduationCap className="w-5 h-5 text-gray-400 mr-2 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Qualifications</p>
                      <p className="font-medium text-gray-900">
                        {doctor.education}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Trophy className="w-5 h-5 text-gray-400 mr-2 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Awards</p>
                      <ul className="list-disc list-inside">
                      {doctor.awards && console.log("Awards for", doctor.doctor_name, doctor.awards)}

                        {doctor.awards.map((award, i) => (
                          <li key={i} className="text-sm text-gray-900">
                            {award.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Newspaper className="w-5 h-5 text-gray-400 mr-2 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Publications</p>
                      <p className="font-medium text-gray-900">
                        {doctor.publications} research papers
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                <Link to={`/bookappointment/${doctor.department_name}/${doctor.doctor_name.replace(/\s+/g, '-')}`} className="flex-1">
                <button className="w-full bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition-colors flex items-center justify-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Book Now
                </button>
              </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Specializations */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Our Specializations
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {specializations.map((specialization, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-4 text-center"
              >
                <span className="text-gray-900 font-medium">
                  {specialization}
                </span>
              </div>
            ))}
          </div>
        </div>
        {/* Certifications */}
        <div className="bg-blue-50 rounded-lg p-8 text-center">
          <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Internationally Certified
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Our doctors are certified by leading international medical boards
            and maintain the highest standards of medical practice.
          </p>
          <a
            href="/find-doctors"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Find a Specialist
          </a>
        </div>
      </div>
      <Footer />
    </div>
  )
}
export default QualifiedDoctors
