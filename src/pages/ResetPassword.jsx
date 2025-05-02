import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
    LockIcon,
    EyeIcon,
    EyeOffIcon,
    CheckCircleIcon,
    XCircleIcon,

} from 'lucide-react'

import Header from '../components/Header'
import Footer from '../components/Footer'
import axios from 'axios'
import { Link } from 'react-router-dom'

export function ResetPassword() {
    const { token } = useParams()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [errors, setErrors] = useState({
        password: '',
        confirmPassword: '',
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const [message, setMessage] = useState({ type: '', text: '' })

    const validatePassword = (password) => {
        if (password.length < 8) return 'Password must be at least 8 characters long'
        if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter'
        if (!/[a-z]/.test(password)) return 'Password must contain at least one lowercase letter'
        if (!/[0-9]/.test(password)) return 'Password must contain at least one number'
        return ''
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const passwordError = validatePassword(formData.password)
        const confirmError = formData.password !== formData.confirmPassword ? 'Passwords do not match' : ''

        setErrors({ password: passwordError, confirmPassword: confirmError })
        if (passwordError || confirmError) return

        setIsSubmitting(true)


        try {
            const response = await axios.post('http://127.0.0.1:8000/api/auth/reset-password/', {
                token: token,
                new_password: formData.password,
                confirm_password: formData.confirmPassword,
                withCredentials: true,
            })

            console.log("success", response.data)
            setMessage({ type: 'success', text: response.data.message })


            // Redirect to login after 2 seconds
            setTimeout(() => {
                navigate('/login')
            }, 3000)
        } catch (error) {

            console.log("error is", error.response)
            if (error.response && error.response.data.error) {
                setMessage({ type: 'error', text: error.response.data.error })
            } else {
                setMessage({ type: 'error', text: 'Something went wrong. Please try again later.' })
            }
        }


        setTimeout(() => {
            setIsSubmitting(false)
            setIsSubmitted(true)
        }, 1500)
    }

    return (
        <>
            <Header />

            <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                {!isSubmitted && <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Reset your password
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Please enter your new password below
                    </p>
                </div>
                }

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        {!isSubmitted ? (
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                {/* Password Input */}
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        New Password
                                    </label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <LockIcon className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            id="password"
                                            name="password"
                                            type={showPassword ? 'text' : 'password'}
                                            value={formData.password}
                                            onChange={(e) =>
                                                setFormData({ ...formData, password: e.target.value })
                                            }
                                            className={`block w-full pl-10 pr-10 py-2 border ${errors.password ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? (
                                                <EyeOffIcon className="h-5 w-5 text-gray-400" />
                                            ) : (
                                                <EyeIcon className="h-5 w-5 text-gray-400" />
                                            )}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                                    )}
                                </div>

                                {/* Confirm Password Input */}
                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                        Confirm Password
                                    </label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <LockIcon className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            value={formData.confirmPassword}
                                            onChange={(e) =>
                                                setFormData({ ...formData, confirmPassword: e.target.value })
                                            }
                                            className={`block w-full pl-10 pr-10 py-2 border ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOffIcon className="h-5 w-5 text-gray-400" />
                                            ) : (
                                                <EyeIcon className="h-5 w-5 text-gray-400" />
                                            )}
                                        </button>
                                    </div>
                                    {errors.confirmPassword && (
                                        <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>
                                    )}
                                </div>

                                {/* Password Requirements */}
                                <div className="space-y-2">
                                    <p className="text-sm text-gray-600">Password must contain:</p>
                                    <ul className="text-sm space-y-1">
                                        {[
                                            { check: /[A-Z]/, text: 'One uppercase letter' },
                                            { check: /[a-z]/, text: 'One lowercase letter' },
                                            { check: /[0-9]/, text: 'One number' },
                                            { check: /.{8,}/, text: 'At least 8 characters' },
                                        ].map((requirement, index) => (
                                            <li key={index} className="flex items-center space-x-2">
                                                {requirement.check.test(formData.password) ? (
                                                    <CheckCircleIcon className="h-4 w-4 text-green-500" />
                                                ) : (
                                                    <XCircleIcon className="h-4 w-4 text-gray-300" />
                                                )}
                                                <span
                                                    className={
                                                        requirement.check.test(formData.password)
                                                            ? 'text-green-500'
                                                            : 'text-gray-500'
                                                    }
                                                >
                                                    {requirement.text}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Submit Button */}
                                <div>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                                    >
                                        {isSubmitting ? 'Resetting...' : 'Reset Password'}
                                    </button>
                                </div>
                            </form>
                        ) : (


                            message.type === "error" ? (<div className="text-center py-4">
                                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                                    <svg
                                        className="h-6 w-6 text-red-600"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 8v4m0 4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="mt-2 text-lg font-bold text-red-600">
                                    {message.text}
                                </h3>

                                <div className="mt-4">

                                    {message.text.toLowerCase().includes("expired") || message.text.toLowerCase().includes("used") ?
                                        <div className="text-sm text-red-600 mt-2">
                                            <p className="text-sm text-gray-600">
                                                This reset link has expired or has already been used.
                                                Please request a new one by entering your email again.
                                            </p>
                                            <Link
                                                to="/forgot-password"
                                                className="mt-3 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                                            >
                                                Go to Forgot Password
                                            </Link>
                                        </div>

                                        : message.text.toLowerCase().includes("invalid") || message.text.toLowerCase().includes("tampered") ?

                                            <div className="text-sm text-red-600 mt-2">

                                                <p className="text-sm text-gray-600">
                                                    The token is invalid or tampered.
                                                    Please request a new link by entering your email again.
                                                </p>
                                                <Link
                                                    to="/forgot-password"
                                                    className="mt-3 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                                                >
                                                    Go to Forgot Password
                                                </Link>
                                            </div> : <div>
                                                <Link
                                                    to="/forgot-password"
                                                    className="mt-3 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                                                >
                                                    Go to Forgot Password
                                                </Link>
                                            </div>
                                    }



                                </div>
                            </div>) :

                                (
                                    <div className="text-center py-4">
                                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                                            <CheckCircleIcon className="h-6 w-6 text-green-600" />
                                        </div>
                                        <h3 className="mt-3 text-xl font-medium text-gray-900">
                                            Password reset successful!
                                        </h3>
                                        <p className="mt-2 text-sm text-gray-500">
                                            Redirecting you to login page...
                                        </p>
                                    </div>
                                )







                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default ResetPassword
