import React, { useEffect, useState } from 'react'
import { CheckIcon, XIcon, ClockIcon, CalendarCheck, TrashIcon } from 'lucide-react'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import Loader from '../components/Loader'
import { useLocation } from 'react-router-dom'
const AppointmentsList = ({ limit }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [appointments, setAppointments] = useState([])
  const [doctor_id, setDoctor_id] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  useEffect(() => {
    const accessToken = localStorage.getItem('access_token')
    if (accessToken) {
      const decoded = jwtDecode(accessToken)
      if (decoded.username) {
        setDoctor_id(decoded.id)
        return
      }
    }
  }, [])
  const formatTime = (timeStr) => {
    const [hour, minute] = timeStr.split(':')
    const date = new Date()
    date.setHours(+hour)
    date.setMinutes(+minute)
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })
  }
  useEffect(() => {
    if (doctor_id) {
      setError('')
      setLoading(true)

      const fetchAppointments = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/appointments/list/?doctor=${doctor_id}`,
            {
              withCredentials: true,
            },
          )
          const today = new Date().toISOString().split('T')[0]
          const todaysAppointments = response.data.filter(
            (item) => item.timeslot_data.appointment_date === today,
          )
          let isSorting = todaysAppointments
          if (!(location.pathname === '/dashboard/appointments')) {
            isSorting = todaysAppointments
          } else {
            isSorting = response.data
          }
          const sortedData = [...isSorting].sort((a, b) => {
            const dateA = new Date(a.timeslot_data.appointment_date)
            const dateB = new Date(b.timeslot_data.appointment_date)
            if (dateA.getTime() === dateB.getTime()) {
              return a.timeslot_data.start_time.localeCompare(
                b.timeslot_data.start_time,
              )
            }
            return dateA - dateB
          })
          function humanDateLabel(isoDate) {
            const msPerDay = 24 * 60 * 60 * 1000
            const [year, month, day] = isoDate.split('-').map(Number)
            const targetUtc = Date.UTC(year, month - 1, day)
            const now = new Date()
            const todayUtc = Date.UTC(
              now.getUTCFullYear(),
              now.getUTCMonth(),
              now.getUTCDate(),
            )
            const diffDays = Math.round((targetUtc - todayUtc) / msPerDay)
            if (diffDays === 0) return 'Today'
            if (diffDays === 1) return 'Tomorrow'
            if (diffDays > 1) return `In ${diffDays} days`
            if (diffDays === -1) return 'Yesterday'
            return diffDays < 0
              ? `${Math.abs(diffDays)} days ago`
              : `${diffDays} days from now`
          }
          const formattedData = sortedData.map((item) => {
            const label = humanDateLabel(item.timeslot_data.appointment_date)
            return {
              id: item.patient_data.id,
              patient_name: item.patient_data.full_name,
              appointment_actual_date: label,
              age: item.patient_data.age,
              time: `${formatTime(item.timeslot_data.start_time)} - ${formatTime(item.timeslot_data.end_time)}`,
              timeId: item.timeslot_data.id,
              type: item.reason_to_visit || 'General',
              status: item.status,
              avatar: `https://api.dicebear.com/6.x/initials/svg?seed=${item.patient_data.full_name}`,
            }
          })
          setAppointments(formattedData)
          setLoading(false)
        } catch (error) {
          setLoading(false)
          setError(
            "We couldn't reach the server. Please check your internet connection or try again shortly.",
          )
        } finally {
          setLoading(false)
        }
      }
      fetchAppointments()
    }
  }, [doctor_id])


  const displayAppointments = limit
    ? appointments.slice(0, limit)
    : appointments

    
  const handleStatusChange = async (id, timeid, newStatus) => {
    if (newStatus === 'cancelled') {
      const confirmed = window.confirm(
        'Are you sure you want to cancel this appointment?',
      )
      if (!confirmed) return
    }
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/appointments/${id}/${timeid}/`,
        {
          status: newStatus,
          withCredentials: true,
        },
      )
      setAppointments((prev) =>
        prev.map((appt) =>
          appt.id === id && appt.timeId === timeid
            ? {
              ...appt,
              status: newStatus,
            }
            : appt,
        ),
      )
      toast.success('Appointment status updated')
    } catch (error) {
      console.error('Failed to update status:', error)
      toast.error('Failed to update status : ' + error.message)
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

  const renderActionButtons = (appointment) => {
    if (
      appointment.status === 'completed' ||
      appointment.status === 'cancelled'
    ) {
      return <span className="text-gray-400 text-sm">No actions available</span>
    }
    return (
      <div className="flex justify-end space-x-2">
        {location.pathname !== '/dashboard/appointments' && (
          <>
            <button
              onClick={() =>
                handleStatusChange(
                  appointment.id,
                  appointment.timeId,
                  'completed',
                )
              }
              className="p-1 rounded-full text-green-600 hover:bg-green-50"
              title="Mark as completed"
            >
              <CheckIcon className="h-5 w-5" />
            </button>
            <button
              onClick={() =>
                handleStatusChange(
                  appointment.id,
                  appointment.timeId,
                  'in-progress',
                )
              }
              className="p-1 rounded-full text-yellow-600 hover:bg-yellow-50"
              title="Mark as in progress"
            >
              <ClockIcon className="h-5 w-5" />
            </button>
          </>
        )}
        {location.pathname !== '/dashboard/appointments' ? (
          <button
            onClick={() =>
              handleStatusChange(
                appointment.id,
                appointment.timeId,
                'cancelled',
              )
            }
            className={`p-1 rounded-full transition-colors duration-200 ${appointment.status === 'in-progress' ? 'text-gray-400 cursor-not-allowed hover:bg-transparent' : 'text-red-600 hover:bg-red-50'}`}
            title="Cancel appointment"
            disabled={appointment.status === 'in-progress'}
          >
            <XIcon className="h-5 w-5" />
          </button>
        ) : (
          <button
            onClick={() =>
              handleStatusChange(
                appointment.id,
                appointment.timeId,
                'cancelled',
              )
            }
            className={`px-4 py-1 rounded-lg text-white transition-all duration-200 shadow-sm text-sm ${appointment.status === 'in-progress' ? 'bg-gray-400 cursor-not-allowed hover:bg-gray-400' : 'bg-red-500 hover:bg-red-600 shadow-md'}`}
            title="Cancel appointment"
            disabled={appointment.status === 'in-progress'}
          >
            Cancel
          </button>
        )}
      </div>
    )
  }

  const getFilteredAppointments = () => {
    if (location.pathname === '/dashboard/appointments') {
      return displayAppointments.filter(
        (appointment) => appointment.status !== 'completed',
      )
    }
    return displayAppointments
  }

  const filteredAppointments = getFilteredAppointments()
  if (error) {
    return (
      <div className="my-8 flex flex-col items-center justify-between rounded-lg border-red-200 bg-red-50 p-4 shadow-sm">
        <div className="inline-flex gap-2">
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
          <p className="text-sm font-medium text-red-700">{error}</p>
        </div>
      </div>
    )
  }
  if (loading) {
    return (
      <div className="p-10 my-10">
        <Loader />
      </div>
    )
  }
  if (!filteredAppointments || filteredAppointments.length === 0) {
    return (
      <div className="w-full flex justify-center items-center my-4">
        <div className="text-center flex items-center gap-2 text-gray-600">
          <CalendarCheck className="w-5 h-5 text-gray-500" />
          <span className="text-sm md:text-base lg:text-xl font-medium my-4">
            You're all caught up! No appointments
          </span>
        </div>
      </div>
    )
  }
  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
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
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
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
            {filteredAppointments.map((appointment) => (
              <tr
                key={`${appointment.id}-${appointment.timeId}`}
                className={
                  appointment.status === 'cancelled' ? 'bg-gray-50' : ''
                }
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full cursor-pointer"
                        src={appointment.avatar}
                        alt=""
                        onClick={() => handleViewHistory(appointment.id)}
                      />
                    </div>
                    <div
                      className="ml-4 cursor-pointer"
                      onClick={() => handleViewHistory(appointment.id)}
                    >
                      <div className="text-sm font-medium text-gray-900">
                        {appointment.patient_name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {appointment.age ?? 'xx'} years old
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm font-medium text-gray-900">
                      {appointment.time}
                    </span>
                    <span className="text-xs text-gray-500">
                      {appointment.appointment_actual_date}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(appointment.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {renderActionButtons(appointment)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {filteredAppointments.map((appointment) => (
          <div
            key={`${appointment.id}-${appointment.timeId}`}
            className={`rounded-xl border shadow-sm transition-all duration-200 hover:shadow-md ${appointment.status === 'cancelled' ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200 hover:border-gray-300'}`}
          >
            {/* Patient Info Header */}
            <div className="flex items-center p-4 pb-3">
              <div className="h-14 w-14 flex-shrink-0">
                <img
                  className="h-14 w-14 rounded-full cursor-pointer ring-2 ring-gray-100 hover:ring-gray-200 transition-all duration-200"
                  src={appointment.avatar}
                  alt=""
                  onClick={() => handleViewHistory(appointment.id)}
                />
              </div>
              <div
                className="ml-4 flex-1 cursor-pointer"
                onClick={() => handleViewHistory(appointment.id)}
              >
                <div className="text-lg font-semibold text-gray-900 mb-1">
                  {appointment.patient_name}
                </div>
                <div className="text-sm text-gray-600">
                  {appointment.age ?? 'xx'} years old
                </div>
              </div>
              <div className="flex-shrink-0">
                {getStatusBadge(appointment.status)}
              </div>
            </div>
            {/* Time Info Card */}
            <div className="mx-4 mb-4">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
                <div className="flex items-center mb-2">
                  <ClockIcon className="h-4 w-4 text-blue-600 mr-2" />
                  <div className="text-base font-semibold text-gray-900">
                    {appointment.time}
                  </div>
                </div>
                <div className="flex items-center">
                  <CalendarCheck className="h-4 w-4 text-blue-500 mr-2" />
                  <div className="text-sm text-gray-600">
                    {appointment.appointment_actual_date}
                  </div>
                </div>
              </div>
            </div>
            {/* Actions Section */}
            <div className="px-4 pb-4">
              <div className="flex justify-center">
                {appointment.status === 'completed' ||
                  appointment.status === 'cancelled' ? (
                  <div className="text-center py-2">
                    <span className="text-gray-500 text-sm font-medium">
                      No actions available
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2 justify-center w-full">
                    {location.pathname !== '/dashboard/appointments' && (
                      <>
                        <button
                          onClick={() =>
                            handleStatusChange(
                              appointment.id,
                              appointment.timeId,
                              'completed',
                            )
                          }
                          className="flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium text-sm transition-all duration-200 shadow-sm hover:shadow-md"
                          title="Mark as completed"
                        >
                          <CheckIcon className="h-4 w-4 mr-1" />
                          Complete
                        </button>
                        <button
                          onClick={() =>
                            handleStatusChange(
                              appointment.id,
                              appointment.timeId,
                              'in-progress',
                            )
                          }
                          className="flex items-center px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium text-sm transition-all duration-200 shadow-sm hover:shadow-md"
                          title="Mark as in progress"
                        >
                          <ClockIcon className="h-4 w-4 mr-1" />
                          In Progress
                        </button>
                      </>
                    )}
                    <button
                      onClick={() =>
                        handleStatusChange(
                          appointment.id,
                          appointment.timeId,
                          'cancelled',
                        )
                      }
                      className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 shadow-sm ${appointment.status === 'in-progress' ? 'bg-gray-400 cursor-not-allowed text-white' : 'bg-red-500 hover:bg-red-600 text-white hover:shadow-md'}`}
                      title="Cancel appointment"
                      disabled={appointment.status === 'in-progress'}
                    >
                      <TrashIcon className="h-4 w-4 font-bold" />
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No appointments message for filtered results */}
      {location.pathname === '/dashboard/appointments' &&
        filteredAppointments.length === 0 &&
        appointments.length > 0 && (
          <div className="py-6 text-center text-sm text-gray-500">
            No pending appointments.
          </div>
        )}
    </>
  )
}
export default AppointmentsList
