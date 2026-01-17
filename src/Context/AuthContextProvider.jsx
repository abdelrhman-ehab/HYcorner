import { createContext, useState } from "react";
import { AuthContext } from "./AuthContext";

export default function AuthContextProvider({ children }) {

    const [token, setToken] = useState(localStorage.getItem('socialAppToken') || null)
    const [isLoginned, setIsLoginned] = useState(localStorage.getItem('socialAppToken') !== null)

    return <AuthContext.Provider value={{ isLoginned, setIsLoginned, token, setToken }}>
        {children}
    </AuthContext.Provider>
} 