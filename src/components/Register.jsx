import React, { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, MailCheck, Loader2, AlertTriangle, CheckCircle2, Check } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import PasswordStrengthBar from 'react-password-strength-bar';
import { jwtDecode } from 'jwt-decode';
import { useAuthContext } from '../hooks/useAuthContext';
import Loader from "../components/Loader"

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [registerError, setRegisterError] = useState(null);
  const [showemailverification, setShowEmailVerification] = useState(false)
  const [showregisterform, setShowRegisterForm] = useState(true)

  const [accesstoken, setAccessToken] = useState(null)
  const [refreshtoken, setRefreshToken] = useState(null)
  const [code, setCode] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isResending, setIsResending] = useState(false)

  const [message, setMessage] = useState({ type: '', text: '' });


  const { dispatch } = useAuthContext();

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");

    if (accessToken) {
      const decoded = jwtDecode(accessToken);
      if (decoded.role === "Doctor") {
        navigate("/dashboard");
        return;
      }

      navigate("/patient-portal");
    } else {
      navigate("/register");
    }
  }, [navigate]);
  ;




  const passwordRules = {
    uppercase: /[A-Z]/,
    lowercase: /[a-z]/,
    number: /[0-9]/,
    specialChar: /[!@#$%^&*(),.?":{}|<>]/,
    minLength: 6
  };

  const validatePassword = (pwd) => {
    const errors = [];

    if (!passwordRules.uppercase.test(pwd)) errors.push("At least 1 uppercase letter required.");
    if (!passwordRules.lowercase.test(pwd)) errors.push("At least 1 lowercase letter required.");
    if (!passwordRules.number.test(pwd)) errors.push("At least 1 number required.");
    if (!passwordRules.specialChar.test(pwd)) errors.push("At least 1 special character required.");
    if (pwd.length < passwordRules.minLength) errors.push("Minimum 6 characters required.");

    return errors;
  };

  const trimmedUsername = username.trim();
  const trimmedEmail = email.trim();
  const trimmedPassword = password.trim();
  const trimmedCode = code.trim();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});
    setRegisterError(null);



    const newErrors = {};

    if (!trimmedUsername) newErrors.username = "Username is required.";
    if (!trimmedEmail) newErrors.email = "Email is required.";
    if (!trimmedPassword) newErrors.password = ["Password is required."];

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (trimmedEmail && !emailRegex.test(trimmedEmail)) {
      newErrors.email = "Enter a valid email address.";
    }

    const pwdErrors = validatePassword(trimmedPassword);
    if (trimmedPassword && pwdErrors.length > 0) {
      newErrors.password = pwdErrors;
    }

    if (Object.keys(newErrors).length > 0) {
      setFieldErrors(newErrors);
      return;
    }

    setIsSubmitting(true)

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register/`, {
        username: trimmedUsername,
        email: trimmedEmail,
        password: trimmedPassword
      }, {
        withCredentials: true
      });



      setAccessToken(response.data.access_token)
      setRefreshToken(response.data.access_token)
      setShowEmailVerification(true)
      setShowRegisterForm(false)


    } catch (err) {
      if (err.response?.data?.email) {
        setRegisterError(err.response.data.email);
      } else if (err.response?.data?.username) {
        setRegisterError(err.response.data.username);
      } else {
        setRegisterError("Something went wrong. Please try again.");
      }

    } finally {
      setIsSubmitting(false)
    }


  };


  const handleVerify = async (e) => {
    e.preventDefault();


    if (!trimmedCode) {
      setMessage({ type: 'error', text: 'Cannot accept empty code' })
      return
    }

    if (!/^\d+$/.test(trimmedCode)) {
      setMessage({ type: 'error', text: 'Code must be a number.' })
      return;
    }

    if (trimmedCode.length < 6) {
      setMessage({ type: 'error', text: 'Code must be a 6 digit long number.' })
      return;

    }

    setIsSubmitting(false)
    setMessage({ type: '', text: '' });

    setIsSubmitting(true)

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/verify-code/`, {

        email: trimmedEmail,
        code: trimmedCode
      }, {
        withCredentials: true
      });

      console.log("response", response.data)

      const userInfo = jwtDecode(accesstoken)

      localStorage.setItem('user', JSON.stringify(userInfo));
      localStorage.setItem('access_token', accesstoken);
      localStorage.setItem('refresh_token', refreshtoken);

      setMessage({ type: 'success', text: `${response.data.message}. Redirecting to Patient Portal` })


      if (userInfo.role === "Doctor") {
        setTimeout(() => {
          navigate("/dashboard");
        }, 3000)
        return;
      } else {
        setTimeout(() => {
          navigate("/patient-portal");
        }, 3000)
      }

      dispatch({ type: "Register", payload: userInfo })




    } catch (error) {
      console.log(error)

      if (error.response && error.response.data.error) {
        setMessage({ type: 'error', text: error.response.data.error });
      } else {
        setMessage({ type: 'error', text: 'Something went wrong. Please resend the verification code.' })
      }



    } finally {
      setIsSubmitting(false)
    }



  }


  const handleResend = async (e) => {

    setCode("")

    e.preventDefault()

    setIsResending(true)
    setMessage({ type: '', text: '' });

    try {

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/resend-code/`, {
        email: trimmedEmail,

        withCredentials: true
      });

      console.log(response.data)
      setMessage({ type: 'success', text: `${response.data.message}` })
      setIsResending(false)




    } catch (error) {
      console.log("error", error)
      if (error.response && error.response.data.error) {
        setMessage({ type: 'error', text: error.response.data.error });
      } else {
        setMessage({ type: 'error', text: 'Something went wrong. Please try again later' })
      }
    } finally {
      setIsResending(false)
    }
  }






  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <div className="rounded-full bg-blue-100 p-2">
              <User className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Create a new account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link to="/login" className="text-xl font-bold mx-2 text-blue-600 hover:text-blue-500">
              Log in
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {!showemailverification && showregisterform && <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Username */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    className={`appearance-none block w-full pl-10 px-3 py-2 border ${fieldErrors.username ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="Enter your full name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                {fieldErrors.username && <p className="text-sm text-red-600 mt-1">{fieldErrors.username}</p>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className={`appearance-none block w-full pl-10 px-3 py-2 border ${fieldErrors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {fieldErrors.email && <p className="text-sm text-red-600 mt-1">{fieldErrors.email}</p>}
              </div>


              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    className={`appearance-none block w-full pl-10 pr-10 py-2 border ${fieldErrors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                  </div>
                </div>
                <PasswordStrengthBar password={password} />
                {fieldErrors.password && Array.isArray(fieldErrors.password) && (
                  <div className="mt-1 text-red-500 text-sm space-y-1">
                    {fieldErrors.password.map((msg, idx) => (
                      <p key={idx}>{msg}</p>
                    ))}
                  </div>
                )}
              </div>

              {/* Button */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
      ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} 
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                >
                  {isSubmitting ? 'Registering...' : 'Register'}
                </button>
              </div>


              {/* General registration error */}
              {registerError && (
                <div className="mt-4">
                  <Alert severity="error">{registerError}</Alert>
                </div>
              )}
            </form>
            }


            {!showregisterform && showemailverification &&
              <div>
                <form onSubmit={handleVerify}>


                  <div className="flex justify-center">
                    <div className="rounded-full bg-blue-100 p-3">
                      <MailCheck className="h-8 w-8 text-blue-600" />
                    </div>
                  </div>
                  <h2 className="text-xl mb-2 font-semibold text-center text-gray-800">
                    Verify Your Email
                  </h2>
                  <p className="mb-2 text-sm text-gray-600 text-center">
                    A 6-digit verification code has been sent to <strong>{email}</strong>
                  </p>
                  <input
                    type="text"
                    placeholder="Enter 6-digit code"
                    maxLength={6}
                    className={`w-full border p-2 mb-2 rounded text-center tracking-widest font-mono text-lg border ${!trimmedCode.length > 0 ? '' : 'border-red-500'}`}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />


                  <button
                    className={`w-full flex justify-center items-center gap-2 py-2 px-4 rounded text-white mb-2 font-medium bg-green-600 ${isSubmitting && 'opacity-50 cursor-not-allowed'
                      }`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Verifying...' : 'Verify Email'}

                  </button>


                </form>


              </div>

            }



            {message.text && (
              <div
                className={`flex items-center text-center gap-2 text-sm px-3 py-2 rounded ${message.type === 'error'
                  ? 'bg-red-100 text-red-700'
                  : 'bg-green-50 text-green-900 font-medium  text-lg'
                  }`}
              >
                {message.type === 'error' ? <div>

                  <AlertTriangle className="w-4 h-4 text-center" />

                </div> :

                  <div>
                    <div className="mx-auto flex items-center justify-center p-3 rounded-full bg-green-200">
                      <Check className='w-6 h-6' />
                    </div>
                  </div>
                }


                {message.text}




              </div>




            )}


            {
              !showregisterform && showemailverification &&


              <div className="flex flex-col items-center mt-4">
                <p className="text-sm text-gray-600 mb-2">
                  Didn't get a code?
                </p>

                <button
                  onClick={handleResend}
                  disabled={isResending}
                  className={`w-full flex justify-center items-center gap-2 py-2 px-4 rounded font-medium text-white mb-2 transition-all duration-200 bg-blue-600 hover:bg-blue-700 ${isResending && 'cursor-not-allowed opacity-50'
                    }`}
                >
                  {isResending ? 'Resending...' : 'Resend'}
                </button>
              </div>

            }

            {/* Support section */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Need help?</span>
                </div>
              </div>
              <div className="mt-6 text-center text-sm">
                <Link to="/contact" className="font-medium text-blue-600 hover:text-blue-500 border border-gray-200 p-1">
                  Contact our support team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Register;
