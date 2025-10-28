import { AxiosError } from 'axios'
import { useMutation } from '@tanstack/react-query'
import { postLogin } from '@/api/authAPI'

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
