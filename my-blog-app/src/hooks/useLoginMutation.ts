import { useMutation } from '@tanstack/react-query'
import { loginAPI } from '@/api/authAPI'
import { useAuthStore } from '@/stores/useAuthStore'
import type { AxiosResponse } from 'axios'

interface AuthResponse {
  code: number
  message: string
  data: {
    token?: string
    email?: string
    nickname?: string
  }
}

export const useLoginMutation = () => {
  const login = useAuthStore((state) => state.login)

  return useMutation<AxiosResponse<AuthResponse>, Error, { email: string; password: string }>({
    mutationFn: loginAPI,
    onSuccess: (res) => {
      const token = res.data.data.token
      if (token) {
        login(token)
        alert('로그인 성공!')
      }
    },
    onError: (err) => {
      console.error('로그인 실패:', err)
      alert('로그인 실패. 이메일/비밀번호를 확인해주세요.')
    },
  })
}
