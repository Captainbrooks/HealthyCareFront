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
  ArrowDown
} from 'lucide-react'
import Loader from '../components/Loader'
import Header from '../components/Header'
import Footer from '../components/Footer'
import axiosClient from '../api/axios'
function PatientTest() {
  const { patientId } = useParams()
  const [patient, setPatient] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTestResults = async () => {
      try {
        setLoading(true)
        const response = await axiosClient.get(
          `/api/patients/${patientId}`,
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
      <Header />
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
                    Test Results
                  </h1>
                  <p className="mt-1 text-sm text-gray-500">
                    Comprehensive medical laboratory report
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

            {/* Test Results Section */}
            <div className="p-6">
              {patient.test_results.length > 0 ? (
                <div className="space-y-8">

                  {patient.test_results.map((test) => (
                    <div key={test.id} className="border border-gray-200 rounded-lg overflow-hidden">

                      {/* Header */}
                      <div className="bg-gray-50 p-4 flex justify-between items-start">
                        <p className="text-sm text-gray-600">
                          Ordered by: Dr. {test.doctor_info?.doctor_name || 'N/A'}
                        </p>
                      </div>

                      {/* Desktop Table */}
                      <div className="hidden sm:block overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Test Name</th>
                              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Result</th>
                              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{test.test_type}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{test.result}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{test.date}</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <a
                                  href={test.report_file}
                                  download={true}
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50"
                                >
                                  <ArrowDown className="h-4 w-4" /> Download Report
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      {/* Mobile Card View */}
                      <div className="block sm:hidden p-4 space-y-2">
                        <p className="text-sm text-gray-700">
                          <span className="font-semibold">Test:</span> {test.test_type}
                        </p>
                        <p className="text-sm text-gray-700">
                          <span className="font-semibold">Result:</span> {test.result}
                        </p>
                        <p className="text-sm text-gray-700">
                          <span className="font-semibold">Date:</span> {test.date}
                        </p>
                        <div>
                          <a
                            href={test.report_file}
                            download={true}
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 border border-blue-200"
                          >
                            <ArrowDown className="h-4 w-4" /> Download Report
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}

                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-500">No test results available for this patient.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default PatientTest
