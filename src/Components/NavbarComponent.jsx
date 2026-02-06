import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { CiDark } from "react-icons/ci";
import { CiLight } from "react-icons/ci";
import { AuthContext } from '../Context/AuthContext';
import { RiLogoutCircleRLine } from "react-icons/ri";
import logo from '../assets/logo.png'
import { queryClient } from './../lib/queryClient';

export default function NavbarComponent(props) {
  const navigate = useNavigate()
  const { isLoginned, setIsLoginned } = useContext(AuthContext)
  const { toggleTheme, theme } = props;

  const logoutOperations = () => {
    localStorage.removeItem('socialAppToken')
    setIsLoginned(false)
    queryClient.removeQueries(['user-info'])
    navigate('/login')
  }
  return <>
    <nav className='bg-gray-300 text-black dark:bg-gray-900 dark:text-gray-100 md:px-15 p-4 sticky'>
      <div className="container mx-auto">
        <div className='flex justify-between items-center'>
          <Link to={'/'} className={'text-xl font-medium flex items-center gap-1.5'}><img src={logo} className='w-8 object-cover' /> HYcorner</Link>
          <div className='flex justify-center items-center gap-4'>
            {theme === 'light' ? <CiDark className='text-blue-900 text-2xl cursor-pointer' onClick={() => { toggleTheme() }} /> : <CiLight className='text-yellow-300 text-2xl cursor-pointer hover:animate-spin' onClick={() => { toggleTheme() }} />
            }
            {isLoginned ? <FaUser className='text-xl cursor-pointer' onClick={() => { navigate('/profile') }} /> : null}
            {isLoginned ? <RiLogoutCircleRLine className='text-red-700 text-xl cursor-pointer' onClick={logoutOperations} /> : null}
          </div>
        </div>
      </div>
    </nav>
  </>
}
