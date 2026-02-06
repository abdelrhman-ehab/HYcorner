import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout';
import HomeFeed from './Pages/HomeFeed';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Profile from './Pages/Profile';
import PostDetails from './Pages/PostDetails';
import Notfound from './Pages/Notfound';
import ProtectedRoute from './Components/ProtectedRoute';
import AuthProtectedRoute from './Components/AuthProtectedRoute';

const routers = createBrowserRouter([
  {
    path: '', element: <Layout />, children: [
      { index: true, element: <ProtectedRoute><HomeFeed /></ProtectedRoute> },
      { path: '/profile', element: <ProtectedRoute><Profile /></ProtectedRoute> },
      { path: '/postDetails/:id', element: <ProtectedRoute><PostDetails /></ProtectedRoute> },
      { path: '/register', element: <AuthProtectedRoute><Register /></AuthProtectedRoute> },
      { path: '/login', element: <AuthProtectedRoute><Login /></AuthProtectedRoute> },
      { path: '*', element: <Notfound /> },
    ]
  },
])

export default function App() {
  return (
    <RouterProvider router={routers}></RouterProvider>
  )
}
