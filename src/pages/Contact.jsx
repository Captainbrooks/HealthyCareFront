import React, { useState } from 'react';

import  Footer  from '../components/Footer';
import  Header  from '../components/Header';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Building2,
  Calendar,
  MessageSquare,
} from 'lucide-react';

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
// Fix for default marker icon in leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function Contact() {
    const [messagesuccess,setMessageSuccess]=useState(false)
    const [messageFailure,setMessageFailure]=useState(false)
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    department: '',
    message: '',
  });


  const payload={
    fullname:formData.fullname,
    email:formData.email,
    phone:formData.phone,
    department:formData.department,
    message:formData.message

  }

  const handleSubmit = (e) => {
    setMessageSuccess(false)
    setMessageFailure(false)
    e.preventDefault();
    // Handle form submission here

    axios.post("http://127.0.0.1:8000/api/appointments/message/",payload)
    .then((response)=>{


      setMessageSuccess(true)
      setMessageFailure(false)

      setTimeout(()=>{
        setFormData({
          fullname:"",
          email:"",
          phone:"",
          department:"",
          message:""
        });
        setMessageSuccess(false)
        setMessageFailure(false)
      },5000)

    }).catch((error)=>{
      console.log("there was an error", error)
     
      setMessageFailure(true)
      setMessageSuccess(false)
    })
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const departments = [
    'General Medicine',
    'Cardiology',
    'Neurology',
    'Pediatrics',
    'Orthopedics',
    'Ophthalmology',
    'Emergency',
  ];

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6 text-blue-600" />,
      title: 'Phone',
      details: ['+1 234 567 8900', '+1 234 567 8901'],
    },
    {
      icon: <Mail className="w-6 h-6 text-blue-600" />,
      title: 'Email',
      details: ['contact@healthycare.com', 'support@healthycare.com'],
    },
    {
      icon: <MapPin className="w-6 h-6 text-blue-600" />,
      title: 'Location',
      details: ['123 Medical Center Drive', 'New York, NY 10001'],
    },
    {
      icon: <Clock className="w-6 h-6 text-blue-600" />,
      title: 'Working Hours',
      details: [
        'Monday - Friday: 8:00 AM - 8:00 PM',
        'Saturday: 8:00 AM - 2:00 PM',
      ],
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50">
    <Header/>
      {/* Hero Section */}
      <div className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Get in touch with our medical professionals and support team for
              any inquiries or assistance
            </p>
          </div>
        </div>
      </div>
      {/* Contact Information Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0">{info.icon}</div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold mb-2">{info.title}</h3>
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-600">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="fullname"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="department"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Department
                </label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a department</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
              >
                Send Message
              </button>
            </form>

                   <div className='my-2'>{!messagesuccess && messageFailure && <Alert severity="warning" >Failed to send your message. Please try again later.</Alert>}</div>
                   <div className='my-2'>{!messageFailure && messagesuccess && <Alert severity="success">Your message has been sent successfully! We will get back to you shortly via email.</Alert>}</div>
          </div>
          {/* Map */}
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Our Location</h2>
            <div className="h-[400px] rounded-lg overflow-hidden">
              <MapContainer
                center={[40.7128, -74.006]}
                zoom={13}
                style={{
                  height: '100%',
                  width: '100%',
                }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[40.7128, -74.006]}>
                  <Popup>
                    HealthyCare Medical Center
                    <br />
                    123 Medical Center Drive
                    <br />
                    New York, NY 10001
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
      {/* Department Contact Information */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Department Contacts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
              <Building2 className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Emergency Department
              </h3>
              <p className="text-gray-600 mb-4">Available 24/7</p>
              <p className="text-gray-600">Phone: +1 234 567 8900</p>
            </div>
            <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
              <Calendar className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Appointments</h3>
              <p className="text-gray-600 mb-4">Monday - Friday: 9:00 AM - 5:00 PM</p>
              <p className="text-gray-600">Phone: +1 234 567 8901</p>
            </div>
            <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
              <MessageSquare className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">General Inquiry</h3>
              <p className="text-gray-600 mb-4">Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p className="text-gray-600">Email: support@healthycare.com</p>
            </div>
          </div>
        </div>


      </div>
   
      <Footer />
    </div>
  );
}

export default Contact;
