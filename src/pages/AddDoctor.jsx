import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import AddDoctorForm from '../components/AddDoctorForm'
export function AddDoctor() {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Header />
      <div className="bg-blue-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Add New Doctor</h1>
          <p className="text-blue-100 max-w-3xl mx-auto">
            Add a new healthcare professional to our network of top-rated
            doctors.
          </p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AddDoctorForm />
      </div>
      <Footer />
    </div>
  )
}
export default AddDoctor
