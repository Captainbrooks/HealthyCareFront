import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Form } from 'react-router-dom'
import {
  ArrowLeftIcon,
  FileTextIcon,
  ActivityIcon,
  PillIcon,
  CalendarIcon,
  HeartPulseIcon,
  PlusIcon,
  TrashIcon,
  PencilIcon,
  UploadIcon,
  Eye,
  ArrowDown,
  Loader
} from 'lucide-react'
import axios from 'axios'
import { useAuthContext } from "../hooks/useAuthContext"
import toast from 'react-hot-toast'
import { jwtDecode } from 'jwt-decode'


const PatientHistory = () => {
  const { patientId } = useParams()
  const navigate = useNavigate()

  const [showAllTests, setShowAllTests] = useState(false);
  const [doctor, setDoctor] = useState()

 
  const [loading, setLoading] = useState(false)
  const [patient, setPatient] = useState([])
  const [uploadModalOpen, setUploadModalOpen] = useState(false)
  const [vitalSignsModalOpen, setVitalSignsModalOpen] = useState(false)
  const [medicationModalOpen, setMedicationModalOpen] = useState(false)
  const [updateMedicationModal, setUpdateMedicationModal] = useState(false)

  
  const [editingMedication, setEditingMedication] = useState(null)

  const [emergencyContactModalOpen, setEmergencyContactModalOpen] = useState(false)


// test results
  const [testtype, setTestType] = useState('')
  const [date, setDate] = useState('')
  const [result, setResult] = useState('')
  const [file, setFile] = useState(null)


  // vital signs

  const [bloodpressure,setBloodPressure]=useState('')
  const [pulse,setPulse]=useState('')
  const [temp,setTemp]=useState('')
  const [weight,setWeight]=useState('')



  // medications

  const [medicationname,setMedicationName]=useState('')
  const [dosage,setDosage]=useState('')
  const [frequency,setFrequency]=useState('')


  // updated medications

  const [updatedmedicationname,setUpdateMedicationName]=useState('')
  const [updateddosage,setUpdatedDosage]=useState('')
  const [updatedfrequency,setUpdatedFrequency]=useState('')






  const today = new Date().toISOString().split('T')[0];


  




  useEffect(() => {


    const token = localStorage.getItem('access_token');
    if(!token){
      navigate("/unauthorized")
      return
    }
    const decoded_token = jwtDecode(token)
    if (decoded_token.id) {
      setDoctor(decoded_token.id)
      return
    }

  }, [])



  useEffect(() => {
    if (patientId) {

      const fetchPatientHistory = async () => {

        setLoading(true)
        try {
          const response = await axios.get(`http://localhost:8000/api/patients/${patientId}`, {
            withCredentials: true
          });

          console.log("response at patient", response.data)
          setPatient(response.data)
          setLoading(false)

        } catch (error) {
          console.log(error)
          setLoading(false)
        } finally {
          setLoading(false)
        }
      }
      fetchPatientHistory()
    }
  }, [])




  // for adding test result file

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  }

  // add test result
  const handleTestResult = async (e) => {
    e.preventDefault()
    if (!file || !testtype || !date || !result || !doctor) {
      toast.error("Please provide all the details..")
      return;
    }

    const formData = new FormData();
    formData.append('test_type', testtype);
    formData.append('result', result);
    formData.append('doctor', doctor)
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
      setPatient(response.data)
      setUploadModalOpen(false);

    } catch (error) {
      console.error("Error uploading test result:", error);
      toast.error("Failed " + error.message)
    } finally {
      setUploadModalOpen(false);
    }

  }

  // add test result


  // this is for sorting the patients by latest date
  const sortedTests = patient.test_results
    ?.sort((a, b) => new Date(b.date) - new Date(a.date)) || [];

  const visibleTests = showAllTests ? sortedTests : sortedTests.slice(0, 3);
  // this is for sorting the patients by latest date
  

  // remove test result

  const handleDeleteTest = async (patientId, test_id) => {
    console.log(patientId, test_id)
    if (!window.confirm("Are you sure you want to delete this test result?")) return;

    try {
      const response = await axios.delete(`http://localhost:8000/api/patients/delete-test-results/${patientId}/${test_id}`, {
        withCredentials: true
      });

      console.log("Test Result Deleted Successfully.")
      toast.success("Test Result Deleted Successfully.", response.data)

      setPatient((prev) => ({
        ...prev,
        test_results: prev.test_results.filter(
          (test) => !(test.patient === patientId && test.id === test_id)
        )
      }));


    } catch (error) {
      console.error("Error deleting test result:", error);
      toast.error("Failed to delete: " + error.message)
    }

  }

  // remove test result



