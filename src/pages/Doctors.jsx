import React, { useState, Children } from 'react'
import { Link } from 'react-router-dom'
import { Search, Star, Calendar, MapPin, Filter, X } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
const doctors = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    rating: 4.9,
    reviews: 128,
    experience: '15+ years',
    location: 'Main Hospital',
    availability: 'Mon, Wed, Fri',
    image:
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialty: 'Neurology',
    rating: 4.8,
    reviews: 95,
    experience: '12+ years',
    location: 'North Wing',
    availability: 'Tue, Thu, Sat',
    image:
      'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
  },
  {
    id: 3,
    name: 'Dr. Emily Wilson',
    specialty: 'Pediatrics',
    rating: 4.9,
    reviews: 156,
    experience: '10+ years',
    location: "Children's Wing",
    availability: 'Mon, Tue, Thu',
    image:
      'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
  },
  {
    id: 4,
    name: 'Dr. James Rodriguez',
    specialty: 'Orthopedics',
    rating: 4.7,
    reviews: 89,
    experience: '8+ years',
    location: 'Sports Medicine Center',
    availability: 'Wed, Thu, Fri',
    image:
      'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80',
  },
  {
    id: 5,
    name: 'Dr. Lisa Thompson',
    specialty: 'Dermatology',
    rating: 4.8,
    reviews: 112,
    experience: '11+ years',
    location: 'Main Hospital',
    availability: 'Mon, Wed, Fri',
    image:
      'https://images.unsplash.com/photo-1591604021695-0c69b7c05981?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
  },
  {
    id: 6,
    name: 'Dr. Robert Kim',
    specialty: 'General Medicine',
    rating: 4.6,
    reviews: 78,
    experience: '7+ years',
    location: 'South Wing',
    availability: 'Tue, Thu, Sat',
    image:
      'https://images.unsplash.com/photo-1612531386530-97286d97c2d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
  },
]
const specialties = [
  'All Specialties',
  'Cardiology',
  'Neurology',
  'Pediatrics',
  'Orthopedics',
  'Dermatology',
  'General Medicine',
  'Dentistry',
  'Ophthalmology',
]
function Doctors() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties')
  const [showFilters, setShowFilters] = useState(false)
  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSpecialty =
      selectedSpecialty === 'All Specialties' ||
      doctor.specialty === selectedSpecialty
    return matchesSearch && matchesSpecialty
  })
  return (


    <div className="min-h-screen bg-gray-50">
    <Header/>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Our Doctors</h1>
        </div>
      </div>
      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search doctors by name or specialty..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center w-full px-4 py-2 border rounded-lg"
            >
              <Filter className="w-5 h-5 mr-2" />
              Filters
            </button>
          </div>
          <div className={`md:flex gap-4 ${showFilters ? 'block' : 'hidden'}`}>
            {specialties.map((specialty) => (
              <button
                key={specialty}
                onClick={() => setSelectedSpecialty(specialty)}
                className={`px-4 py-2 rounded-full text-sm ${selectedSpecialty === specialty ? 'bg-blue-600 text-white' : 'bg-white border hover:border-blue-600'}`}
              >
                {specialty}
              </button>
            ))}
          </div>
        </div>
        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start space-x-4">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{doctor.name}</h3>
                    <p className="text-blue-600">{doctor.specialty}</p>
                    <div className="flex items-center mt-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm">{doctor.rating}</span>
                      <span className="mx-1 text-gray-400">•</span>
                      <span className="text-sm text-gray-600">
                        {doctor.reviews} reviews
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-gray-600">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Available: {doctor.availability}
                  </p>
                  <p className="text-sm text-gray-600">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    {doctor.location}
                  </p>
                </div>
                <div className="mt-6 flex space-x-3">
                  <Link
                    to="/book-appointment"
                    className="flex-1 bg-blue-600 text-white text-center px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    Book Appointment
                  </Link>
                  <button className="px-4 py-2 border rounded-md hover:border-blue-600">
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">
              No doctors found matching your criteria.
            </p>
          </div>
        )}
      </div>
      <Footer/>
    </div>
  )
}

export default Doctors;
