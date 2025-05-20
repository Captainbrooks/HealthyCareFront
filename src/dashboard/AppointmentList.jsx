
import { useState, useEffect } from 'react'
import { CheckIcon, XIcon, ClockIcon, CalendarCheck } from 'lucide-react'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast';
import Loader from '../components/Loader'
import { useLocation } from 'react-router-dom'


const AppointmentsList = ({ limit }) => {
  const navigate = useNavigate()
  const location = useLocation()



  const [appointments, setAppointments] = useState([])
  const [doctor_id, setDoctor_id] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")


  useEffect(() => {

    const accessToken = localStorage.getItem("access_token")

    if (accessToken) {
      const decoded = jwtDecode(accessToken)


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
      setError("")
      setLoading(true)



      const fetchTodayAppointments = async () => {

        try {
          const response = await axios.get(`http://localhost:8000/api/appointments/list/?doctor=${doctor_id}`, {
            withCredentials: true
          })


          const today = new Date().toISOString().split('T')[0];

          const todaysAppointments = response.data.filter(
            (item) => item.timeslot_data.appointment_date === today
          );






          let isSorting = todaysAppointments


          if (!(location.pathname === "/dashboard/appointments")) {
            isSorting = todaysAppointments
          } else {
            isSorting = response.data
          }





          const sortedData = [...isSorting].sort((a, b) => {
            const dateA = new Date(a.timeslot_data.appointment_date);
            const dateB = new Date(b.timeslot_data.appointment_date);

            if (dateA.getTime() === dateB.getTime()) {
              // Compare timeslot.start_time if same date
              return a.timeslot_data.start_time.localeCompare(b.timeslot_data.start_time);
            }
            return dateA - dateB;
          });


          function humanDateLabel(isoDate) {
            const msPerDay = 24 * 60 * 60 * 1000;

            // Parse parts manually to avoid timezone shifts:
            const [year, month, day] = isoDate.split('-').map(Number);
            const targetUtc = Date.UTC(year, month - 1, day);

            const now = new Date();
            const todayUtc = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());

            const diffDays = Math.round((targetUtc - todayUtc) / msPerDay);

            if (diffDays === 0) return "Today";
            if (diffDays === 1) return "Tomorrow";
            if (diffDays > 1) return `In ${diffDays} days`;
            if (diffDays === -1) return "Yesterday";
            return diffDays < 0
              ? `${Math.abs(diffDays)} days ago`
              : `${diffDays} days from now`;
          }



          const formattedData = sortedData.map((item) => {
            const label = humanDateLabel(item.timeslot_data.appointment_date);

            return {
              id: item.patient_data.id,
              patient_name: item.patient_data.full_name,
              appointment_actual_date: label,
              age: item.patient_data.age, // Replace with actual data if available
              time: `${formatTime(item.timeslot_data.start_time)} - ${formatTime(item.timeslot_data.end_time)}`,
              timeId: item.timeslot_data.id,
              type: item.reason_to_visit || 'General',
              status: item.status, // Default to 'scheduled', unless you have a status field
              avatar: `https://api.dicebear.com/6.x/initials/svg?seed=${item.patient_data.full_name}`
            }
          });




          setAppointments(formattedData);
          setLoading(false)


        } catch (error) {
          setLoading(false)
          setError("We couldn’t reach the server. Please check your internet connection or try again shortly.")
        } finally {
          setLoading(false)
        }
      }

      fetchTodayAppointments()
    }
  }, [doctor_id])







  const displayAppointments = limit
    ? appointments.slice(0, limit)
    : appointments
  const handleStatusChange = async (id, timeid, newStatus) => {


    if (newStatus === "cancelled") {

      const confirmed = window.confirm("Are you sure you want to cancel this appointment?");
      if (!confirmed) return;
    }

    try {

      const response = await axios.put(`http://localhost:8000/api/appointments/${id}/${timeid}/`,
        {
          status: newStatus,
          withCredentials: true
        });

      setAppointments(prev =>
        prev.map(appt =>
          appt.id === id && appt.timeId === timeid
            ? { ...appt, status: newStatus }
            : appt
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




  if (error) {
    return (
      <div className="my-8 flex flex-col items-center justify-between rounded-lg border-red-200 bg-red-50 p-4 shadow-sm">
        <div className='inline-flex gap-2'>
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
      </div>
    );
  }


  return (


    <>

      {
        !loading ? <>

          <div className={`w-full flex justify-center items-center my-4 ${displayAppointments && displayAppointments.length > 0 ? 'hidden' : 'block'}`}>
            <div className="text-center flex items-center gap-2 text-gray-600">
              <CalendarCheck className="w-5 h-5 text-gray-500" />

              <span className="text-base font-medium my-4">You're all caught up! No appointments</span>
            </div>
          </div>


          <div className={`overflow-x-auto w-full flex justify-center ${displayAppointments && displayAppointments.length > 0 ? 'block' : 'hidden'}`}>

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


                {

                  location.pathname === "/dashboard/appointments" &&
                  displayAppointments &&

                  (
                    <>

                      {



                        displayAppointments.filter(appointment => appointment.status !== 'completed')

                          .map((appointment) => (

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
                                <div className="flex flex-col space-y-1">
                                  {/* Primary: time range, bold */}
                                  <span className="text-sm font-medium text-gray-900">
                                    {appointment.time}
                                  </span>

                                  {/* Secondary: date label with subtle styling */}
                                  <span className="text-xs text-gray-500">
                                    {appointment.date_label} ({appointment.appointment_actual_date})
                                  </span>
                                </div>
                              </td>

                              <td className="px-6 py-4 whitespace-nowrap">
                                {getStatusBadge(appointment.status)}
                              </td>


                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                {appointment.status !== 'completed' &&
                                  appointment.status !== 'cancelled' && (
                                    <div className="flex justify-end space-x-2">

                                      {
                                        location.pathname !== "/dashboard/appointments" ?
                                          <button
                                            onClick={() =>
                                              handleStatusChange(appointment.id, appointment.timeId, 'completed')
                                            }
                                            className="p-1 rounded-full text-green-600 hover:bg-green-50"
                                            title="Mark as completed"
                                          >
                                            <CheckIcon className="h-5 w-5" />
                                          </button> :

                                          ""
                                      }

                                      {location.pathname !== "/dashboard/appointments" ?
                                        <button
                                          onClick={() =>
                                            handleStatusChange(appointment.id, appointment.timeId, 'cancelled')
                                          }
                                          className={`
                            p-1 rounded-full transition-colors duration-200
                            ${appointment.status === 'in-progress'
                                              ? 'text-gray-400 cursor-not-allowed hover:bg-transparent'
                                              : 'text-red-600 hover:bg-red-50'
                                            }
                          `}
                                          title="Cancel appointment"
                                          disabled={appointment.status === 'in-progress'}
                                        >
                                          <XIcon className="h-5 w-5" />
                                        </button>


                                        :
                                        (
                                          <button
                                            onClick={() =>
                                              handleStatusChange(appointment.id, appointment.timeId, 'cancelled')
                                            }
                                            className={`
                              px-6 py-2 rounded-lg text-white transition-all duration-200 shadow-sm
                              ${appointment.status === 'in-progress'
                                                ? 'bg-gray-400 cursor-not-allowed hover:bg-gray-400'
                                                : 'bg-red-500 hover:bg-red-600 shadow-md'
                                              }
                            `}
                                            title="Cancel appointment"
                                            disabled={appointment.status === 'in-progress'}
                                          >
                                            Cancel
                                          </button>

                                        )


                                      }

                                      {
                                        location.pathname !== "/dashboard/appointments" ?
                                          <button
                                            onClick={() =>
                                              handleStatusChange(appointment.id, appointment.timeId, 'in-progress')
                                            }
                                            className="p-1 rounded-full text-yellow-600 hover:bg-yellow-50"
                                            title="Mark as in progress"
                                          >
                                            <ClockIcon className="h-5 w-5" />
                                          </button> :
                                          ""

                                      }
                                    </div>
                                  )}
                                {(appointment.status === 'completed' ||
                                  appointment.status === 'cancelled') && (
                                    <span className="text-gray-400">No actions available</span>
                                  )}
                              </td>

                            </tr>

                          ))}


                      {displayAppointments.filter(a => a.status !== 'completed').length === 0 && (
                        <tr>
                          <td colSpan={6} className="py-6 text-center text-sm text-gray-500">
                            No pending appointments.
                          </td>
                        </tr>
                      )}

                    </>
                  )}










                {

                  displayAppointments && location.pathname !== "/dashboard/appointments" &&



                  displayAppointments.map((appointment) => (



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
                        <div className="flex flex-col space-y-1">
                          {/* Primary: time range, bold */}
                          <span className="text-sm font-medium text-gray-900">
                            {appointment.time}
                          </span>

                          {/* Secondary: date label with subtle styling */}
                          <span className="text-xs text-gray-500">
                            {appointment.date_label} ({appointment.appointment_actual_date})
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(appointment.status)}
                      </td>


                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {appointment.status !== 'completed' &&
                          appointment.status !== 'cancelled' && (
                            <div className="flex justify-end space-x-2">

                              {
                                location.pathname !== "/dashboard/appointments" ?
                                  <button
                                    onClick={() =>
                                      handleStatusChange(appointment.id, appointment.timeId, 'completed')
                                    }
                                    className="p-1 rounded-full text-green-600 hover:bg-green-50"
                                    title="Mark as completed"
                                  >
                                    <CheckIcon className="h-5 w-5" />
                                  </button> :

                                  ""
                              }

                              {location.pathname !== "/dashboard/appointments" ?
                                <button
                                  onClick={() =>
                                    handleStatusChange(appointment.id, appointment.timeId, 'cancelled')
                                  }
                                  className={`
                            p-1 rounded-full transition-colors duration-200
                            ${appointment.status === 'in-progress'
                                      ? 'text-gray-400 cursor-not-allowed hover:bg-transparent'
                                      : 'text-red-600 hover:bg-red-50'
                                    }
                          `}
                                  title="Cancel appointment"
                                  disabled={appointment.status === 'in-progress'}
                                >
                                  <XIcon className="h-5 w-5" />
                                </button>


                                :
                                (
                                  <button
                                    onClick={() =>
                                      handleStatusChange(appointment.id, appointment.timeId, 'cancelled')
                                    }
                                    className={`
                              px-6 py-2 rounded-lg text-white transition-all duration-200 shadow-sm
                              ${appointment.status === 'in-progress'
                                        ? 'bg-gray-400 cursor-not-allowed hover:bg-gray-400'
                                        : 'bg-red-500 hover:bg-red-600 shadow-md'
                                      }
                            `}
                                    title="Cancel appointment"
                                    disabled={appointment.status === 'in-progress'}
                                  >
                                    Cancel
                                  </button>

                                )


                              }

                              {
                                location.pathname !== "/dashboard/appointments" ?
                                  <button
                                    onClick={() =>
                                      handleStatusChange(appointment.id, appointment.timeId, 'in-progress')
                                    }
                                    className="p-1 rounded-full text-yellow-600 hover:bg-yellow-50"
                                    title="Mark as in progress"
                                  >
                                    <ClockIcon className="h-5 w-5" />
                                  </button> :
                                  ""

                              }
                            </div>
                          )}
                        {(appointment.status === 'completed' ||
                          appointment.status === 'cancelled') && (
                            <span className="text-gray-400">No actions available</span>
                          )}
                      </td>

                    </tr>

                    // up to here
                  ))}
              </tbody>
            </table>
          </div>

        </> :

         <div className='p-10 my-10'>
          <Loader />
         </div> 
      }





    </>

  )
}
export default AppointmentsList
