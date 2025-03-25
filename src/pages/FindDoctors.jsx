import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, Star, Calendar } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import DoctorCard from '../components/DoctorCard'
import SearchFilters from '../components/SearchFilters'
// Mock data for doctors
const doctorsData = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    rating: 4.9,
    reviews: 124,
    image:
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    availability: 'Available Today',
    education: 'Harvard Medical School',
    experience: '12 years',
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialty: 'Neurology',
    rating: 4.7,
    reviews: 98,
    image:
      'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    availability: 'Next Available: Tomorrow',
    education: 'Johns Hopkins University',
    experience: '15 years',
  },
  {
    id: 3,
    name: 'Dr. Emily Rodriguez',
    specialty: 'Pediatrics',
    rating: 4.8,
    reviews: 156,
    image:
      'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    availability: 'Available Today',
    education: 'Stanford Medical School',
    experience: '8 years',
  },
  {
    id: 4,
    name: 'Dr. James Wilson',
    specialty: 'Orthopedics',
    rating: 4.6,
    reviews: 87,
    image:
      'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    availability: 'Next Available: Friday',
    education: 'Yale School of Medicine',
    experience: '20 years',
  },
  {
    id: 5,
    name: 'Dr. Amara Patel',
    specialty: 'Dermatology',
    rating: 4.9,
    reviews: 112,
    image:
      'https://images.unsplash.com/photo-1591604021695-0c69b7c05981?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    availability: 'Available Today',
    education: 'University of California',
    experience: '10 years',
  },
  {
    id: 6,
    name: 'Dr. Robert Kim',
    specialty: 'Gastroenterology',
    rating: 4.7,
    reviews: 76,
    image:
      'https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    availability: 'Next Available: Monday',
    education: 'Columbia University',
    experience: '14 years',
  },
]
// Specialty options for filter
const specialties = [
  'All Specialties',
  'Cardiology',
  'Neurology',
  'Pediatrics',
  'Orthopedics',
  'Dermatology',
  'Gastroenterology',
  'Oncology',
  'Psychiatry',
]
export function FindDoctors() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties')
  const [availabilityToday, setAvailabilityToday] = useState(false)
  const [filteredDoctors, setFilteredDoctors] = useState(doctorsData)
  useEffect(() => {
    // Filter doctors based on search term, specialty and availability
    const filtered = doctorsData.filter((doctor) => {
      const matchesSearch = doctor.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
      const matchesSpecialty =
        selectedSpecialty === 'All Specialties' ||
        doctor.specialty === selectedSpecialty
      const matchesAvailability =
        !availabilityToday || doctor.availability.includes('Today')
      return matchesSearch && matchesSpecialty && matchesAvailability
    })
    setFilteredDoctors(filtered)
  }, [searchTerm, selectedSpecialty, availabilityToday])
  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Header />
      <div className="bg-blue-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">
            Find Your Doctor
          </h1>
          <p className="text-blue-100 max-w-3xl mx-auto">
            Search our network of top-rated healthcare professionals to find the
            right doctor for your needs.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedSpecialty={selectedSpecialty}
          setSelectedSpecialty={setSelectedSpecialty}
          availabilityToday={availabilityToday}
          setAvailabilityToday={setAvailabilityToday}
          specialties={specialties}
        />
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {filteredDoctors.length}{' '}
            {filteredDoctors.length === 1 ? 'Doctor' : 'Doctors'} Found
          </h2>
          {filteredDoctors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDoctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <p className="text-gray-600">
                No doctors match your search criteria. Please try different
                filters.
              </p>
            </div>
          )}
        </div>
        {filteredDoctors.length > 0 && (
          <div className="mt-12 text-center">
            <button className="bg-white border border-blue-600 text-blue-600 px-6 py-2 rounded-md hover:bg-blue-50">
              Load More Doctors
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
export default FindDoctors
