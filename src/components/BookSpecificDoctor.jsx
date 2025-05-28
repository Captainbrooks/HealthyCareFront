import React, { useEffect, useState } from "react";
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

import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import Loader from "./Loader";
import toast from "react-hot-toast";
import axiosClient from "../api/axios";




function BookSpecificDoctor() {
  const navigate = useNavigate()

  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [user_id, setUser_ID] = useState(null)



  const { department, doctorName } = useParams()
  const [timeslots, setTimeSlots] = useState([])
  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(false)
  const [doctor_id, setDoctor_Id] = useState()
  const [doctor, setDoctor] = useState()
  const [available, setAvailable] = useState([])
  const [customError, setCustomError] = useState('')
  const [doctorAvailabilityError, setDoctorAvailabilityError] = useState('');

  const [ErrorMessage, SetErrorMessage] = useState("")


  const today = new Date().toISOString().split('T')[0];


  useEffect(() => {
    const token = localStorage.getItem('access_token')
    console.log(token)

    if (!token) {
      navigate("/login")
      return
    }

    const decodedToken = jwtDecode(token)
    console.log(decodedToken)
    if (decodedToken.id) {
      setUser_ID(decodedToken.user_id)
      setFullName(decodedToken.username)
      setEmail(decodedToken.email)
    }

  }, [])



  useEffect(() => {
    axiosClient.get(`/api/doctors/detail/${doctorName}`, {
      withCredentials: true
    }).then((response) => {
      setDoctor(response.data)
      setDoctor_Id(response.data.id)
      setAvailable(response.data.availability)
    })



  }, [doctorName])














  const [appointmentsuccess, setAppointmentSuccess] = useState(false)
  const [appointfailure, setAppointmentFailure] = useState(false)

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

  const convertTo12HourFormat = (timeStr) => {
    const [hour, minute] = timeStr.split(':');
    const hourInt = parseInt(hour);
    const ampm = hourInt >= 12 ? 'PM' : 'AM';
    const hour12 = hourInt % 12 === 0 ? 12 : hourInt % 12;
    return `${hour12}:${minute} ${ampm}`;
  };


  const fetchTimeSlots = async (doctor_id, date) => {
    console.log("fetch time slots reached", doctor_id, date)
    setLoading(true)
    try {
      const response = await axiosClientClient.get(`/api/doctors/timeslots/${doctor_id}/?appointment_date=${date}`, {
        withCredentials: true
      });


      setTimeSlots(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Failed to fetch time slots:', error);

    } finally {
      setLoading(false)
    }
  }


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'date' && doctor_id) {
      const selectedDate = new Date(value)
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const selectedDay = days[selectedDate.getUTCDay()];

      if (Array.isArray(available)) {
        const isAvailable = available.includes(selectedDay);
        if (isAvailable) {
          fetchTimeSlots(doctor_id, value)
          setDoctorAvailabilityError('');

        } else {
          setTimeSlots([]);
          setDoctorAvailabilityError(`This doctor is not available on ${selectedDay}. Please choose another date.`);
        }
      }


    }
  };



  const handleTimeSelect = (time) => {
    setFormData((prev) => ({
      ...prev,
      time,
    }));

  };



  const handleSubmit = async (e) => {


    console.log("handle submit is clicked")
    e.preventDefault();


    const newErrors = {};


    if (!formData.date) newErrors.date = "Please select a date";
    if (!formData.time) newErrors.time = "Please select a time slot.";

    if (!formData.reason.trim()) newErrors.reason = "Please mention your reason for appointment.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      SetErrorMessage("You have errors.Please check those and try again.")
      return;
    }

    setErrors({});

    setAppointmentSuccess(false)
    setAppointmentFailure(false)





    // Prepare payload to match your Django model's expected fields
    const payload = {
      department_name: department,
      doctor: doctor_id,
      patient: user_id,
      booking_date: today,
      timeslot: formData.time,
      reason_to_visit: formData.reason,
    };

    setLoading(true)
    try {
      console.log("Before sending", payload);

      const response = await axiosClientClient.post(`/api/appointments/create/`, payload);

      console.log("Form submitted successfully:", response.data);
      setAppointmentSuccess(true);
      setAppointmentFailure(false);
      setLoading(false)

      setTimeout(() => {
        setFormData({
          department: "",
          doctor: "",
          date: "",
          time: "",
          reason: "",
        });
        setAppointmentSuccess(false);
      }, 500);

    } catch (error) {
      console.log("Error:", error);
      const errorMsg = error.response?.data?.non_field_errors?.[0];
      console.log("Error message:", errorMsg);

      if (errorMsg?.includes("must make a unique set")) {
        setCustomError("The selected time slot has already been booked. Please refresh the page & choose a different time.");
      } else {
        setCustomError("Something went wrong while booking. Please try again.");
      }

      setAppointmentSuccess(false);
      setAppointmentFailure(true);
    } finally {
      setLoading(false)
      SetErrorMessage("")
    }


  };



  const handleGoBack = () => {
    window.history.back()
  }


  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={handleGoBack}
            className="p-1 flex items-center text-blue-600 hover:text-blue-700 hover:bg-blue-50 hover:rounded-md"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back
          </button>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Book an Appointment
          </h1>
          <div className="mb-8">
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Department</label>
              <input
                type="text"
                value={department}
                disabled
                className="w-full border px-4 py-2 rounded bg-gray-100 text-gray-700 cursor-not-allowed"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Doctor</label>
              <input
                type="text"
                value={doctorName.replace(/-/g, ' ')}
                disabled
                className="w-full border px-4 py-2 rounded bg-gray-100 text-gray-700 cursor-not-allowed"
              />
            </div>

            {doctor && (
              <div className="bg-white rounded-2xl p-6 md:flex md:items-center md:space-x-6 w-full max-w-3xl mx-auto">
                <div className="flex justify-center md:justify-start">
                  <img
                    src={doctor.image}
                    alt={doctor.doctor_name}
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover shadow-md"
                  />
                </div>

                <div className="mt-4 md:mt-0">
                  <h1 className="text-2xl font-bold text-gray-800">{doctor.doctor_name}</h1>
                  <p className="text-gray-600 text-sm md:text-base mt-1">{doctor.department_name}</p>

                  <div className="mt-4">
                    <p className="text-gray-700 font-medium mb-2">Available:</p>
                    <div className="flex flex-wrap gap-2">
                      {doctor.availability.map((a, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            )}


          </div>

          <form onSubmit={handleSubmit}>

            <div>


              <div className="mb-6">
                <h3 className="text-md font-medium mb-3">Select Date</h3>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded-lg ${!formData.date && errors.date && 'border-red-500'}`}
                  min={new Date().toISOString().split("T")[0]}
                />
                {!formData.date && errors.date && <p className="text-sm text-red-500 mt-1">{errors.date}</p>}
              </div>
              {/* Time Selection */}
              <div className="mb-6">
                <h3 className="text-md font-medium mb-3">Select Time</h3>
                <div className={`${timeslots.length > 0 ? 'grid grid-cols-3 gap-2' : 'grid grid-cols'}`}>
                  {
                    formData.date ? (

                      loading ? (<Loader />) :

                        doctorAvailabilityError ? (
                          <div className="mt-2">
                            <Alert severity="warning">{doctorAvailabilityError}</Alert>
                          </div>
                        ) :
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
                            <Alert severity="info">
                              All time slots for this doctor on the selected date are fully booked. Please try another day.
                            </Alert>
                          )
                    ) : (
                      <p className="text-gray-500">Please select a date to view time slots.</p>
                    )
                  }

                  {!formData.time && errors.time && <p className="text-sm text-red-500 mt-1">{errors.time}</p>}
                </div>
              </div>

            </div>




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
                    value={fullName}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg opacity-50 cursor-not-allowed"
                    disabled
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
                    value={email}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg opacity-50 cursor-not-allowed"
                    disabled
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
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg ${!(formData.reason || "").trim() && errors.reason && 'border-red-700'}`}
                    placeholder="Please briefly describe your symptoms or reason for visit"
                  />
                </div>
                {!(formData.reason || "").trim() && errors.reason && <p className="text-sm text-red-500 mt-1">{errors.reason}</p>}


              </div>
            </div>






            <button
              type="submit"
              className={`${loading && 'opacity-50 cursor-not-allowed'} w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 mt-6`}
            >
              {loading ? 'Confirming....' : 'Confirm Appointment'}
            </button>

            {
              !(formData.date && formData.time && formData.reason.trim()) && ErrorMessage && <p className="text-red-500 my-2 text-sm">{ErrorMessage}</p>
            }

          </form>

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

export default BookSpecificDoctor;
