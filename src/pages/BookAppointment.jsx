import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  ChevronLeft,
  Calendar as CalendarIcon,
  Clock,
  User,
  Phone,
  Mail,
  MessageSquare,
} from "lucide-react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoadingSpinner from "../components/LoadingSpinner";

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

function BookAppointment() {
  const [step, setStep] = useState(1);
  const [doctors, setDoctors] = useState([])
  const [selecteddept, setSelectedDept] = useState("")
  const [appointmentsuccess, setAppointmentSuccess] = useState(false)
  const [appointfailure, setAppointmentFailure] = useState(false)
  const [customError,setCustomError]=useState('')
  const [timeslots, setTimeSlots] = useState([])
  const [errors, setErrors] = useState({})
  const stepcount = useRef(null)
  const [loading,setLoading]=useState(true)

  const [formData, setFormData] = useState({
    department: "",
    doctor: "",
    date: "",
    time: "",
    name: "",
    email: "",
    phone: "",
    reason: "",
  });









  useEffect(() => {
    stepcount.current?.scrollIntoView({ behaviour: 'smooth' });

  }, [step])


  const fetchTimeSlots = async (doctor_id, date) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/doctors/timeslots/${doctor_id}/?appointment_date=${date}`, {
        withCredentials: true
      });


      setTimeSlots(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Failed to fetch time slots:', error);
      setLoading(false)
    }
  }

  const convertTo12HourFormat = (timeStr) => {
    const [hour, minute] = timeStr.split(':');
    const hourInt = parseInt(hour);
    const ampm = hourInt >= 12 ? 'PM' : 'AM';
    const hour12 = hourInt % 12 === 0 ? 12 : hourInt % 12;
    return `${hour12}:${minute} ${ampm}`;
  };



  const fetchDeptDoctors = async (selecteddept) => {

    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/doctors/list/${selecteddept}`);
     
        setDoctors(response.data)
        setLoading(false)
      
    }catch (error) {
      console.log("There was an error", error)
      setLoading(false)
    }
  
  }

  const handleDoctorSelect = (doctor) => {
    setFormData((prev) => ({
      ...prev,
      doctor
    }));

    if (formData.date) {
      fetchTimeSlots(doctor.id, formData.date)
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'date' && formData.doctor) {
      fetchTimeSlots(formData.doctor.id, value);
    }
  };



  const handleTimeSelect = (time) => {
    setFormData((prev) => ({
      ...prev,
      time,
    }));
  };




  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.department) newErrors.department = "Please select a department";
    if (!formData.doctor) newErrors.doctor = "Please select a doctor";
    if (!formData.date) newErrors.date = "Please select a date";
    if (!formData.time) newErrors.time = "Please select a time slot.";
    if (!formData.name.trim()) newErrors.name = "Please enter your name.";
    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email.";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email.";
    }
    if (!formData.phone.trim()) newErrors.phone = "Please enter your phone number";
    if (!formData.reason.trim()) newErrors.reason = "Please mention your reason for appointment.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return;
    }

    setErrors({});


    setAppointmentSuccess(false)
    setAppointmentFailure(false)

    const payload = {
      department_name: formData.department,
      doctor: formData.doctor.id ? formData.doctor.id : "",
      appointment_date: formData.date,
      timeslot: formData.time,
      patient_name: formData.name,
      patient_email: formData.email,
      patient_phone: formData.phone,
      reason_to_visit: formData.reason,
    };



    axios
      .post("http://127.0.0.1:8000/api/appointments/create/", payload)
      .then((response) => {
        console.log("response", response)

        console.log("Before sendinf", payload)
        console.log("Form submitted successfully:", response.data);
        setAppointmentSuccess(true)
        setAppointmentFailure(false)

        setTimeout(() => {
          setFormData({
            department: "",
            doctor: "",
            date: "",
            time: "",
            name: "",
            email: "",
            phone: "",
            reason: "",
          });
          setAppointmentSuccess(false);
        }, 3000);

      })
      .catch((error) => {
        const errorMsg = error.response?.data?.non_field_errors?.[0];
        console.log("Error message:",errorMsg)
        if (errorMsg?.includes("must make a unique set")) {
          setCustomError("The selected time slot has already been booked. Please refresh the page & choose a different time.");
        } else {
          setCustomError("Something went wrong while booking. Please try again.");
        }
        setAppointmentSuccess(false)
        setAppointmentFailure(true)
      });
  };






  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="bg-white">
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
          <div ref={stepcount} className="mb-8">
            <div className="flex items-center justify-between">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= item
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-600"
                      }`}
                  >
                    {item}
                  </div>
                  {item && (
                    <div
                      className={`h-1 w-24 ${step > item ? "bg-blue-600" : "bg-gray-200"
                        }`}
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
            <div >
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

                      setSelectedDept(dept)
                      fetchDeptDoctors(dept)
                      setStep(2);
                    }}
                    className={`p-4 border rounded-lg text-left hover:border-blue-600 ${formData.department === dept
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200"
                      }`}
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

              <div className="flex items-center py-4">
                <button
                  className="text-blue-500 hover:text-blue-600"
                  onClick={() => setStep(1)}
                >
                  <ArrowCircleLeftIcon fontSize="large" />


                </button>

                <h2 className="text-lg font-semibold text-gray-800 mx-auto">
                  Choose Doctor & Time
                </h2>
              </div>


              {/* Doctor Selection */}
              <div className="mb-6">
                <h3 className="text-md font-medium mb-3">Select Doctor</h3>
                <div className={`${doctors.length > 0 ? 'grid grid-cols md:grid-cols-2 gap-4' : 'grid grid-cols'}`}>

                  {
                  loading ? (<LoadingSpinner/>):
                  
                  doctors.length > 0 ? (doctors.map((doctor) => (
                    <button
                      key={doctor.id}
                      onClick={() => handleDoctorSelect(doctor)}
                      className={`p-4 border rounded-lg flex items-center space-x-4 hover:border-blue-600 ${formData.doctor?.doctor_name === doctor.doctor_name
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200"
                        }`}


                    >
                      <img
                        src={doctor.image}
                        alt={doctor.doctor_name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{doctor.doctor_name}</h4>
                        <p className="text-sm text-gray-600">
                          {doctor.department_name}
                        </p>
                        <span className="text-md text-gray-700 font-medium">
                          Available:
                          <div className="flex flex-wrap gap-1 mt-1">
                            {doctor.availability.map((a, index) => (
                              <span
                                key={index}
                                className="bg-gray-200 text-gray-800 rounded-full px-3 py-1 text-xs"
                              >
                                {a}
                              </span>
                            ))}
                          </div>
                        </span>


                      </div>
                    </button>
                  ))) :
                    <div className="flex justify-center">
                      <Alert severity="warning">There are currently no doctors in this department.</Alert>
                    </div>
                  }


                </div>
                {errors.doctor && <p className="text-sm text-red-500 mt-1">{errors.doctor}</p>}
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
                {errors.date && <p className="text-sm text-red-500 mt-1">{errors.date}</p>}

              </div>
              {/* Time Selection */}
              <div className="mb-6">
                <h3 className="text-md font-medium mb-3">Select Time</h3>
                <div className={`${timeslots.length > 0 ? 'grid grid-cols-3 gap-2' : 'grid grid-cols'}`}>

                  {
                    formData.date ? (

                      loading ? (<LoadingSpinner/>):
                      timeslots.length > 0 ? (
                        timeslots.map((t) => (
                          <button
                            key={t.id}
                            onClick={() => handleTimeSelect(t.id)}
                            className={`p-2 border rounded-lg text-center hover:border-blue-600 ${formData.time === t.id
                                ? "border-blue-600 bg-blue-50"
                                : "border-gray-200"
                              }`}
                          >
                            {convertTo12HourFormat(t.start_time)} - {convertTo12HourFormat(t.end_time)}
                          </button>

                        ))
                      ) : (
                        <div className="grid-cols">
                          <Alert severity="warning">Oops! No time slots found. Make sure you've picked a date that matches the doctor’s available days.</Alert>
                        </div>
                      )
                    ) : (
                      <p className="text-gray-500">Please select a date to view time slots.</p>
                    )
                  }





                  {errors.time && <p className="text-sm text-red-500 mt-1">{errors.time}</p>}


                </div>
              </div>
              <button
                onClick={() => {
                  const newErrors = {};

                  if (!formData.doctor) {
                    newErrors.doctor = "Please select a doctor.";
                  }
                  if (!formData.date) {
                    newErrors.date = "Please select a date.";
                  }
                  if (!formData.time) {
                    newErrors.time = "Please select a time.";
                  }

                  if (Object.keys(newErrors).length > 0) {
                    setErrors(newErrors);  // Make sure you're using a state variable called `errors`
                    return; // Don't proceed to next step
                  }

                  // Clear previous errors
                  setErrors({});
                  setStep(3); // Proceed
                }}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Continue
              </button>

            </div>
          )}
          {/* Step 3: Personal Information */}
          {step === 3 && (



            <form onSubmit={handleSubmit}>

              <div className="flex items-center py-4">
                <button
                  className="text-blue-500 hover:text-blue-600 "
                  onClick={() => setStep(2)}
                >
                  <ArrowCircleLeftIcon fontSize="large" />

                </button>

                <h2 className="text-lg font-semibold text-gray-800 mx-auto">
                  Your Information
                </h2>
              </div>


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
                  {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
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
                {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}

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
                {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}

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
                {errors.reason && <p className="text-sm text-red-500 mt-1">{errors.reason}</p>}

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
        <div>
  {(appointmentsuccess && !appointfailure) && (
    <Alert severity="success">
      Your appointment has been successfully booked! You will receive a confirmation email shortly.
    </Alert>
  )}
  {(appointfailure && !appointmentsuccess && !customError) && (
    <Alert severity="warning">
      Failed to book the appointment. Please try again later.
    </Alert>
  )}
  {(appointfailure && customError) && (
    <Alert severity="error">{customError}</Alert>
  )}
</div>

      </div>
      <Footer />
    </div>
  );
}

export default BookAppointment;
