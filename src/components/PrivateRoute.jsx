import React, {  useEffect, useState } from 'react'
import Login from './Login';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

function PrivateRoute({children}) {
  const {user,loading}=useAuthContext();

  if(loading){
    return <div>Loading...</div>
  }

  if(user && user.role !== "Doctor"){
    Navigate("/")
    return
  }





  return children

   
}

export default PrivateRoute
