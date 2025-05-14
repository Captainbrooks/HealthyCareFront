import React, { useEffect, useState } from 'react'
import { CalendarIcon, SaveIcon, CheckIcon } from 'lucide-react'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
import { CircleAlert } from 'lucide-react'
import toast from 'react-hot-toast'
const daysOfWeek = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
]








const AvailabilityPage = () => {
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [doctor_id, setDoctorId] = useState()
  const [currentavailability, setCurrentAvailability] = useState([])
  const [loading,setLoading]=useState(false)

  const handleAvailabilityChange = (day,checked) => {
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

      const fetchDoctorAvailability = async () => {

        try {
          const response = await axios.get(`http://localhost:8000/api/doctors/availability/${doctor_id}`, {
            withCredentials: true
          })

          console.log("response at dashboard availibilty", response.data.availability)

          setCurrentAvailability(response.data.availability)

        } catch (error) {
          console.log("error", error)
        }

      }

      fetchDoctorAvailability()

    }
  }, [doctor_id])

  const handleSave = async() => {



    
    

    try {

      setLoading(true)

      const response=await axios.patch(`http://localhost:8000/api/doctors/${doctor_id}/update-availability/`,
        {
          availability:currentavailability,
          withCredentials: true  
      });

      console.log("Updated", response.data)
      toast.success("Availability updated successfully");
      setLoading(false)
      
    } catch (error) {
      toast.error("Failed to update the availability " + error.messsage)
      setLoading(false)
    }finally{
      setLoading(false)
    }

   

  }

  return (
    <div className="space-y-6">
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
            disabled={loading ? true:false}
            onClick={handleSave}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <SaveIcon className="h-4 w-4 mr-2" />
           {loading ? 'Saving...':'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AvailabilityPage
