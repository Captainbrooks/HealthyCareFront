import { IsDoctorContext } from "../context/IsDoctorContext";

import  { useContext } from 'react'

export default function useDoctor() {
    const context=useContext(IsDoctorContext)
    if(!context){
        throw new Error("useDoctor must be inside an IsDoctorContextProvider")
    }
    return context
 
}
