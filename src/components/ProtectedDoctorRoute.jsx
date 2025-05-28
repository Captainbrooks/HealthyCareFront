import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import Loader from './Loader';
import Unauthorized from '../pages/Unauthorized';
import axiosClient from '../api/axios';


function ProtectedDoctorRoute({ children }) {

  const [hasCheckedAccess, setHasCheckedAccess] = useState(false);
  const [verified, setVerified] = useState(false)

  const [verifying, setVerifying] = useState(true)


  useEffect(() => {
    const access_token = localStorage.getItem('access_token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user || !access_token) {
      setVerifying(false)
      return;
    }

    const email = user.email;
    const role = user.role;

    if (role === "Doctor" && email && !hasCheckedAccess) {
      setVerifying(true)
      const checkDoctorAccess = async () => {
        try {
          const response = await axiosClient.post(
            `/api/auth/dashboard-access-check/`,
            { email, role },
            { withCredentials: true }
          );


          if (response.data.allowed === true) {
            setHasCheckedAccess(true);
            setVerified(true)
            setVerifying(false)
          }
        } catch (error) {
          console.log(error);
          setHasCheckedAccess(false);
          setVerified(false)
          setVerifying(false)
        } finally {
          setVerifying(false);
        }
      };

      checkDoctorAccess();
    } else {
      setVerifying(false);
    }
  }, [hasCheckedAccess]);


  if (verifying) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-700">
        <div className="flex items-center space-x-3">
          <Loader />
          <span className="text-lg font-medium animate-pulse">Verifying your access, please wait...</span>
        </div>
      </div>
    );
  }



  if (!verified) {

    return <div>
      <Unauthorized />
    </div>

  }

  return <>{children}</>;
}

export default ProtectedDoctorRoute
