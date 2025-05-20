import React, {useEffect, useState } from 'react'
import { SearchIcon, FilterIcon } from 'lucide-react'
import AppointmentsList from './AppointmentList'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
const AppointmentsPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterOpen, setFilterOpen] = useState(false)
   const [doctor_id, setDoctor_id] = useState(null)
  const navigate=useNavigate()


    useEffect(() => {
      const accessToken = localStorage.getItem('access_token')
  
      if (accessToken) {
        const decoded = jwtDecode(accessToken)
  
        if (decoded.username) {
          setDoctor_id(decoded.id)
          return
        }
      }
    }, [doctor_id])


  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Appointments</h1>
        <p className="text-gray-600">Manage your patient appointments</p>
      </div>
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search patients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="relative">
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <FilterIcon className="h-5 w-5 mr-2 text-gray-400" />
                Filter
              </button>
              {filterOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                  <div
                    className="py-1 divide-y divide-gray-100"
                    role="menu"
                    aria-orientation="vertical"
                  >
                    <div className="px-4 py-2">
                      <p className="text-sm font-medium text-gray-700">
                        Status
                      </p>
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center">
                          <input
                            id="filter-scheduled"
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <label
                            htmlFor="filter-scheduled"
                            className="ml-2 text-sm text-gray-700"
                          >
                            Scheduled
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="filter-completed"
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <label
                            htmlFor="filter-completed"
                            className="ml-2 text-sm text-gray-700"
                          >
                            Completed
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="filter-cancelled"
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <label
                            htmlFor="filter-cancelled"
                            className="ml-2 text-sm text-gray-700"
                          >
                            Cancelled
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-2">
                      <p className="text-sm font-medium text-gray-700">Type</p>
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center">
                          <input
                            id="filter-checkup"
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <label
                            htmlFor="filter-checkup"
                            className="ml-2 text-sm text-gray-700"
                          >
                            Check-up
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="filter-followup"
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <label
                            htmlFor="filter-followup"
                            className="ml-2 text-sm text-gray-700"
                          >
                            Follow-up
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="filter-consultation"
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <label
                            htmlFor="filter-consultation"
                            className="ml-2 text-sm text-gray-700"
                          >
                            Consultation
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-2 flex justify-end">
                      <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md">
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <AppointmentsList />
      </div>
    </div>
  )
}
export default AppointmentsPage
