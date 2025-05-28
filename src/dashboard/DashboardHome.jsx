import React from 'react'
import {
    CalendarIcon,
    UserIcon,
    ClipboardCheckIcon,
    ClockIcon,
} from 'lucide-react'
import AppointmentsList from './AppointmentList'
import StatsCard from './StatsCard'
import { jwtDecode } from 'jwt-decode'
import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import Loader from '../components/Loader'
import useDoctor from '../hooks/useDoctor'
const DashboardHome = () => {

    const [doctor, setDoctor] = useState("")
    const [doctor_id, setDoctor_id] = useState(null)
    const [todayappointments, setTodayAppointments] = useState([])
    const [todayAppointmentCount, setTodayAppointmentCount] = useState("")
    const [totalpatients, setTotalPatients] = useState("")

    const [completedappointments, setCompletedAppointments] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")


    const { doctorName, doctorId } = useDoctor();


    useEffect(() => {
        if (doctorId) {

            setError("")
            setLoading(true)


            const fetchTodayAppointments = async () => {

                try {
                    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/appointments/list/?doctor=${doctorId}`, {
                        withCredentials: true
                    })


                    const todaysAppCount = []

                    const today = new Date().toISOString().split('T')[0];

                    // Filter out duplicate patient names
                    const uniqueAppointments = [] // making an array of non_repeated_patient
                    const patientIDs = new Set() // making memory for list of patientNames I have already initally none

                    response.data.forEach((appointment) => {
                        const patientID = appointment.patient_data.id  // each patient id when loop through

                        if (!patientIDs.has(patientID)) {
                            patientIDs.add(patientID)
                            uniqueAppointments.push(appointment)
                        }
                    })

                    setTotalPatients(uniqueAppointments.length)

                    response.data.map((m) => {
                        if (m.timeslot_data.appointment_date === today) {
                            todaysAppCount.push(m)
                        }
                    })

                    const completedAppointments = []
                    response.data.map((appointment) => {

                        if (appointment.status === "completed") {
                            completedAppointments.push(appointment)
                        }

                    })

                    setCompletedAppointments(completedAppointments.length)
                    setTodayAppointmentCount(todaysAppCount.length)
                    setTodayAppointments(response.data)
                    setLoading(false)
                    setError("")

                } catch (error) {
                    console.log(error)
                    setLoading(false)
                    setError("We couldn’t reach the server. Please check your internet connection or try again shortly.")
                } finally {
                    setLoading(false)
                }
            }

            fetchTodayAppointments()
        }
    }, [])
    // Mock data for the dashboard
    const stats = [
        {
            title: "Today's Appointments",
            value: `${todayAppointmentCount}`,
            icon: <CalendarIcon className="h-6 w-6 text-blue-600" />,
            change: '+2 from yesterday',
            trend: 'up',
        },
        {
            title: 'Total Patients',
            value: `${totalpatients}`,
            icon: <UserIcon className="h-6 w-6 text-green-600" />,
            change: '+3 this week',
            trend: 'up',
        },
        {
            title: 'Completed Appointments',
            value: `${completedappointments}`,
            icon: <ClipboardCheckIcon className="h-6 w-6 text-purple-600" />,
            change: '+5 this week',
            trend: 'up',
        },
        {
            title: 'Working Hours',
            value: '32h',
            icon: <ClockIcon className="h-6 w-6 text-orange-600" />,
            change: '80% of schedule',
            trend: 'neutral',
        },
    ]




    if (error) {
        return (
            <div className="my-8 flex justify-center items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-4 shadow-sm">
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




            {!loading ? (
                <div className="space-y-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Doctor Dashboard</h1>
                        <p className="text-gray-600">Welcome back, Dr. {doctorName}</p>
                    </div>
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {stats.map((stat, index) => (
                            <StatsCard
                                key={index}
                                title={stat.title}
                                value={stat.value}
                                icon={stat.icon}
                                change={stat.change}
                                trend={stat.trend}
                            />
                        ))}
                    </div>
                    {/* Upcoming Appointments */}
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="p-6">
                            <h2 className="text-lg font-medium text-gray-900">
                                Today's Appointments
                            </h2>
                            <p className="text-sm text-gray-500">Your schedule for today</p>

                        </div>
                        <AppointmentsList />
                    </div>
                </div>) :

                <div className='p-10 my-10'>
                    <Loader />
                </div>
            }
        </>
    )
}
export default DashboardHome
