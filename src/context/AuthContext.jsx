import { createContext,useReducer,useEffect, Children, useState } from "react";



export const AuthContext=createContext()


export const authReducer=(state,action)=>{
    switch(action.type){

        case "Register":
            return {user: action.payload}

        case "Login":
            return {user: action.payload}


        default:
            return state
    }
}



export const AuthContextProvider=({children}) => {

    const [state,dispatch]=useReducer(authReducer,
        {
            user: null
        }
    )

    const [loading,setLoading]=useState(true)

    useEffect(()=>{
        const user=localStorage.getItem('user');
        if(user){
            dispatch({type:"Login",payload:JSON.parse(user)})
        }
        setLoading(false)
    },[])


    return (
        <AuthContext.Provider value={{...state,dispatch,loading}}>
{children}
        </AuthContext.Provider>
    )
    

}