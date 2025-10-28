import { Navigate } from 'react-router-dom'
import { useAuthStatus } from '@/hooks/useAuthStatus'
import React from 'react'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuthStatus()

  if (!isLoggedIn) {
    alert('로그인 후 이용해주세요.')
    return <Navigate to='/' replace />
  }

  return <>{children}</>
}
