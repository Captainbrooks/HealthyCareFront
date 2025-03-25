import React, { useState } from "react";
import {
  ChevronLeft,
  Calendar as CalendarIcon,
  Clock,
  User,
  Phone,
  Mail,
  MessageSquare,
} from "lucide-react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
const departments = [
  "Cardiology",
  "Neurology",
  "Pediatrics",
  "Orthopedics",
  "Dermatology",
  "General Medicine",
  "Dentistry",
  "Ophthalmology",
];
const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Neurology",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
  },
  {
    id: 3,
    name: "Dr. Emily Wilson",
    specialty: "Pediatrics",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
  },
];
const timeSlots = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
];
function BookAppointment() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    department: "",
    doctor: null,
    date: "",
    time: "",
    name: "",
    email: "",
    phone: "",
    reason: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleDoctorSelect = (doctor) => {
    setFormData((prev) => ({
      ...prev,
      doctor,
    }));
  };
  const handleTimeSelect = (time) => {
    setFormData((prev) => ({
      ...prev,
      time,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // Show success message or redirect
  };
  return (
    <div className="min-h-screen bg-gray-50">
    <Header/>
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/"
            className="flex items-center text-blue-600 hover:text-blue-700"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Book an Appointment
          </h1>
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= item ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"}`}
                  >
                    {item}
                  </div>
                  {item < 3 && (
                    <div
                      className={`h-1 w-24 ${step > item ? "bg-blue-600" : "bg-gray-200"}`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-sm text-gray-600">Select Department</span>
              <span className="text-sm text-gray-600">
                Choose Doctor & Time
              </span>
              <span className="text-sm text-gray-600">Your Information</span>
            </div>
          </div>
          {/* Step 1: Department Selection */}
          {step === 1 && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Select Department</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {departments.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        department: dept,
                      }));
                      setStep(2);
                    }}
                    className={`p-4 border rounded-lg text-left hover:border-blue-600 ${formData.department === dept ? "border-blue-600 bg-blue-50" : "border-gray-200"}`}
                  >
                    {dept}
                  </button>
                ))}
              </div>
            </div>
          )}
          {/* Step 2: Doctor and Time Selection */}
          {step === 2 && (
            <div>
              <h2 className="text-lg font-semibold mb-4">
                Choose Doctor & Time
              </h2>
              {/* Doctor Selection */}
              <div className="mb-6">
                <h3 className="text-md font-medium mb-3">Select Doctor</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {doctors.map((doctor) => (
                    <button
                      key={doctor.id}
                      onClick={() => handleDoctorSelect(doctor)}
                      className={`p-4 border rounded-lg flex items-center space-x-4 hover:border-blue-600 ${formData.doctor?.id === doctor.id ? "border-blue-600 bg-blue-50" : "border-gray-200"}`}
                    >
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{doctor.name}</h4>
                        <p className="text-sm text-gray-600">
                          {doctor.specialty}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              {/* Date Selection */}
              <div className="mb-6">
                <h3 className="text-md font-medium mb-3">Select Date</h3>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
              {/* Time Selection */}
              <div className="mb-6">
                <h3 className="text-md font-medium mb-3">Select Time</h3>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => handleTimeSelect(time)}
                      className={`p-2 border rounded-lg text-center hover:border-blue-600 ${formData.time === time ? "border-blue-600 bg-blue-50" : "border-gray-200"}`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={() => setStep(3)}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Continue
              </button>
            </div>
          )}
          {/* Step 3: Personal Information */}
          {step === 3 && (
            <form onSubmit={handleSubmit}>
              <h2 className="text-lg font-semibold mb-4">Your Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg"
                      placeholder="+1 (234) 567-8900"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reason for Visit
                  </label>
                  <div className="relative">
                    <MessageSquare className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                    <textarea
                      name="reason"
                      rows={4}
                      value={formData.reason}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg"
                      placeholder="Please briefly describe your symptoms or reason for visit"
                    />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 mt-6"
              >
                Confirm Appointment
              </button>
            </form>
          )}
        </div>
      </div>
      <Footer/>
    </div>
  );
}


export default BookAppointment;
