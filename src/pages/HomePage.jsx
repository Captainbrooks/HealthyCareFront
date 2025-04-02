import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  Phone,
  Clock,
  Users,
  Building2,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

import Health from '../assets/Health.png'
import Doctor from '../assets/doc.avif'
import Header from "../components/Header";
import Footer from "../components/Footer";
export function HomePage() {

  return (
    <div className="w-full min-h-screen bg-gray-50">
<Header/>

      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-1/2">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Your Health Is Our Priority
              </h1>
              <p className="text-gray-600 mb-8">
                Access world-class healthcare services with our easy-to-use
                patient portal. Book appointments, view medical records, and
                connect with healthcare professionals.
              </p>
              <div className="space-x-4">
                <Link to="/bookappointment">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700">
                  Book Appointment
                </button></Link>
               <Link to={"/emergencycontacts"}> <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-md hover:bg-blue-50">
                  Emergency Contact
                </button></Link>
              </div>
            </div>
            <div className="hidden lg:block lg:w-1/2">
              <img
                src={Doctor}
                alt="Medical professionals"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link to="/bookappointment"> <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Calendar className="text-blue-600 w-8 h-8 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Book Appointment</h3>
              <p className="text-gray-600 mb-4">
                Schedule your visit with our specialists
              </p>
              <button className="text-blue-600 flex items-center">
                Book Now <ChevronRight className="w-4 h-4 ml-2" />
              </button>
            </div>
            </Link> 
            <Link to="/find-doctors"> <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Users className="text-blue-600 w-8 h-8 mb-4" />
         <h3 className="text-lg font-semibold mb-2">Find Doctors</h3>
              <p className="text-gray-600 mb-4">
                Search our network of professionals
              </p>
              <button className="text-blue-600 flex items-center">
                Search <ChevronRight className="w-4 h-4 ml-2" />
              </button>
            </div>
            </Link>

            <Link to="/departments">
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Building2 className="text-blue-600 w-8 h-8 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Departments</h3>
              <p className="text-gray-600 mb-4">
                Explore our specialized departments
              </p>
              <button className="text-blue-600 flex items-center">
                View All <ChevronRight className="w-4 h-4 ml-2" />
              </button>
            </div>
            </Link>
            <Link to="/opening-hours">
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Clock className="text-blue-600 w-8 h-8 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Opening Hours</h3>
              <p className="text-gray-600 mb-4">Check our working hours</p>
              <button className="text-blue-600 flex items-center">
                Learn More <ChevronRight className="w-4 h-4 ml-2" />
              </button>
            </div>
            </Link>
          </div>
        </div>
      </div>
    <Footer/>
    </div>
  );
}
