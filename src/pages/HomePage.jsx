import React from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  Phone,
  Clock,
  Users,
  Building2,
  ChevronRight,
} from "lucide-react";

import Doctor from "../assets/doc.avif";
import Header from "../components/Header";
import Footer from "../components/Footer";
import About from "./About";

export function HomePage() {
  return (
    <div className="w-full min-h-screen bg-gray-50 font-sans">
      <Header />

      {/* Hero Section */}
      <div
        className="relative h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "linear-gradient(to bottom right, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://www.cgarchitect.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBenNMQVE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ%3D%3D--aabdb578a7c815ec97e29bcd09518c17023a7cb6/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9VY21WemFYcGxYM1J2WDJ4cGJXbDBXd2RwQXFnQ01Eb0tjMkYyWlhKN0Jqb01jWFZoYkdsMGVXbGsiLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ%3D%3D--71ea0a37f5deb16245f58d9692d8ff87c9db5ace/001b51b4.jpg')",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4 sm:px-8 max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 drop-shadow-md">
              <span className="bg-gradient-to-r from-red-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent">
                Your Health Is Our Priority
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-200 mb-8 leading-relaxed">
              Access world-class healthcare services with our easy-to-use
              patient portal. Book appointments, view medical records, and
              connect with healthcare professionals.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/bookappointment">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-md transition">
                  Book Appointment
                </button>
              </Link>
              <Link to="/emergencycontacts">
                <button className="bg-white/10 border border-white/30 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-lg text-lg font-semibold transition">
                  Emergency Contact
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>



      {/* Features */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <Calendar className="text-blue-600 w-8 h-8 mb-4" />,
              title: "Book Appointment",
              desc: "Schedule your visit with our specialists",
              link: "/bookappointment",
              cta: "Book Now",
            },
            {
              icon: <Users className="text-blue-600 w-8 h-8 mb-4" />,
              title: "Find Doctors",
              desc: "Search our network of professionals",
              link: "/find-doctors",
              cta: "Search",
            },
            {
              icon: <Building2 className="text-blue-600 w-8 h-8 mb-4" />,
              title: "Departments",
              desc: "Explore our specialized departments",
              link: "/departments",
              cta: "View All",
            },
            {
              icon: <Clock className="text-blue-600 w-8 h-8 mb-4" />,
              title: "Opening Hours",
              desc: "Explore our hours of operations",
              link: "/opening-hours",
              cta: "Learn More",
            },
          ].map((item, index) => (
            <Link key={index} to={item.link}>
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-transform hover:-translate-y-1 duration-200">
                {item.icon}
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.desc}</p>
                <div className="text-blue-600 flex items-center hover:underline">
                  {item.cta}
                  <ChevronRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <About />
      <Footer />
    </div>
  );
}
