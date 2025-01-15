import React from 'react'
import {Navigate} from "react-router-dom"

function ProtectedRoute({children}) {
    
    const isAuthenticated  = !!localStorage.getItem("token")
    if(!isAuthenticated){
        return <Navigate to="/login"></Navigate>
    }  

    return children 

}

export default ProtectedRoute