// add vital signs
  const handleVitalSigns=async(e)=>{
    e.preventDefault()

    console.log("clicked handle vital signs")

   const formData=new FormData()



 // Format: YYYY-MM-DD
   formData.append('patient', patientId);
   formData.append('blood_pressure',bloodpressure);
   formData.append('pulse',pulse);
   formData.append('temperature',temp);
   formData.append('weight',weight);
   formData.append('date', today);




  

    try {

    

      const response=await axios.post(
        `http://localhost:8000/api/patients/add-vital-signs/${patientId}/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      );

    

      

  toast.success("Vital Signs Added Successfully")
  setPatient(response.data)
  setVitalSignsModalOpen(false)


      
    } catch (error) {
      toast.error(error.message)
      setVitalSignsModalOpen(false)
    }

  }
// add vital signs


// delete vital signs
  const handleDeleteVitalSign=async(vitalId,patientId)=>{
    if (!window.confirm("Are you sure you want to delete this vital signs?")) return;

    try {

      console.log("handle delete sign",vitalId,patientId)

      const response=await axios.delete(`http://localhost:8000/api/patients/delete-vital-signs/${patientId}/${vitalId}`,{
        withCredentials: true
      });


      setPatient((prev) => ({
        ...prev,
        vitalsign_set: prev.vitalsign_set.filter(
          (vital) => !(vital.patient === patientId && vital.id === vitalId)
        )
      }));

      toast.success("Vital Signs deleted successfully..")
      
    } catch (error) {
      toast.error(error)
    }

  }

// delete vital signs








// add medication

  const handleAddMedication=async(e)=>{
    e.preventDefault();


    const formData = new FormData();
    formData.append('name', medicationname);
    formData.append('dosage', dosage);
    formData.append('start_date', today);
    formData.append('frequency', frequency);
    formData.append('patient', patientId);



    try {

      const response=await axios.post(`http://localhost:8000/api/patients/add-medication/${patientId}/`,
        formData, {
        headers: {

          'Content-Type': 'application/json',

        },
        withCredentials: true
      });

      toast.success("Medication added successsfully")
      setPatient(response.data)
      setMedicationModalOpen(false)
      
    } catch (error) {
      toast.error("error")
      setMedicationModalOpen(false)
    }
  }

// add medication







