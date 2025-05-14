import React, { useEffect, useState } from 'react'
import { SearchIcon, UploadIcon, FileTextIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
import toast from 'react-hot-toast'

const TestResultsPage = () => {

  const navigate = useNavigate()



  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [uploadModalOpen, setUploadModalOpen] = useState(false)
  const [appointments, setAppointments] = useState([])
  const [doctor_id, setDoctor_id] = useState(null)
  const [lastTest, SetLastTest] = useState()
  const [patientId,setPatientId]=useState(null)


  // test results
    const [testtype, setTestType] = useState('')
    const [date, setDate] = useState('')
    const [result, setResult] = useState('')
    const [file, setFile] = useState(null)





  const handleViewHistory = (patientId) => {
    navigate(`/patient/${patientId}`)
  }

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token')

    if (accessToken) {
      const decoded = jwtDecode(accessToken)

      if (decoded.username) {
        setDoctor_id(decoded.id)
        return
      }
    }
  }, [doctor_id])

  
  useEffect(() => {
    if (doctor_id) {
      const fetchAllAppointments = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/api/appointments/all/?doctor=${doctor_id}`, {
            withCredentials: true
          })

          console.log('response at test', response.data)

          // Filter out duplicate patient names
          const uniqueAppointments = [] // making an array of non_repeated_patient
          const patientNames = new Set() // making memory for list of patientNames I have already initally none

          response.data.forEach((appointment) => {
            const patientName = appointment.patient.full_name  // each patient name when loop through

            if (!patientNames.has(patientName)) {
              patientNames.add(patientName)
              uniqueAppointments.push(appointment)
            }
          })

          setAppointments(uniqueAppointments)



        } catch (error) {
          console.log('error', error)
        }
      }

      fetchAllAppointments()
    }
  }, [doctor_id])



  // for adding test result file

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  }


  const PassPatientId=(patientId)=>{
    setPatientId(patientId)
  }

  // add test result
  const handleTestResult = async (e) => {
    e.preventDefault();
    console.log("patientid at handleTest at test result", patientId)
    if (!file || !testtype || !date || !result) {
      toast.error("Please provide all the details..")
      return;
    }

    const formData = new FormData();
    formData.append('test_type', testtype);
    formData.append('result', result);
    formData.append('doctor', doctor_id)
    formData.append('date', date);
    formData.append('report_file', file);
    formData.append('patient', patientId);
    try {
      const response = await axios.post(`http://localhost:8000/api/patients/add-test-results/${patientId}/`,
        formData, {
        headers: {

          'Content-Type': 'multipart/form-data',

        },
        withCredentials: true
      });
      toast.success("Test Results Added Successfully")
      setUploadModalOpen(false);

    } catch (error) {
      console.error("Error uploading test result:", error);
      toast.error("Failed " + error.message)
    } finally {
      setUploadModalOpen(false);
    }

  }

  // add test result



  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Test Results</h1>
        <p className="text-gray-600">Upload and manage patient test results</p>
      </div>
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
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
                  Last Test
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
              {appointments.map((patient) => (
                <tr key={patient.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={`https://api.dicebear.com/6.x/initials/svg?seed=${patient.patient.full_name}`}
                          alt=""
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {patient.patient.full_name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {patient.patient.test_results.length > 0 ? (
                        <div key={patient.patient.test_results.id}>
                          { patient.patient.test_results[0].test_type}

                        <span className='gap-2 font-bold'> ({patient.patient.test_results[0].result})</span> 
                        </div>
                      ) :
                        (<div className='text-sm text-red-400  p-2 rounded-md italic gap-2'>
                          <span>⚠️</span>
                          No test results yet
                        </div>)
                      }
                    </div>

                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => {setUploadModalOpen(true)
                          PassPatientId(patient.patient.id)
                        }}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <UploadIcon className="h-4 w-4 mr-1" />
                        Upload Results
                      </button>
                      <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        onClick={() => handleViewHistory(patient.patient.id)}
                      >
                        <FileTextIcon className="h-4 w-4 mr-1" />
                        View History
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Upload Modal */}
        {/* Test Results Upload Modal */}
        {uploadModalOpen && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                      <UploadIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Upload Test Results
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Upload test results for 
                        </p>
                      </div>
                      <form onSubmit={handleTestResult}>
                        <div className="mt-4">
                          <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center">
                            <UploadIcon className="h-8 w-8 text-gray-400" />
                            <p className="mt-1 text-sm text-gray-500">
                              Drag and drop files here, or click to select files
                            </p>
                            <input
                              type="file"
                              className="mt-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              onChange={handleFileChange}
                            />
                          </div>
                        </div>
  
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700">
                            Test Type
                          </label>
                          <input
                            type="text"
                            value={testtype}
                            onChange={(e) => setTestType(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Add Test type.."
                          />
                        </div>
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700">
                            Date
                          </label>
                          <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
  
                          />
                        </div>
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700">
                            Result
                          </label>
                          <textarea
                            rows={3}
                            value={result}
                            onChange={(e) => setResult(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Add result about the test performed.."
                          ></textarea>
                        </div>
  
                        <div className="mt-4 flex justify-end">
                          <button
                            type="submit"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                          >
                           Upload
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    onClick={() => setUploadModalOpen(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  )
}

export default TestResultsPage
