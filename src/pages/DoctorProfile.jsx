import React, { useEffect, useState } from 'react'

import {
  StarIcon,
  MapPinIcon,
  BriefcaseIcon,
  GraduationCapIcon,
  CalendarIcon,
  ArrowLeftIcon,
} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
// import ReviewsList from '../components/ReviewsList'
import ReviewForm from '../components/ReviewForm'
import axiosClient from '../api/axios'



export default function DoctorProfile() {
  const { doctor_name } = useParams()
  const [showReviewForm, setShowReviewForm] = useState(false)

  const [doctordata,setDoctorData]=useState([])
  const[specializations,setSpecializations]=useState([])
  const[certifications,setCertifications]=useState([])
  const[languages,setLanguages]=useState([])
  const[reviews,setReviews]=useState([])
  const navigate=useNavigate()



  useEffect(()=>{
    console.log(doctor_name)

    const fetchDoctorDetail=async()=>{
        const response=await axiosClient.get(`/doctors/detail/${doctor_name}`);
        setDoctorData(response.data)
        setSpecializations(response.data.specializations)
        setCertifications(response.data.certifications)
        setLanguages(response.data.languages)
        setReviews(response.data.reviews)
    }

    fetchDoctorDetail()

  },[])


  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="p-0.5 flex items-center justify-between text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-100 hover:rounded-full"
          >
            <ArrowLeftIcon className="w-6 h-6" />
          
          </button>
        </div>
      <div className="bg-blue-600 pt-12 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6">
            <img
              src={doctordata.image}
              alt={doctordata.name}
              className="w-48 h-48 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <div className="text-white">
              <h1 className="text-3xl font-bold mb-2">{doctordata.doctor_name}</h1>
              <p className="text-blue-100 text-lg mb-4">
                {doctordata.department_name}
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <div className="flex items-center">
                  <StarIcon className="w-5 h-5 text-yellow-400 mr-1" />
                  <span>
                    {doctordata.rating}.3 ({doctordata.num_reviews} reviews)
                  </span>
                </div>
                <div className="flex items-center">
                  <BriefcaseIcon className="w-5 h-5 text-blue-100 mr-1" />
                  <span>{doctordata.experience} years</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">About</h2>
              <p className="text-gray-600 mb-6">{doctordata.background}</p>
              <h3 className="font-semibold mb-2">Specializations</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {specializations.map((spec) => (
                  <span
                    key={spec.name}
                    className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                  >
                    {spec.name}
                  </span>
                ))}
              </div>
              <h3 className="font-semibold mb-2">Certifications</h3>
              <ul className="list-disc list-inside text-gray-600 mb-6">
                {certifications.map((cert) => (
                  <li className='text-left' key={cert.name}>{cert.name}</li>
                ))}
              </ul>
              <h3 className="font-semibold mb-2">Languages</h3>
              <div className="flex gap-2">
                {languages.map((lang) => (
                  <span key={lang.name} className="text-gray-600">
                    {lang.name}
                  </span>
                ))}
              </div>
            </div>



            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Patient Reviews</h2>
                {!showReviewForm && (
                  <button
                    onClick={() => setShowReviewForm(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    Write a Review
                  </button>
                )}
              </div>
              {showReviewForm && (
                <ReviewForm
                  onSubmit={handleAddReview}
                  onCancel={() => setShowReviewForm(false)}
                />
              )}
             {reviews.length > 0 && 
                   <div className="space-y-6">
                   {reviews.map((review) => (
                     <div
                       key={review.id}
                       className="border-b border-gray-200 pb-6 last:border-0"
                     >
                       <div className="flex items-start gap-4">
                         <div className="flex-1">
                           <div className="flex justify-between items-start">
                             <div>
                               <h4 className="font-medium">{review.patient_name}</h4>
                               <div className="flex items-center gap-2 mt-1">
                                 <div className="flex">
                                   {[...Array(5)].map((_, i) => (
                                     <StarIcon
                                       key={i}
                                       className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                     />
                                   ))}
                                 </div>
                                 <span className="text-sm text-gray-500">{review.date}</span>
                               </div>
                             </div>
                           </div>
                           <p className="mt-2 text-left text-gray-600">{review.review_text}</p>
                         </div>
                       </div>
                     </div>
                   ))}
                 </div>}
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="font-semibold mb-4">Practice Location</h3>
              <div className="flex items-start gap-2 text-gray-600 mb-4">
                <MapPinIcon className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">{doctordata.hospital_name}</p>
                  <p className="text-sm">{doctordata.location}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold mb-4">Education</h3>
              <div className="flex items-start gap-2 text-gray-600">
                <GraduationCapIcon className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">{doctordata.education}</p>
                  <p className="text-sm">Doctor of Medicine</p>
                </div>
              </div>
            </div>
   
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