// update medication
  const handleUpdateMedication=async(patientId,medication_id)=>{

    
const formData = new FormData();
formData.append("name", editingMedication.name);
formData.append("dosage", editingMedication.dosage);
formData.append("frequency", editingMedication.frequency)
    try {





      const response = await axios.put(`http://localhost:8000/api/patients/update-medication/${patientId}/${medication_id}/`,
        formData,
        {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true

        });

        const updatedMedication=response.data

       
        setPatient((prev) => ({
          ...prev,
          medication_set: prev.medication_set.map((med) =>
            med.id === updatedMedication.id ? updatedMedication : med
          )
        }));
        toast.success("Success")
      setUpdateMedicationModal(false)
    } catch (error) {
      toast.error(error.message)
      setUpdateMedicationModal(false)
    }
  }

  // update medication




  // delete medication

  const handleDeleteMedication=async(patientId,medication_id)=>{

    if (!window.confirm("Are you sure you want to delete this vital signs?")) return;

    try {
      const response=await axios.delete(`http://localhost:8000/api/patients/delete-medication/${patientId}/${medication_id}/`,{
        withCredentials: true
      });

      setPatient((prev) => ({
        ...prev,
        medication_set: prev.medication_set.filter(
          (medication) => !(medication.patient === patientId && medication.id === medication_id)
        )
      }));

      toast.success("Medication deleted successfully")
    } catch (error) {
      toast.error("error " + error.message)
      
    }
  }

  // delete medication


  if (loading) {
    return <div className='flex justify-center items-center'>
      <Loader className='w-6 h-6' />
    </div>
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="px-6 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-sm text-gray-600 hover:text-gray-900"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back
          </button>
        </div>
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-start">
            <img
              src={`https://api.dicebear.com/6.x/initials/svg?seed=${patient.full_name}`}
              alt={patient.full_name}
              className="h-20 w-20 rounded-full"
            />
            <div className="ml-6">
              <h1 className="text-2xl font-bold text-gray-900">
                {patient.full_name}
              </h1>
              <div className="mt-1 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                <div className="text-gray-600">
                  Age: <span className="text-gray-900">{patient.age}</span>
                </div>
                <div className="text-gray-600">
                  Gender:{' '}
                  <span className="text-gray-900">{patient.gender}</span>
                </div>
                <div className="text-gray-600">
                  Blood Type:{' '}
                  <span className="text-gray-900">{patient.blood_type}</span>
                </div>
                <div className="text-gray-600">
                  Contact:{' '}
                  <span className="text-gray-900">{patient.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Test Results */}
          <div className="bg-white shadow rounded-lg">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FileTextIcon className="h-5 w-5 text-gray-400" />
                  <h2 className="ml-2 text-lg font-medium text-gray-900">
                    Recent Test Results
                  </h2>
                </div>
                <button
                  onClick={() => setUploadModalOpen(true)}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                >
                  <PlusIcon className="h-4 w-4 mr-1" />
                  Add Test Result
                </button>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {visibleTests.length > 0 ? (
                visibleTests.map((test) => (
                  <div key={test.id} className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">
                          {test.test_type}
                        </h3>
                        <p className="mt-1 text-sm text-gray-600">
                          Date: {test.date}
                        </p>
                        <p className="mt-1 text-sm text-gray-600">
                          Result: {test.result}
                        </p>
                        <p className="mt-1 text-sm text-gray-600">
                          Doctor: <span>{test.doctor_info ? `Dr. ${test.doctor_info.doctor_name}` : 'Not Assigned'}</span>
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <a
                          href={test.report_file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                          <Eye className="h-4 w-4" /> View Report
                        </a>
                        <a
                          href={test.report_file}
                          download={true}
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-1.5 border border-blue-300 text-xs font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50"
                        >
                          <ArrowDown className="h-4 w-4" /> Download Report
                        </a>
                        <button
                          onClick={() => {
                            handleDeleteTest(test.patient, test.id);
                          }}
                          className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md text-white bg-red-400 hover:bg-red-600"
                        >
                          <TrashIcon className="h-4 w-4" /> Remove Test
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="p-6 text-sm text-gray-600">No test results available</p>
              )}

              {sortedTests.length > 3 && (
                <div className="px-6 pb-4">
                  <button
                    onClick={() => setShowAllTests(!showAllTests)}
                    className="flex items-center justify-center gap-1 mt-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-150"
                  >
                    {showAllTests ? 'Show less' : 'Show more'}
                    <svg
                      className={`w-4 h-4 transform transition-transform duration-200 ${showAllTests ? 'rotate-180' : 'rotate-0'}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                </div>
              )}
            </div>
          </div>
          {/* Vital Signs History */}
          <div className="bg-white shadow rounded-lg">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <ActivityIcon className="h-5 w-5 text-gray-400" />
                  <h2 className="ml-2 text-lg font-medium text-gray-900">
                    Vital Signs History
                  </h2>
                </div>
                <button
                  onClick={() => setVitalSignsModalOpen(true)}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                >
                  <PlusIcon className="h-4 w-4 mr-1" />
                  Add Vital Signs
                </button>
              </div>
            </div>
            <div className="p-6">

            <p className={`p-6 text-sm text-gray-600 ${patient.vitalsign_set && patient.vitalsign_set.length > 0 ? 'hidden':'block'}`}>No Vital Signs Available</p>

              <div className={`overflow-x-auto ${patient.vitalsign_set && patient.vitalsign_set.length > 0 ? 'block':'hidden'}`}>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                   
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Blood Pressure
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Pulse
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Temperature
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Weight
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    
                    {patient.vitalsign_set && patient.vitalsign_set.length > 0 ? patient.vitalsign_set.map((vital) => (
                      
                      <tr key={vital.id}>


                    
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {vital.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {vital.blood_pressure}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {vital.pulse}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {vital.temperature}°C
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {vital.weight}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <button
                        onClick={()=>{
                        handleDeleteVitalSign(vital.id,vital.patient)  
                      }}
                      className="p-1 rounded-full text-red-600 hover:bg-red-50"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                        </td>
                      </tr>
                    )) : (
                      <p className="p-6 text-sm text-gray-600 text-center">No Vital Signs Available</p>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* Right Column */}


        <div className="space-y-6">
          {/* Current Medications */}
          <div className="bg-white shadow rounded-lg">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <PillIcon className="h-5 w-5 text-gray-400" />
                  <h2 className="ml-2 text-lg font-medium text-gray-900">
                    Current Medications
                  </h2>
                </div>
                <button
                  onClick={() => {
                    setEditingMedication(false)
                    setMedicationModalOpen(true)
                  }}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                >
                  <PlusIcon className="h-4 w-4 mr-1" />
                  Add Medication
                </button>
              </div>
            </div>
            <div className="p-6">

              <div className="space-y-4">
                {patient.medication_set && patient.medication_set.length > 0 ? patient.medication_set.map((medication) => (
                  <div key={medication.id} className="border-l-2 border-blue-500 pl-4">
                    <div className="flex justify-between items-start">
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
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setMedicationModalOpen(false)
                            setUpdateMedicationModal(true)
                            setEditingMedication(medication);
                          }}
                          className="p-1 rounded-full text-blue-600 hover:bg-blue-50"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteMedication(medication.patient,medication.id)}
                          className="p-1 rounded-full text-red-600 hover:bg-red-50"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )) : (
                  <p className="p-6 text-sm text-gray-600">Not Taking Medication Yet</p>
                )

                }
              </div>
            </div>
          </div>
          {/* Past Appointments */}
          <div className="bg-white shadow rounded-lg">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center">
                <CalendarIcon className="h-5 w-5 text-gray-400" />
                <h2 className="ml-2 text-lg font-medium text-gray-900">
                  Past Appointments FeedBack
                </h2>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {patient.appointmentdiscussion_set && patient.appointmentdiscussion_set.length > 0 ? patient.appointmentdiscussion_set.map((appointment) => (
                <div key={appointment.id} className="p-6">



                  <p className="mt-2 text-sm text-gray-600">
                    Notes : {appointment.notes}
                  </p>
                </div>
              )) : (
                <p className="p-6 text-sm text-gray-600">No Feedback Available</p>
              )}
            </div>
          </div>


          {/* Emergency Contact */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <HeartPulseIcon className="h-5 w-5 text-red-500" />
                <h2 className="ml-2 text-lg font-medium text-gray-900">
                  Emergency Contact
                </h2>
              </div>
              <button
                onClick={() => setEmergencyContactModalOpen(true)}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700"
              >
                <PlusIcon className="h-4 w-4 mr-1" />
                Add Contact
              </button>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">
                {patient.emergency_contact}
              </p>
              <button
                onClick={() =>
                  setPatient({
                    ...patient,
                    emergencyContact: '',
                  })
                }
                className="p-1 rounded-full text-red-600 hover:bg-red-50"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>



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
                        Upload test results for {patient.full_name}
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
                          disabled={loading}
                        >
                          {loading ? 'Uploading...' : 'Upload'}
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


      {/* Vital Signs Modal */}
      {vitalSignsModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
              &#8203;
            </span>
            
        
     
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Add Vital Signs
                </h3>
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Blood Pressure
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="120/80"
                      value={bloodpressure}
                      onChange={(e)=>setBloodPressure(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Pulse
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="72"
                      value={pulse}
                      onChange={(e)=>setPulse(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Temperature
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="98.6"
                      value={temp}
                      onChange={(e)=>setTemp(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Weight
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="75kg"
                      value={weight}
                      onChange={(e)=>setWeight(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
              onClick={handleVitalSigns}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setVitalSignsModalOpen(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>


            
          
            </div>
            
          </div>
        </div>
      )}



      {/* Medication Modal */}
      {medicationModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
              &#8203;
            </span>

           
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Add Medication
                </h3>
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Medication Name
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={medicationname}
                      onChange={(e)=>setMedicationName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Dosage
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={dosage}
                      onChange={(e)=>setDosage(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Frequency
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={frequency}
                      onChange={(e)=>setFrequency(e.target.value)}
                    />
                  </div>
                
                </div>

              </div>

              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                onClick={handleAddMedication}
                
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                 Add
                </button>
                <button
                  type="button"
                  onClick={() => {

                    setMedicationModalOpen(false)
               
                  }}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>

              </div>
            </div>
          
          </div>
        </div>
      )}


      {/*update Medication Modal */}
      {updateMedicationModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
              &#8203;
            </span>

           
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                 Edit Medication
                </h3>
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Medication Name
                    </label>
                 
                    <input
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={editingMedication?.name || ''}
                      onChange={(e)=>setEditingMedication({...editingMedication, name:e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Dosage
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={editingMedication?.dosage || ''}
                      onChange={(e)=>
                        setEditingMedication({ ...editingMedication, dosage: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Frequency
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={editingMedication?.frequency || ''}
                      onChange={(e)=>
                        setEditingMedication({ ...editingMedication, frequency: e.target.value })
                      }
                    />
                  </div>
                 
                </div>

              </div>

              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                onClick={
                  
                  ()=>handleUpdateMedication(editingMedication.patient,editingMedication.id)}
                
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                 Update
                </button>
                <button
                  type="button"
                  onClick={() => {

                    setUpdateMedicationModal(false)
               
                  }}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>

              </div>
            </div>
          
          </div>
        </div>
      )}

      {/* Emergency Contact Modal */}
      {emergencyContactModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Add Emergency Contact
                </h3>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Contact Information
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Name (Relationship) - Phone Number"
                  />
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => setEmergencyContactModalOpen(false)}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setEmergencyContactModalOpen(false)}
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
export default PatientHistory
