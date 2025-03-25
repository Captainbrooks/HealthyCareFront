import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const DepartmentCard = ({ department }) => {
  const Icon = department.icon;
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="bg-blue-50 p-3 rounded-lg">
            <Icon className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 ml-3">
            {department.name}
          </h3>
        </div>
        <p className="text-gray-600 mb-4">{department.description}</p>
        <div className="border-t border-gray-100 pt-4">
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <span className="font-medium">{department.doctorCount}</span>
            <span className="ml-1">Doctors</span>
          </div>
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Key Specialties:
            </h4>
            <div className="flex flex-wrap gap-2">
              {department.specialties.map((specialty, index) => (
                <span
                  key={index}
                  className="inline-block bg-gray-50 text-gray-600 text-xs px-2 py-1 rounded"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>
          <Link
            to={`/find-doctors?department=${department.name}`}
            className="inline-flex items-center text-blue-600 text-sm font-medium hover:text-blue-700"
          >
            Find Doctors
            <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DepartmentCard;
