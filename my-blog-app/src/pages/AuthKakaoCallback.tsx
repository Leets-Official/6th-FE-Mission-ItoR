import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { handleKakaoCallback } from '@/api/authAPI'
import { useAuthStatus } from '@/hooks/useAuthStatus'
import type { AxiosError } from 'axios'

export default function AuthKakaoCallback() {
  const navigate = useNavigate()
  const { setIsLoggedIn } = useAuthStatus()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code')

    if (!code) {
      alert('카카오 로그인에 실패했습니다.')
      navigate('/')
      return
    }

    const fetchLogin = async () => {
      try {
        const res = await handleKakaoCallback(code)
        console.log('✅ 로그인 성공 응답:', res)

        // ✅ 로그인 성공한 경우
        if (res?.data?.httpStatus === '100 CONTINUE') {
          // 1. 임시 로그인 플래그 저장
          localStorage.setItem('isLoggedIn', 'true')

          // 2. 상태 업데이트
          setIsLoggedIn(true)

          // 3. 메인 페이지로 이동
          navigate('/')
        } else {
          // 4. 회원가입이 필요한 경우
          navigate('/signup/kakao')
        }
      } catch (err) {
        const error = err as AxiosError
        console.error('❌ 카카오 로그인 실패:', error)

        if (error.response?.status === 401) {
          navigate('/signup/kakao')
        } else {
          alert('로그인 처리 중 오류가 발생했습니다.')
          navigate('/')
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchLogin()
  }, [navigate, setIsLoggedIn])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen text-gray-700'>
      <div className='animate-spin rounded-full h-10 w-10 border-b-2 border-gray-400 mb-4'></div>
      카카오 로그인 중입니다...
    </div>
  )
}
