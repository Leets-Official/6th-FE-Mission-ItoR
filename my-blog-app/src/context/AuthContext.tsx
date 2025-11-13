/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

interface AuthContextType {
  isLoggedIn: boolean
  setIsLoggedIn: (value: boolean) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    const tempLogin = localStorage.getItem('isLoggedIn')
    if (token || tempLogin === 'true') {
      setIsLoggedIn(true)
    }
  }, [])

  const logout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('isLoggedIn')
    setIsLoggedIn(false)
    alert('로그아웃되었습니다.')
    navigate('/')
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthStatus = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuthStatus must be used within an AuthProvider')
  return context
}
