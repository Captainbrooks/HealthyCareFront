import React from 'react';
import { Star, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const DoctorCard = ({ doctor }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <div className="flex flex-col h-full">
        <div className="p-4 flex items-start space-x-4">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-24 h-24 object-cover rounded-full"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-900">{doctor.name}</h3>
            <p className="text-blue-600">{doctor.specialty}</p>
            <div className="flex items-center mt-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="ml-1 text-sm font-medium">{doctor.rating}</span>
              <span className="ml-1 text-sm text-gray-500">({doctor.reviews} reviews)</span>
            </div>
            <p className="mt-1 text-sm text-gray-500">{doctor.education}</p>
            <p className="text-sm text-gray-500">{doctor.experience} experience</p>
          </div>
        </div>
        <div className="mt-auto border-t border-gray-100">
          <div className="p-4">
            <div className="flex items-center text-sm">
              <div
                className={`w-2 h-2 rounded-full mr-2 ${doctor.availability.includes('Today') ? 'bg-green-500' : 'bg-yellow-500'}`}
              ></div>
              <span
                className={`${doctor.availability.includes('Today') ? 'text-green-700' : 'text-yellow-700'}`}
              >
                {doctor.availability}
              </span>
            </div>
            <div className="mt-4 flex space-x-3">
              <Link to={`/doctor/${doctor.id}`} className="flex-1">
                <button className="w-full bg-white border border-blue-600 text-blue-600 px-3 py-2 rounded text-sm hover:bg-blue-50 transition-colors">
                  View Profile
                </button>
              </Link>
              <Link to={`/bookappointment/${doctor.id}`} className="flex-1">
                <button className="w-full bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition-colors flex items-center justify-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Book Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
