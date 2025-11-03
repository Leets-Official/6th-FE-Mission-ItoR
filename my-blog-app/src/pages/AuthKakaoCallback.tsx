import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// useNavigateMock 타입 정의
type NavigateFunction = (path: string) => string

const useNavigateMock = (): NavigateFunction => {
  return (path: string) => {
    console.log(`Navigation attempt to: ${path}`)
    // window.location.replace(path); // 실제 테스트 시 주석 해제하여 사용
    return path
  }
}

const LoadingSpinner: React.FC = () => (
  <div className='flex flex-col items-center justify-center p-8'>
    <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-gray-400'></div>
    <p className='mt-4 text-gray-600'>카카오 로그인 처리 중...</p>
  </div>
)

// 백엔드 BASE URL 설정 (LoginModal과 동일하게 하드코딩 유지)
const BACKEND_BASE_URL: string = 'https://blog.leets.land'

const AuthKakaoCallback: React.FC = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(true) // 타입 지정
  const [error, setError] = useState<string | null>(null) // 타입 지정

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    // code는 문자열 또는 null이 될 수 있습니다.
    const code: string | null = urlParams.get('code')

    // useEffect 내부에서 navigate 함수를 사용하기 위해 안정화된 navigate 함수 참조
    const stableNavigate = navigate

    if (!code) {
      // 인가 코드가 없는 경우 (사용자가 인증 취소 등)
      console.error('Authorization code not found in URL.')
      setError('카카오 로그인에 실패했거나 취소되었습니다.')
      setIsLoading(false)
      // 3초 후 로그인 페이지로 이동
      setTimeout(() => stableNavigate('/'), 3000)
      return
    }

    if (!BACKEND_BASE_URL) {
      setError('시스템 설정 오류: 백엔드 BASE URL이 없습니다.')
      setIsLoading(false)
      return
    }

    const sendCodeToBackend = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // 6단계: 추출한 인가 코드를 쿼리 파라미터에 담아 백엔드 API 호출
        const response: Response = await fetch(
          `${BACKEND_BASE_URL}/auth/kakao/redirect?code=${code}`,
        )

        if (response.ok) {
          // 7단계: 로그인/회원가입 성공 (HTTP 200)
          console.log('Login successful! Navigating to home.')
          // JWT 또는 세션 정보는 response body에 담겨와야 하며, 여기서 처리해야 합니다.
          // (예: const data = await response.json(); saveToken(data.token);)

          // 메인 페이지로 이동
          stableNavigate('/')
        } else if (response.status === 401) {
          // 6-1단계: 회원가입 필요 (HTTP 401 Unauthorized)
          console.warn('User not registered. Navigating to signup.')
          // 회원가입 페이지로 이동 (추가 정보 입력 필요)
          stableNavigate('/signup')
        } else {
          // 기타 서버 오류
          const errorText: string = await response.text()
          throw new Error(`Server responded with status ${response.status}: ${errorText}`)
        }
      } catch (err: unknown) {
        console.error('Kakao login processing failed:', err)
        let errorMessage = '로그인 처리 중 알 수 없는 오류가 발생했습니다.'

        if (err instanceof Error) {
          errorMessage = `로그인 처리 중 오류가 발생했습니다: ${err.message}`
        } else if (typeof err === 'string') {
          errorMessage = `로그인 처리 중 오류가 발생했습니다: ${err}`
        }

        setError(errorMessage)
        setIsLoading(false)
        // 3초 후 로그인 페이지로 이동
        setTimeout(() => stableNavigate('/signup/kakao'), 3000)
      }
    }

    sendCodeToBackend()
  }, [navigate]) // navigate는 Mock 함수이므로 의존성 배열에 그대로 둡니다.

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (error) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen text-red-600 p-8'>
        <h2 className='text-xl font-bold mb-4'>로그인 오류</h2>
        <p>{error}</p>
        <button
          onClick={() => navigate('/l')}
          className='mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition'
        >
          로그인 페이지로 돌아가기
        </button>
      </div>
    )
  }

  // 이 코드는 성공 시 navigate()에 의해 거의 표시되지 않지만, 만약을 위해 로딩 스피너를 유지합니다.
  return <LoadingSpinner />
}

export default AuthKakaoCallback
