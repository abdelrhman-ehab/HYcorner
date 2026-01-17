import React, { useContext, useEffect, useState } from 'react'
import { UserInfoContext } from './UserInfoContext'
import { getUserInfoApi } from '../ApiRequests/ApiRequests'
import { AuthContext } from './AuthContext'

export default function UserInfoContextProvider({ children }) {
    const { isLoginned } = useContext(AuthContext)

    const [userInfo, setUserInfo] = useState(null)
    // get user info
    const getUserInfo = async () => {
        const response = await getUserInfoApi()
        setUserInfo(response.user)
    }

    useEffect(() => {
        if (isLoginned) {
            getUserInfo()
        }
    }, [isLoginned])


    return <UserInfoContext.Provider value={{ userInfo }} >
        {children}
    </UserInfoContext.Provider>
}
