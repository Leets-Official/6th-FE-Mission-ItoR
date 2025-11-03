import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { handleKakaoCallback } from '@/api/authAPI'
import type { AxiosError } from 'axios'

// 로딩 스피너 컴포넌트
const LoadingSpinner: React.FC = () => (
  <div className='flex flex-col items-center justify-center p-8'>
    <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-gray-400'></div>
    <p className='mt-4 text-gray-600'>카카오 로그인 처리 중...</p>
  </div>
)

const AuthKakaoCallback: React.FC = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code')

    if (!code) {
      setError('카카오 로그인에 실패했거나 취소되었습니다.')
      setIsLoading(false)
      setTimeout(() => navigate('/'), 3000)
      return
    }

    const runLogin = async () => {
      try {
        setIsLoading(true)

        // 백엔드에 인가 코드 전달 → 로그인 또는 회원가입 처리
        const user = await handleKakaoCallback(code)
        console.log('✅ 로그인 성공:', user)

        // 백엔드가 회원가입 필요 상태(UNAUTHORIZED)를 반환한 경우
        if (user?.httpStatus === 'UNAUTHORIZED') {
          console.warn('회원가입 필요 → /signup/kakao로 이동')
          navigate('/signup/kakao', { state: { kakaoUser: user } })
          return
        }

        // 로그인 성공 시 메인 페이지로 이동
        navigate('/')
      } catch (err: unknown) {
        const error = err as AxiosError
        console.error('❌ 카카오 로그인 실패:', error)

        const status = error.response?.status

        if (status === 401 || status === 500) {
          console.warn('회원가입 필요. /signup/kakao로 이동')
          navigate('/signup/kakao', { replace: true })
        } else {
          setError('로그인 처리 중 오류가 발생했습니다.')
          setTimeout(() => navigate('/'), 3000)
        }
      } finally {
        setIsLoading(false)
      }
    }

    runLogin()
  }, [navigate])

  if (isLoading) return <LoadingSpinner />

  if (error)
    return (
      <div className='flex flex-col items-center justify-center min-h-screen text-red-600 p-8'>
        <h2 className='text-xl font-bold mb-4'>로그인 오류</h2>
        <p>{error}</p>
        <button
          onClick={() => navigate('/')}
          className='mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition'
        >
          로그인 페이지로 돌아가기
        </button>
      </div>
    )

  return <LoadingSpinner />
}

export default AuthKakaoCallback
