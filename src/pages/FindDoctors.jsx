import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Star, Calendar } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DoctorCard from '../components/DoctorCard';
import SearchFilters from '../components/SearchFilters';
import LoadingSpinner from "../components/LoadingSpinner";
import axios from 'axios';

// Specialty options for filter
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
];

export function FindDoctors() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties');
  const [availabilityToday, setAvailabilityToday] = useState(false);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [doctorsData, setDoctorsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/doctors/list/');
        console.log(response.data);
        setFilteredDoctors(response.data);
        setDoctorsData(response.data);
      } catch (error) {
        console.log('Error', error);
      }finally{
        setTimeout(() => setLoading(false));
      }
    };

    fetchDoctors();
  }, []);

  const getCurrentDay = () => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date().getDay();
    return days[today]; // Returns the name of the day like "Monday", "Tuesday", etc.
  };

  useEffect(() => {

    const currentDay=getCurrentDay()
    // Filter doctors based on search term, specialty, and availability
    const filtered = doctorsData.filter((doctor) => {
      const matchesSearch = doctor.doctor_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesSpecialty =
        selectedSpecialty === 'All Specialties' ||
        doctor.department_name === selectedSpecialty;

      // Adjust availability filter based on array of availability
      const matchesAvailability =
      !availabilityToday || doctor.availability.includes(currentDay); // Availability check for today

    return matchesSearch && matchesSpecialty && matchesAvailability; // Check if Today is included in the availability array

     
    });
    setFilteredDoctors(filtered);
  }, [searchTerm, selectedSpecialty, availabilityToday, doctorsData]);


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <LoadingSpinner size={60} color="#0d6efd" />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Header />

      <div className="mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                <DoctorCard key={doctor.doctor_name} doctor={doctor} />
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
     
      </div>
      <Footer />
    </div>
  );
}

export default FindDoctors;
