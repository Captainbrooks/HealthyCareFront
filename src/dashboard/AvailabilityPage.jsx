import React, { useEffect, useState } from 'react'
import { CalendarIcon, SaveIcon, CheckIcon } from 'lucide-react'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
import { CircleAlert } from 'lucide-react'
import toast from 'react-hot-toast'
import Loader from '../components/Loader'
import axiosClient from '../api/axios'

const daysOfWeek = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
]



const AvailabilityPage = () => {

  const [doctor_id, setDoctorId] = useState()
  const [currentavailability, setCurrentAvailability] = useState([])
  const [fetchloading, setFetchLoading] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleAvailabilityChange = (day, checked) => {
    setCurrentAvailability((prevState) =>
      checked
        ? [...prevState, day]
        : prevState.filter((item) => item !== day)
    );
  };



  useEffect(() => {

    const accessToken = localStorage.getItem("access_token")

    if (accessToken) {
      const decoded = jwtDecode(accessToken)

      console.log("doctor dashboard home at availability")

      if (decoded.username) {
        setDoctorId(decoded.id)
        return;
      }
    }



  }, [])

  useEffect(() => {
    if (doctor_id) {

      setFetchLoading(true)
      setError("")

      const fetchDoctorAvailability = async () => {

        try {
          const response = await axiosClient.get(`/api/doctors/availability/${doctor_id}`, {
            withCredentials: true
          })

          console.log("response at dashboard availibilty", response.data.availability)

          setCurrentAvailability(response.data.availability)
          setFetchLoading(false)


        } catch (error) {
          console.log("error", error)
          setFetchLoading(false)
          setError("We couldn’t reach the server. Please check your internet connection or try again shortly.")
        } finally {
          setFetchLoading(false)
        }

      }

      fetchDoctorAvailability()

    }
  }, [doctor_id])

  const handleSave = async () => {

    if (currentavailability.length < 3) {
      toast.error("Please select at least 3 days..")
      return
    }







    try {

      setLoading(true)

      const response = await axiosClient.patch(`/api/doctors/${doctor_id}/update-availability/`,
        {
          availability: currentavailability,
          withCredentials: true
        });

      toast.success("Availability updated successfully");
      setLoading(false)

    } catch (error) {
      toast.error("Failed to update the availability " + error)
      setLoading(false)

    } finally {
      setLoading(false)
    }



  }


  if (error) {
    return (
      <div className="my-8 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 shadow-sm">
        {/* Alert icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 flex-shrink-0 text-red-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v4m0 4h.01M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93"
          />
        </svg>

        {/* Message */}
        <p className="text-sm font-medium text-red-700">
          {error}
        </p>
      </div>
    );
  }

  return (
    <>

      {!fetchloading ? (<div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manage Availability</h1>
          <p className="text-gray-600">Set your weekly schedule and working hours</p>
        </div>



        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center">
              <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
              <h2 className="text-lg font-medium text-gray-900">Weekly Schedule</h2>
            </div>
          </div>

          <div className="px-6 py-4">
            {daysOfWeek.map((day) => (
              <div
                key={day}
                className="py-4 border-b border-gray-200 last:border-b-0"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id={`available-${day}`}
                      type="checkbox"
                      checked={currentavailability.includes(day)}
                      onChange={(e) =>
                        handleAvailabilityChange(day, e.target.checked)
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor={`available-${day}`}
                      className="ml-2 block text-sm font-medium text-gray-700"
                    >
                      {day}
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="px-6 py-4 bg-gray-50 flex justify-end">
            <button
              disabled={loading ? true : false}
              onClick={handleSave}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <SaveIcon className="h-4 w-4 mr-2" />
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>) :

        <div className='my-10 p-10'><Loader /> </div>
      }

    </>
  )
}

export default AvailabilityPage
