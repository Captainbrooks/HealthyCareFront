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
const DashboardHome = () => {

    const [doctor, setDoctor] = useState("")
    const [doctor_id, setDoctor_id] = useState(null)
    const [todayappointments,setTodayAppointments]=useState([])




    useEffect(() => {

        const accessToken = localStorage.getItem("access_token")

        if (accessToken) {
            const decoded = jwtDecode(accessToken)


            if (decoded.username) {
                setDoctor(decoded.username)
                setDoctor_id(decoded.id)
                console.log(decoded.id)
                return;
            }
        }

    }, [])




    useEffect(() => {

        const accessToken = localStorage.getItem("access_token")

        if (doctor_id) {


            const fetchTodayAppointments = async () => {

                try {
                    const response = await axios.get(`http://localhost:8000/api/appointments/list/?doctor=${doctor_id}`, {
                        withCredentials: true
                    })

                    console.log("response at dashboard home", response.data)
                    setTodayAppointments(response.data)
                } catch (error) {
                    console.log("error", error.response)
                }
            }

            fetchTodayAppointments()



           
        }
    }, [doctor_id])
    // Mock data for the dashboard
    const stats = [
        {
            title: "Today's Appointments",
            value: '8',
            icon: <CalendarIcon className="h-6 w-6 text-blue-600" />,
            change: '+2 from yesterday',
            trend: 'up',
        },
        {
            title: 'Total Patients',
            value: '128',
            icon: <UserIcon className="h-6 w-6 text-green-600" />,
            change: '+3 this week',
            trend: 'up',
        },
        {
            title: 'Completed Appointments',
            value: '24',
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
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-800">Doctor Dashboard</h1>
                <p className="text-gray-600">Welcome back, Dr. {doctor}</p>
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
                <AppointmentsList limit={5} />
            </div>
        </div>
    )
}
export default DashboardHome
