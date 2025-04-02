import React, { useCallback, useState } from 'react'
import { CheckCircleIcon, UploadIcon } from 'lucide-react'
import axios from 'axios'

const initialFormData = {
  name: '',
  image: null,
  imagePreview: '',
  education: '',
  specialty: '',
  experience: '',
  availability: '',
  hospitalName: '',
  reviews: 0,
  rating: 0,
}

const specialties = [
  'Cardiology',
  'Neurology',
  'Pediatrics',
  'Orthopedics',
  'Dermatology',
  'Gastroenterology',
  'Oncology',
  'Psychiatry',
]

export default function AddDoctorForm() {
  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: name === 'reviews' || name === 'rating' ? Number(value) : value,
    })
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: undefined,
      })
    }
  }

  const handleImageChange = (file) => {
    if (file) {
      if (!file.type.startsWith('image/')) {
        setErrors({
          ...errors,
          image: 'Please upload an image file',
        })
        return
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrors({
          ...errors,
          image: 'Image size should be less than 5MB',
        })
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: file,
          imagePreview: reader.result,
        }))
      }
      reader.readAsDataURL(file)
      if (errors.image) {
        setErrors({
          ...errors,
          image: undefined,
        })
      }
    }
  }

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageChange(e.dataTransfer.files[0])
    }
  }, [])

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Doctor name is required'
    if (!formData.education.trim())
      newErrors.education = 'Education is required'
    if (!formData.specialty) newErrors.specialty = 'Department is required'
    if (!formData.experience.trim())
      newErrors.experience = 'Experience is required'
    if (!formData.availability.trim())
      newErrors.availability = 'Availability is required'
    if (!formData.hospitalName.trim())
      newErrors.hospitalName = 'Hospital name is required'
    if (formData.rating < 0 || formData.rating > 5) {
      newErrors.rating = 'Rating must be between 0 and 5'
    }
    if (formData.reviews < 0) {
      newErrors.reviews = 'Number of reviews cannot be negative'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (validateForm()) {
      setIsSubmitting(true);
  
      const formDataToSend = new FormData();
      formDataToSend.append('doctor_name', formData.name);
      formDataToSend.append('department_name', formData.specialty);
      formDataToSend.append('education', formData.education);
      formDataToSend.append('availability', formData.availability);
      formDataToSend.append('experience', formData.experience);
      formDataToSend.append('hospital_name', formData.hospitalName);
      formDataToSend.append('rating', formData.rating);
      formDataToSend.append('num_reviews', formData.reviews);
  
      // Append image if it exists
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }
  
      axios
        .post('http://127.0.0.1:8000/api/doctors/create/', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',  // This is necessary for file uploads
          },
        })
        .then((response) => {
          console.log('Form submitted successfully', response.data);
          setIsSubmitting(false);
          setIsSubmitted(true);
          setFormData(initialFormData);
          setTimeout(() => {
            setIsSubmitted(false);
          }, 3000);
        })
        .catch((error) => {
          console.log('There was an error submitting the form', error);
          setIsSubmitting(false);
        });
    }
  };
  

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      {isSubmitted && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md flex items-center text-green-700">
          <CheckCircleIcon className="w-5 h-5 mr-2" />
          <span>Doctor successfully added to the system!</span>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Doctor Name*
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Dr. Full Name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="image-upload"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Profile Image
            </label>
            <div
              className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md ${isDragging ? 'border-blue-400 bg-blue-50' : 'border-gray-300'}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="space-y-1 text-center">
                <div className="flex flex-col items-center">
                  {formData.imagePreview ? (
                    <div className="relative w-32 h-32 mb-4">
                      <img
                        src={formData.imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            image: null,
                            imagePreview: '',
                          })
                        }
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <UploadIcon
                      className="mx-auto h-12 w-12 text-gray-400"
                      aria-hidden="true"
                    />
                  )}
                </div>
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="image-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="image-upload"
                      name="image-upload"
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          handleImageChange(e.target.files[0])
                        }
                      }}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
              </div>
            </div>
            {errors.image && (
              <p className="mt-1 text-sm text-red-500">{errors.image}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="education"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Education*
            </label>
            <input
              type="text"
              id="education"
              name="education"
              value={formData.education}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.education ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Harvard Medical School"
            />
            {errors.education && (
              <p className="mt-1 text-sm text-red-500">{errors.education}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="specialty"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Department/Specialty*
            </label>
            <select
              id="specialty"
              name="specialty"
              value={formData.specialty}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.specialty ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select a specialty</option>
              {specialties.map((specialty) => (
                <option key={specialty} value={specialty}>
                  {specialty}
                </option>
              ))}
            </select>
            {errors.specialty && (
              <p className="mt-1 text-sm text-red-500">{errors.specialty}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="experience"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Experience (years)*
            </label>
            <input
              type="text"
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.experience ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="5"
            />
            {errors.experience && (
              <p className="mt-1 text-sm text-red-500">{errors.experience}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="availability"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Availability*
            </label>
            <input
              type="text"
              id="availability"
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.availability ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Mon-Fri, 9 AM to 5 PM"
            />
            {errors.availability && (
              <p className="mt-1 text-sm text-red-500">{errors.availability}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="hospitalName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Hospital Name*
            </label>
            <input
              type="text"
              id="hospitalName"
              name="hospitalName"
              value={formData.hospitalName}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.hospitalName ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="ABC Hospital"
            />
            {errors.hospitalName && (
              <p className="mt-1 text-sm text-red-500">{errors.hospitalName}</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="reviews"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Number of Reviews
              </label>
              <input
                type="number"
                id="reviews"
                name="reviews"
                value={formData.reviews}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.reviews ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="100"
              />
              {errors.reviews && (
                <p className="mt-1 text-sm text-red-500">{errors.reviews}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="rating"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Rating (out of 5)
              </label>
              <input
                type="number"
                id="rating"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.rating ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="4.5"
                min="0"
                max="5"
              />
              {errors.rating && (
                <p className="mt-1 text-sm text-red-500">{errors.rating}</p>
              )}
            </div>
          </div>
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md disabled:bg-gray-400"
            >
              {isSubmitting ? 'Submitting...' : 'Add Doctor'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
