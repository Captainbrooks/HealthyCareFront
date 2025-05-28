import { createContext, useReducer, useEffect, useCallback, useState } from "react";

import { jwtDecode } from 'jwt-decode'
import axios from "axios";


export const IsDoctorContext = createContext()



export const IsDoctorContextProvider = ({ children }) => {

  const [isDoctor, setIsDoctor] = useState(false)
  const [doctorId, setDoctorId] = useState(null)
  const [doctorName, setDoctorName] = useState("")
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("")
  const [username, setUserName] = useState("")







  useEffect(() => {
    setLoading(true)
    const token = localStorage.getItem("access_token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setEmail(decoded.email || "");
        setRole(decoded.role || "");
        setUserName(decoded.username || "");

        if (decoded?.role === "Doctor") {
          setIsDoctor(true);
          setDoctorId(decoded.id);
          setDoctorName(decoded.username || "");
        }
      } catch (err) {
        console.error("Invalid JWT", err);
      }
    }


    setLoading(false);

  }, []);

  const checkDoctorAccess = useCallback(

    async (email, role) => {
      setLoading(true)


      if (!email || !role) return;

      if (!email || role !== "Doctor") {
        setIsDoctor(false)
        setLoading(false)
        return false;
      }

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/auth/dashboard-access-check/`,
          { email, role },
          { withCredentials: true }
        );
        const allowed = Boolean(response.data.allowed);
        setIsDoctor(allowed)
        return allowed;
      } catch (error) {
        const detail = error.response?.data?.detail;
        const status = error.response?.status;
        if (
          detail === "Access denied. Not a doctor." ||
          detail === "Doctor profile not found." ||
          status === 403
        ) {
          setIsDoctor(false);
        }
      } finally {
        setLoading(false)
      }

    }, [email, role]);





  return (
    <IsDoctorContext.Provider value={{ isDoctor, role, email, doctorId, doctorName, username, checkDoctorAccess, loading }}>
      {children}
    </IsDoctorContext.Provider>
  )

}