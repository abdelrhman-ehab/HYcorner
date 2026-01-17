import React, { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from './../Context/AuthContext';

export default function AuthProtectedRoute({ children }) {
    const { isLoginned, setIsLoginned } = useContext(AuthContext)

    return isLoginned ? <Navigate to={'/'} /> : children;
}
