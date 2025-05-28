import React, { useEffect, useState } from 'react'
import { SearchIcon, ClockIcon, CalendarCheck, TrashIcon } from 'lucide-react'
import AppointmentsList from './AppointmentList'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
import toast from 'react-hot-toast'

const AppointmentsPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [doctorId, setDoctorId] = useState(null)
  const [appointments, setAppointments] = useState([])
  const [isCancel, setIsCancelling] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token')
    if (accessToken) {
      const decoded = jwtDecode(accessToken)

      if (decoded.username) {
        setDoctorId(decoded.id)
      }
    }
  }, [])

  useEffect(() => {
    if (!doctorId) return

    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`/api/appointments/list/?doctor=${doctorId}`, {
          withCredentials: true
        })
        setAppointments(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchAppointments()
  }, [doctorId])

  const formatTime = (timeStr) => {
    const [hour, minute] = timeStr.split(":")
    const date = new Date()
    date.setHours(+hour)
    date.setMinutes(+minute)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const humanDateLabel = (isoDate) => {
    const msPerDay = 86400000
    const [year, month, day] = isoDate.split('-').map(Number)
    const targetUtc = Date.UTC(year, month - 1, day)
    const now = new Date()
    const todayUtc = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
    const diffDays = Math.round((targetUtc - todayUtc) / msPerDay)
    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "Tomorrow"
    if (diffDays > 1) return `In ${diffDays} days`
    if (diffDays === -1) return "Yesterday"
    return `${Math.abs(diffDays)} days ${diffDays < 0 ? 'ago' : 'from now'}`
  }

  const handleStatusChange = async (patientId, timeId, newStatus) => {
    setIsCancelling(false)
    if (newStatus === "cancelled") {
      setIsCancelling(true)
      const confirmed = window.confirm("Are you sure you want to cancel this appointment?")
      if (!confirmed) return
    }
    try {
      await axios.put(`/api/appointments/${patientId}/${timeId}/`,
        { status: newStatus },
        { withCredentials: true }
      )
      setAppointments(prev => prev.map(appt =>
        appt.patient_data.id === patientId && appt.timeslot_data.id === timeId
          ? { ...appt, status: newStatus }
          : appt
      ))
      toast.success('Appointment status updated')
    } catch (error) {
      console.error('Failed to update status:', error)
      toast.error("Failed to update status : " + error.message)
    } finally {
      setIsCancelling(false)
    }
  }

  const getStatusBadge = (status) => {
    const statusStyles = {
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      'in-progress': 'bg-yellow-100 text-yellow-800',
      default: 'bg-blue-100 text-blue-800'
    }
    const style = statusStyles[status] || statusStyles.default
    const label = status === 'completed' ? 'Completed'
      : status === 'cancelled' ? 'Cancelled'
        : status === 'in-progress' ? 'In Progress'
          : 'Scheduled'

    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${style}`}>{label}</span>
  }

  const handleViewHistory = (patientId) => navigate(`/patient/${patientId}`)

  const filteredAppointments = searchTerm
    ? appointments.filter(appt => appt.patient_data.full_name.toLowerCase().includes(searchTerm.toLowerCase()))
    : []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Appointments</h1>
        <p className="text-gray-600">Manage your patient appointments</p>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
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
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        {searchTerm ? (
          filteredAppointments.length > 0 ? (
            <>

              {searchTerm && filteredAppointments.length > 0 && (
                <div className="flex items-center justify-center my-2 p-2">

                  <div className="text-sm font-medium">
                    🔍 {filteredAppointments.length} result{filteredAppointments.length !== 1 ? 's' : ''} found
                  </div>
                </div>
              )}



              <div className="hidden md:block overflow-x-auto w-full justify-center">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredAppointments.filter(appt => appt.status !== 'completed').map((appt) => (
                      <tr key={appt.id} className={appt.status === 'cancelled' ? 'bg-gray-50' : ''}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={`https://api.dicebear.com/6.x/initials/svg?seed=${appt.patient_data.full_name}`}
                              alt="avatar"
                              onClick={() => handleViewHistory(appt.patient_data.id)}
                            />
                            <div className="ml-4 cursor-pointer" onClick={() => handleViewHistory(appt.patient_data.id)}>
                              <div className="text-sm font-medium text-gray-900">
                                {appt.patient_data.full_name}
                              </div>

                              <div className="text-sm text-gray-500">
                                {appt.patient_data.age ?? "xx"} years old
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-col space-y-1">
                            <span className="text-sm font-medium text-gray-900">
                              {`${formatTime(appt.timeslot_data.start_time)} - ${formatTime(appt.timeslot_data.end_time)}`}
                            </span>
                            <span className="text-xs text-gray-500">
                              ({humanDateLabel(appt.timeslot_data.appointment_date)})
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(appt.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          {appt.status !== 'completed' && appt.status !== 'cancelled' ? (
                            <button
                              onClick={() => handleStatusChange(appt.patient_data.id, appt.timeslot_data.id, 'cancelled')}
                              className={`px-6 py-2 w-full border rounded-lg text-white transition-all duration-200 shadow-sm ${appt.status === 'in-progress' ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600 shadow-md'}`}
                              disabled={appt.status === 'in-progress'}
                            >
                              {isCancel ? 'Cancelling...' : 'Cancel'}
                            </button>
                          ) : (
                            <span className="text-gray-400">No actions available</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>


              {/* mobile view */}
              <div className="md:hidden space-y-3">
                {filteredAppointments.filter(appt => appt.status !== 'completed').map((appt) => (
                  <div
                    key={`${appt.id}`}
                    className={`rounded-xl border shadow-sm transition-all duration-200 hover:shadow-md ${appt.status === 'cancelled' ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200 hover:border-gray-300'}`}
                  >
                    {/* Patient Info Header */}
                    <div className="flex items-center p-4 pb-3">
                      <div className="h-14 w-14 flex-shrink-0">
                        <img
                          className="h-14 w-14 rounded-full cursor-pointer ring-2 ring-gray-100 hover:ring-gray-200 transition-all duration-200"
                          src={`https://api.dicebear.com/6.x/initials/svg?seed=${appt.patient_data.full_name}`}
                          alt=""
                          onClick={() => handleViewHistory(appt.patient_data.id)}
                        />
                      </div>
                      <div
                        className="ml-4 flex-1 cursor-pointer"
                        onClick={() => handleViewHistory(appt.patient_data.id)}
                      >
                        <div className="text-lg font-semibold text-gray-900 mb-1">
                          {appt.patient_data.full_name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {appt.patient_data.age ?? "xx"} years old
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        {getStatusBadge(appt.status)}
                      </div>
                    </div>
                    {/* Time Info Card */}
                    <div className="mx-4 mb-4">
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
                        <div className="flex items-center mb-2">
                          <ClockIcon className="h-4 w-4 text-blue-600 mr-2" />
                          <div className="text-base font-semibold text-gray-900">
                            {`${formatTime(appt.timeslot_data.start_time)} - ${formatTime(appt.timeslot_data.end_time)}`}
                          </div>
                        </div>
                        <div className="flex items-center">
                          <CalendarCheck className="h-4 w-4 text-blue-500 mr-2" />
                          <div className="text-sm text-gray-600">
                            ({humanDateLabel(appt.timeslot_data.appointment_date)})
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Actions Section */}
                    <div className="px-4 pb-4">
                      <div className="flex justify-center">
                        {appt.status === 'completed' ||
                          appt.status === 'cancelled' ? (
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
                                      appt.patient_data.id,
                                      appt.patient_data.timeId,
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
                                      appt.patient_data.id,
                                      appt.patient_data.timeId,
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
                                  appt.patient_data.id,
                                  appt.timeslot_data.id,
                                  'cancelled',
                                )
                              }
                              className={`flex items-center gap-1 px-4 py-2 border rounded-lg font-medium text-sm transition-all duration-200 shadow-sm ${appt.status === 'in-progress' ? 'bg-gray-400 cursor-not-allowed text-white' : 'bg-red-500 hover:bg-red-600 text-white hover:shadow-md'}`}
                              title="Cancel appointment"
                              disabled={appt.status === 'in-progress'}
                            >
                              <TrashIcon className="h-4 w-4 font-bold" />
                              {isCancel ? `Cancelling...` : `Cancel`}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* mobile view end */}
            </>




          ) : (
            <div className="p-4 text-center text-gray-500">No matching appointments found for <span className='text-red-400 font-medium text-lg'>"{searchTerm}"</span></div>
          )
        ) : (
          <AppointmentsList />
        )}
      </div>
    </div>
  )
}

export default AppointmentsPage
