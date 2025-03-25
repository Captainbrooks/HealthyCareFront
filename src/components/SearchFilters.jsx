import React from 'react';
import { Search, Filter } from 'lucide-react';

const SearchFilters = ({
  searchTerm,
  setSearchTerm,
  selectedSpecialty,
  setSelectedSpecialty,
  availabilityToday,
  setAvailabilityToday,
  specialties,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 -mt-12">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search doctors by name"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="lg:w-1/4">
          <select
            className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
          >
            {specialties.map((specialty) => (
              <option key={specialty} value={specialty}>
                {specialty}
              </option>
            ))}
          </select>
        </div>
        <div className="lg:w-auto flex items-center">
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              checked={availabilityToday}
              onChange={(e) => setAvailabilityToday(e.target.checked)}
            />
            <span className="ml-2 text-gray-700">Available Today</span>
          </label>
        </div>
        <div className="lg:w-auto">
          <button className="w-full lg:w-auto bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 flex items-center justify-center">
            <Filter className="w-4 h-4 mr-2" />
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
