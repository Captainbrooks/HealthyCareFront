import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Lock, User } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Alert from "@mui/material/Alert";
import { jwtDecode } from 'jwt-decode';
import { useAuthContext } from '../hooks/useAuthContext'
function Login() {
  const navigate = useNavigate()
  const { dispatch } = useAuthContext()


  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");

    if (accessToken) {
      const decoded = jwtDecode(accessToken);
      console.log("Doctor role match:", decoded.role === "Doctor");

      if (decoded.role === "Doctor") {
        navigate("/dashboard");
        return;
      }

      navigate("/patient-portal");
    } else {
      navigate("/login");
    }
  }, [navigate]);
  ;



  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState()
  const [loginError, setLoginError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [fieldErrors, setFieldErrors] = useState({});

  const [rememberMe, setRememberMe] = useState(false)


  const trimmedEmail = email.trim();
  const trimmedPassword = password.trim();



  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    setFieldErrors({});


    const newErrors = {};

    if (!trimmedEmail) newErrors.email = "Email is required.";
    if (!trimmedPassword) newErrors.password = ["Password is required."];

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (trimmedEmail && !emailRegex.test(trimmedEmail)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (Object.keys(newErrors).length > 0) {
      setFieldErrors(newErrors);
      return;
    }

    setIsSubmitting(true)

    console.log("API:", import.meta.env.VITE_API_URL);



    try {
      const response = await axios.post(`/api/auth/login/`, {
        email: trimmedEmail,
        password: trimmedPassword,

        withCredentials: true
      });


      const token = response.data.access_token;
      const userInfo = jwtDecode(token);  // firstly we will convert the token



      // explicitly set the information at the localStorage
      localStorage.setItem('user', JSON.stringify(userInfo));
      localStorage.setItem('access_token', token);
      localStorage.setItem('refresh_token', response.data.refresh_token)


      // navigate according to the User type
      if (userInfo.role === "Doctor") {
        navigate("/dashboard");
        return;
      } else {
        navigate("/patient-portal");
      }


      // update the react state 
      dispatch({ type: "Login", payload: userInfo })


      if (rememberMe) {
        localStorage.setItem('remember_email', email)
      } else {
        localStorage.removeItem('remember_email')
      }

    } catch (error) {
      console.log("error", error)
      if (error.response && error.response.data.error) {
        setLoginError(error.response.data.error);
      } else {
        setLoginError("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false)
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
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link
              to="/register"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              create a new account
            </Link>
          </p>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className={`appearance-none block w-full pl-10 px-3 py-2 border ${fieldErrors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {fieldErrors.email && <p className="text-sm text-red-600 mt-1">{fieldErrors.email}</p>}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"

                    className={`appearance-none block w-full pl-10 pr-10 py-2 border ${fieldErrors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {fieldErrors.password && <p className="text-sm text-red-600 mt-1">{fieldErrors.password}</p>}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link
                    to="/forgot-password"
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                    ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} 
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                >
                  {isSubmitting ? 'Logging in...' : 'Log In'}
                </button>


              </div>
              <div>{loginError && <Alert severity="error" >{loginError}</Alert>}</div>

              {
                loginError.toLowerCase().includes("verify your email before logging in") ? (

                  <div>

                    <p className="text-sm text-gray-600">
                      Your email has not been verified yet.
                      Please click the button below to verify
                      your email and complete the verification process.
                    </p>
                    <Link
                      to={`/verify-email/${email}`}
                      className="mt-3 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                    >
                      Verify Email
                    </Link>
                  </div>

                ) :


                  ("")
              }

            </form>
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Need help?
                  </span>
                </div>
              </div>
              <div className="mt-6 text-center text-sm">
                <Link
                  to="/contact"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Contact our support team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
export default Login
