import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MailIcon,
  Loader2Icon,
  CheckCircleIcon,
  AlertTriangleIcon,
} from 'lucide-react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

import { useParams } from 'react-router-dom';

function VerifyEmail() {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [emailError, setEmailError] = useState('');
  const [codeError, setCodeError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({
    type: '',
    text: '',
  });

  const { email } = useParams()
  const trimmedEmail = email.trim();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    // Reset states
    setEmailError('');
    setCodeError('');
    setMessage({
      type: '',
      text: '',
    });

    // Validate inputs
    const trimmedEmail = email.trim();
    const trimmedCode = code.trim();
    if (!trimmedEmail) {
      setEmailError('Email is required');
      return;
    }
    if (!validateEmail(trimmedEmail)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    if (!trimmedCode) {
      setCodeError('Verification code is required');
      return;
    }
    if (trimmedCode.length !== 6) {
      setCodeError('Please enter a valid 6-digit code');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/verify-code/`,
        {
          email: trimmedEmail,
          code: trimmedCode,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.access_token) {
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('refresh_token', response.data.refresh_token);
      }

      setMessage({
        type: 'success',
        text: `${'Email verified successfully'} Please login with email and password. Redirecting to login..`,
      });

      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.error) {
        setMessage({
          type: 'error',
          text: error.response.data.error,
        });
      } else {
        setMessage({
          type: 'error',
          text: 'Something went wrong. Please try again.',
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };






  const handleResend = async (e) => {

    setCode("")

    e.preventDefault()

    setIsSubmitting(false)
    setMessage({ type: '', text: '' });
    console.log(trimmedEmail)

    try {

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/resend-code/`, {
        email: trimmedEmail,

        withCredentials: true
      });

      console.log(response.data)
      setMessage({ type: 'success', text: `${response.data.message}` })




    } catch (error) {
      console.log("error", error)
      if (error.response && error.response.data.error) {
        setMessage({ type: 'error', text: error.response.data.error });
      } else {
        setMessage({ type: 'error', text: 'Something went wrong. Please try again later' })
      }
    }
  }


  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 flex flex-col">

        <div className="flex-1 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="flex justify-center">

            </div>
            <div className="mt-6 flex justify-center">
              <div className="rounded-full bg-blue-100 p-3">
                <MailIcon className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Verify Your Email
            </h2>
            {email ? (
              <>
                <div className="mt-4 text-center text-sm text-gray-600">
                  <p className="text-sm text-gray-600 text-center">
                    A 6-digit verification code was sent to <strong>{email}</strong> during registration
                    <br />
                    Please check your inbox and spam folder.
                    <br />
                    <span className="font-medium text-gray-800">
                      Didn’t receive the email? You can request a new one below.
                    </span>
                  </p>



                </div>



              </>
            ) : (
              'Please enter your email to receive a verification code'
            )}



          </div>
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form className="space-y-6" onSubmit={handleVerify}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MailIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`block w-full pl-10 pr-3 py-2 border ${emailError ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                      placeholder="name@example.com"
                    />
                  </div>
                  {emailError && (
                    <p className="mt-2 text-sm text-red-600">{emailError}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="code"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Verification Code
                  </label>
                  <input
                    id="code"
                    name="code"
                    type="text"
                    maxLength={6}
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                    className={`mt-1 block w-full border ${codeError ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 text-center tracking-widest font-mono text-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="000000"
                  />
                  {codeError && (
                    <p className="mt-2 text-sm text-red-600">{codeError}</p>
                  )}
                </div>
                {message.text && (
                  <div
                    className={`rounded-md p-4 ${message.type === 'success' ? 'bg-green-50' : 'bg-red-50'}`}
                  >
                    <div className="flex">
                      <div className="flex-shrink-0">
                        {message.type === 'success' ? (
                          <CheckCircleIcon className="h-5 w-5 text-green-400" />
                        ) : (
                          <AlertTriangleIcon className="h-5 w-5 text-red-400" />
                        )}
                      </div>
                      <div className="ml-3">
                        <p
                          className={`text-sm ${message.type === 'success' ? 'text-green-800' : 'text-red-800'}`}
                        >
                          {message.text}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2Icon className="animate-spin -ml-1 mr-2 h-4 w-4" />
                      Verifying...
                    </>
                  ) : (
                    'Verify Email'
                  )}
                </button>





                <div className="flex flex-col items-center mt-4">
                  <p className="text-sm text-gray-600 mb-2">
                    Didn't get a code?
                  </p>

                  <button
                    onClick={handleResend}
                    disabled={isSubmitting}
                    className={`w-full flex justify-center items-center gap-2 py-2 px-4 rounded text-white mb-2 transition-all duration-200 ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                      }`}
                  >
                    {isSubmitting ? 'Resending...' : 'Resend'}
                  </button>
                </div>




              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />

    </>
  );
}

export default VerifyEmail
