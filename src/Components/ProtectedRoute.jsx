import React, { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

export default function ProtectedRoute({ children }) {
    const {isLoginned} = useContext(AuthContext)
    
    
    return isLoginned ? children : <Navigate to={'/login'} />
}
