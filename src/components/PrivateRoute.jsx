import React, { Children, useEffect, useState } from 'react'
import Login from './Login';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

function PrivateRoute({children}) {
    const [isAuthenticated,setIsAuthenticated]=useState(false)
    const  navigate =useNavigate()


    useEffect(()=>{
        const accessToken=localStorage.getItem("access_token");

        if(accessToken){
            setIsAuthenticated(true)
        }
    },[])

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/patient-portal"); 
        }
    }, [isAuthenticated, navigate]);

  return (
    <div>
      {isAuthenticated ? children : <Navigate to="/login" replace /> }
    </div>
  )
}

export default PrivateRoute
