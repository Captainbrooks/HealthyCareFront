
import { useState, useEffect } from 'react'
import { CheckIcon, XIcon, ClockIcon } from 'lucide-react'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast';



const AppointmentsList = ({ limit }) => {
  const navigate = useNavigate()


  const [appointments, setAppointments] = useState([])
  const [doctor_id, setDoctor_id] = useState(null)











  useEffect(() => {

    const accessToken = localStorage.getItem("access_token")

    if (accessToken) {
      const decoded = jwtDecode(accessToken)

      console.log("doctor dashboard home")

      if (decoded.username) {
        setDoctor_id(decoded.id)
        return;
      }
    }










  }, [])



  const formatTime = (timeStr) => {
    const [hour, minute] = timeStr.split(":");
    const date = new Date();
    date.setHours(+hour);
    date.setMinutes(+minute);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };




  useEffect(() => {

    if (doctor_id) {


      const fetchTodayAppointments = async () => {

        try {
          const response = await axios.get(`http://localhost:8000/api/appointments/list/?doctor=${doctor_id}`, {
            withCredentials: true
          })

          console.log("response", response.data)

          const formattedData = response.data.map((item) => ({
            id: item.patient.id,
            patient_name: item.patient.full_name,
            age: 35, // Replace with actual data if available
            time: `${formatTime(item.timeslot.start_time)} - ${formatTime(item.timeslot.end_time)}`,
            type: item.reason_to_visit || 'General',
            status: item.status, // Default to 'scheduled', unless you have a status field
            avatar: `https://api.dicebear.com/6.x/initials/svg?seed=${item.patient.full_name}`
          }));

          setAppointments(formattedData);

        } catch (error) {
          console.log("error", error)
        }






      }

      fetchTodayAppointments()
    }
  }, [doctor_id])







  const displayAppointments = limit
    ? appointments.slice(0, limit)
    : appointments
  const handleStatusChange = async (id, newStatus) => {



    try {

      const response = await axios.put(`http://localhost:8000/api/appointments/${id}/status/`,
        {
          status: newStatus,
          withCredentials: true
        });

      setAppointments((prev) =>
        prev.map((appt) =>
          appt.id === id ? { ...appt, status: newStatus } : appt
        )
      );





      toast.success('Appointment status updated');




    } catch (error) {
      console.error('Failed to update status:', error);
      toast.error("Failed to update status : " + error.message);
    }
  }
  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
            Completed
          </span>
        )
      case 'cancelled':
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
            Cancelled
          </span>
        )
      case 'in-progress':
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
            In Progress
          </span>
        )
      default:
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
            Scheduled
          </span>
        )
    }
  }

  const handleViewHistory = (patientId) => {
    navigate(`/patient/${patientId}`)
  }







  return (
    <div className="overflow-x-auto w-full flex justify-center">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Patient
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Time
            </th>
            <th
              scope="col"
              className="px-6  py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {displayAppointments.map((appointment) => (
            
            <tr
              key={appointment.id}
              className={appointment.status === 'cancelled' ? 'bg-gray-50' : ''}
            >
              
                

              
              
              
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="h-10 w-10 flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={appointment.avatar}
                      alt=""
                      onClick={() => handleViewHistory(appointment.id)}
                    />
                  </div>
                  <div className="ml-4 cursor-pointer" onClick={() => handleViewHistory(appointment.id)}>


                    <div className="text-sm font-medium text-gray-900">
                      {appointment.patient_name}
                    </div>

                    <div className="text-sm text-gray-500">
                      {appointment.age} years old
                    </div>
                  </div>

                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{appointment.time}</div>
              </td>


              <td className="px-6 py-4 whitespace-nowrap">
                {getStatusBadge(appointment.status)}
              </td>


              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                {appointment.status !== 'completed' &&
                  appointment.status !== 'cancelled' && (
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() =>
                          handleStatusChange(appointment.id, 'completed')
                        }
                        className="p-1 rounded-full text-green-600 hover:bg-green-50"
                        title="Mark as completed"
                      >
                        <CheckIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() =>
                          handleStatusChange(appointment.id, 'cancelled')
                        }
                        className="p-1 rounded-full text-red-600 hover:bg-red-50"
                        title="Cancel appointment"
                      >
                        <XIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() =>
                          handleStatusChange(appointment.id, 'in-progress')
                        }
                        className="p-1 rounded-full text-yellow-600 hover:bg-yellow-50"
                        title="Mark as in progress"
                      >
                        <ClockIcon className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                {(appointment.status === 'completed' ||
                  appointment.status === 'cancelled') && (
                    <span className="text-gray-400">No actions available</span>
                  )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  )
}
export default AppointmentsList
