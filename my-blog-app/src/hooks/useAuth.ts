import { useMutation } from '@tanstack/react-query'
import { postLogin, postSignUp } from '@/api/authAPI'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'

/* -----------------------------
   로그인 훅
   - /auth/login API 호출
   - 성공 시 토큰 저장 및 알림 표시
-------------------------------- */
export const useLoginMutation = () => {
  return useMutation({
    mutationFn: postLogin,
    onSuccess: (data) => {
      console.log('✅ 로그인 성공:', data)
      localStorage.setItem('token', data.token)
      alert('로그인 성공!')
    },
    onError: (error: AxiosError) => {
      console.error('❌ 로그인 실패:', error.response?.data || error.message)
      alert('이메일 또는 비밀번호를 확인해주세요.')
    },
  })
}

/* -----------------------------
   회원가입 훅
   - /auth/signup API 호출
   - 성공 시 로그인 페이지(또는 홈)으로 자동 이동
-------------------------------- */
export const useSignUpMutation = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: postSignUp,
    onSuccess: () => {
      alert('회원가입이 완료되었습니다!')
      // 회원가입 완료 후 홈 또는 로그인 화면으로 이동
      // 현재 구조상 LoginModal이 HomePage에서 열리므로 홈('/') 이동을 권장
      navigate('/')
    },
    onError: (error: AxiosError) => {
      console.error('❌ 회원가입 실패:', error.response?.data || error.message)
      alert('회원가입에 실패했습니다.')
    },
  })
}
