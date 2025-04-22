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
import LoadingSpinner from "./LoadingSpinner";

import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";





function BookSpecificDoctor() {


const {department,doctorName}=useParams()
const [timeslots,setTimeSlots]=useState([])
const [errors,setErrors]=useState([])
const [loading,setLoading]=useState(true)
const[doctor_id,setDoctor_Id]=useState()
const[doctor,setDoctor]=useState()
const[available,setAvailable]=useState([])
  const [customError,setCustomError]=useState('')




useEffect(()=>{
  axios.get(`http://127.0.0.1:8000/api/doctors/detail/${doctorName}`,{
    withCredentials:true
  }).then((response)=>{
    setDoctor(response.data)
   setDoctor_Id(response.data.id)
   console.log(response.data.availability)
   setAvailable(response.data.availability)
  })



},[doctorName])









  const [appointmentsuccess,setAppointmentSuccess]=useState(false)
  const [appointfailure,setAppointmentFailure]=useState(false)

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


  const fetchTimeSlots=async(doctor_id,date)=>{
    console.log("fetch time slots reached", doctor_id, date)
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/doctors/timeslots/${doctor_id}/?appointment_date=${date}`, {
        withCredentials: true
      });


      setTimeSlots(response.data)
      console.log(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Failed to fetch time slots:', error);
      setLoading(false)
    }
  }


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if(name==='date' && doctor_id){
      fetchTimeSlots(doctor_id,value)
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


    
  
  
  
    // Prepare payload to match your Django model's expected fields
    const payload = {
      department_name: department,
      doctor: doctor_id,
      appointment_date: formData.date,
      timeslot: formData.time,
      patient_name: formData.name,
      patient_email: formData.email,
      patient_phone: formData.phone,
      reason_to_visit: formData.reason,
    };

     console.log("Payload before sending:", payload);



  
    // API call to your Django backend (adjust URL as necessary)
    axios
      .post("http://127.0.0.1:8000/api/appointments/create/", payload)
      .then((response) => {
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
        }, 10000);

        
        // Optionally, you could redirect or show a success message here.
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

       
          
            <div>
          
              
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
      
            </div>
        
        
         
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
