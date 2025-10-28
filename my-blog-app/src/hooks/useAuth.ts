import { useMutation } from '@tanstack/react-query'
import { postLogin, postSignUp } from '@/api/authAPI'
import { AxiosError } from 'axios'

// 로그인 훅
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

// 회원가입 훅
export const useSignUpMutation = () => {
  return useMutation({
    mutationFn: postSignUp,
    onSuccess: () => {
      alert('회원가입이 완료되었습니다!')
    },
    onError: (error: AxiosError) => {
      console.error('❌ 회원가입 실패:', error.response?.data || error.message)
      alert('회원가입에 실패했습니다.')
    },
  })
}
