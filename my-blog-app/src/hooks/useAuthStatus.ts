import { useEffect, useState } from 'react'

/**
 * 로그인 상태를 감지하고 제어하는 커스텀 훅
 * - localStorage에 저장된 token 또는 isLoggedIn 값으로 판단
 * - 로그인 시: true / 로그아웃 시: false
 */
export const useAuthStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // token 또는 임시 로그인 플래그 둘 중 하나라도 있으면 로그인 상태로 판단
    const token = localStorage.getItem('token')
    const tempLogin = localStorage.getItem('isLoggedIn')
    if (token || tempLogin === 'true') {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [])

  return { isLoggedIn, setIsLoggedIn }
}

/** 로그아웃 함수 */
export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('isLoggedIn') // 임시 로그인 플래그도 함께 제거
  alert('로그아웃되었습니다.')
  window.location.href = '/' // 새로고침으로 상태 초기화
}
