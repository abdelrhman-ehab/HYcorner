import React, { useContext, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { CiDark } from "react-icons/ci";
import { CiLight } from "react-icons/ci";
import { AuthContext } from '../Context/AuthContext';
import { UserInfoContext } from '../Context/UserInfoContext';
import { RiLogoutCircleRLine } from "react-icons/ri";
import logo from '../assets/logo.png'

export default function NavbarComponent(props) {
  const navigate = useNavigate()
  const { isLoginned, setIsLoginned } = useContext(AuthContext)
  const { setUserInfo } = useContext(UserInfoContext)
  const { toggleTheme, theme } = props;
  const [menuToggle, setMenuToogle] = useState(false)

  const logoutOperations = () => {
    localStorage.removeItem('socialAppToken')
    setIsLoginned(false)
    setUserInfo(null)
    navigate('/login')
  }
  return <>
    <nav className='bg-gray-300 text-black dark:bg-gray-900 dark:text-gray-100 py-5 md:px-15 px-3'>
      <div className="container mx-auto">
        <div className='flex justify-between items-center'>
          <Link className={'text-xl font-medium flex items-center gap-1.5'} to={'/'}><img src={logo} className='w-10 object-cover'/> HYcorner</Link>
          <div className='flex justify-center items-center gap-4'>
            {theme === 'light' ? <CiDark className='text-blue-900 text-2xl cursor-pointer' onClick={() => { toggleTheme() }} /> : <CiLight className='text-yellow-300 text-2xl cursor-pointer hover:animate-spin' onClick={() => { toggleTheme() }} />
            }
            <FaUser className='text-xl cursor-pointer' onClick={() => { navigate('/profile') }} />
            {isLoginned ? <RiLogoutCircleRLine className='text-red-700 text-xl cursor-pointer' onClick={logoutOperations} /> : <Link className='rounded-md bg-blue-700 text-white px-3 py-1.5 hover:bg-blue-900 cursor-pointer' to={'/register'}>Register</Link>}
          </div>
        </div>
      </div>
    </nav>
  </>
}
