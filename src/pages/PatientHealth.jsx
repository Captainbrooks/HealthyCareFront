import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import {
  ClipboardListIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  PrinterIcon,
  ChevronLeftIcon,
  ArrowDown,
  ActivityIcon,
  PillIcon
} from 'lucide-react'
import Loader from '../components/Loader'
import Header from '../components/Header'
import Footer from '../components/Footer'

function PatientHealth() {
  const { patientId } = useParams()
  const [patient, setPatient] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTestResults = async () => {
      try {
        setLoading(true)
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/patients/${patientId}`,
          { withCredentials: true }
        )
        setPatient(response.data)
        console.log(response.data)
      } catch (error) {
        setError('Failed to fetch patient test results. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    fetchTestResults()
  }, [patientId])

  if (loading) {
    return (
      <div className="min-h-screen">
       
          <Loader />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-sm p-6">
          <div className="bg-red-50 border border-red-200 rounded-md p-4 flex items-start">
            <AlertTriangleIcon className="h-5 w-5 text-red-500 mr-3 mt-0.5" />
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (

    <>
    <Header/>
    <div className="min-h-screen bg-[#F8FAFC] p-6">
      <div className="max-w-5xl mx-auto">
        {/* Navigation */}
        <div className="mb-4 flex">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
          >
            <ChevronLeftIcon className="h-4 w-4 mr-1 my-1 text-blue-600" />
            <span className='text-blue-600 text-md'>
            Back
            </span>
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          {/* Header */}
          <div className="border-b border-gray-200 bg-white rounded-t-xl p-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                  <ClipboardListIcon className="h-7 w-7 mr-2 text-blue-600" />
                  Health Records
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  Comprehensive Records of Patients
                </p>
              </div>
            </div>

            {/* Patient Information */}
            <div className="mt-6 bg-blue-50 rounded-lg border border-blue-100 p-4">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div>
                  <p className="text-xs font-medium text-blue-600 uppercase">
                    Patient Name
                  </p>
                  <p className="mt-1 font-medium text-gray-900">{patient.full_name}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-blue-600 uppercase">Blood Type</p>
                  <p className="mt-1 font-medium text-gray-900">{patient.blood_type ?? "N/A"}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-blue-600 uppercase">Age</p>
                  <p className="mt-1 font-medium text-gray-900">{patient.age ?? "N/A"}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-blue-600 uppercase">Gender</p>
                  <p className="mt-1 font-medium text-gray-900">{patient.gender ?? "N/A"}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-blue-600 uppercase">Emergency Contact</p>
                  <p className="mt-1 font-medium text-gray-900">{patient.emergency_contact ?? "N/A"}</p>
                </div>

              </div>
            </div>
          </div>

          {/* Test Results Table */}
          <div className="p-3 sm:p-6">

            {/* start of vital signs */}
            <div>
  <h1 className="text-md font-bold text-gray-900 flex items-center gap-2 px-6 pt-4">
    <ActivityIcon className="h-5 w-5 text-gray-400" />
    <span>Vital Signs</span>
  </h1>

  {patient.vitalsign_set.length > 0 ? (
    <div className="p-6">

      {/* Desktop Table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blood Pressure</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pulse</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Temperature</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 border border-gray-200">
            {patient.vitalsign_set.map((vital) => (
              <tr key={vital.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vital.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vital.blood_pressure}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vital.pulse}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vital.temperature}°C</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vital.weight}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="block sm:hidden space-y-4">
        {patient.vitalsign_set.map((vital) => (
          <div key={vital.id} className="border-l-4 border-blue-500 pl-4 py-2">
            <p className="text-sm font-semibold text-gray-900">Date: {vital.date}</p>
            <p className="text-sm text-gray-600">Blood Pressure: {vital.blood_pressure}</p>
            <p className="text-sm text-gray-600">Pulse: {vital.pulse}</p>
            <p className="text-sm text-gray-600">Temperature: {vital.temperature}°C</p>
            <p className="text-sm text-gray-600">Weight: {vital.weight}</p>
          </div>
        ))}
      </div>

    </div>
  ) : (
    <div className="text-center py-10">
      <p className="text-gray-500">No Vital Signs Available</p>
    </div>
  )}
</div>


            {/* end of vital signs */}


            <div className='mt-2' >
                   <div className="bg-white shadow rounded-lg">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <PillIcon className="h-5 w-5 text-gray-400" />
                  <h2 className="ml-2 text-lg font-medium text-gray-900">
                    Current Medications
                  </h2>
                </div>
               
              </div>
            </div>
            <div className="p-6">




 <div className="w-full overflow-x-auto">
  <table className="w-full divide-y divide-gray-200 hidden sm:table">
    <thead>
      <tr>
        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Medicine Name
        </th>
        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Dosage
        </th>
        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Frequency
        </th>
        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Starting Date
        </th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200 border border-gray-200">
      {patient.medication_set && patient.medication_set.length > 0 ? (
        patient.medication_set.map((medication) => (
          <tr key={medication.id}>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{medication.name}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{medication.dosage}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{medication.frequency}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{medication.start_date}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-600">
            Not taking any medications yet
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>



                {/* mobile view */}


                   <div className="block sm:hidden space-y-4">
                {patient.medication_set && patient.medication_set.length > 0 ? patient.medication_set.map((medication) => (
                  <div key={medication.id} className="border-l-2 border-blue-500 pl-4">
                    <div className="flex justify-between items-start border-b-2 border-gray-100 pb-2">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">
                          {medication.name}
                        </h3>
                        <p className="mt-1 text-sm text-gray-600">
                          Dosage: {medication.dosage}
                        </p>
                        <p className="text-sm text-gray-600">
                          Frequency: {medication.frequency}
                        </p>
                        <p className="text-sm text-gray-600">
                          Started: {medication.start_date}
                        </p>
                      </div>
                    </div>
                  </div>
                )) : (
                  <p className="p-6 text-sm text-gray-600">Not Taking Medication Yet</p>
                )

                }
              </div>



                {/* mobile view */}

            </div>
          </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer/>
    </>
  )
}

export default PatientHealth
