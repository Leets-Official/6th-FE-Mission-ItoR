import { useEffect, useState } from 'react'

/**
 * 로그인 상태를 감지하는 커스텀 훅
 * - localStorage에 저장된 토큰 존재 여부로 판단
 * - 로그인 시: true / 로그아웃 시: false
 */
export const useAuthStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)
  }, [])

  return { isLoggedIn }
}
