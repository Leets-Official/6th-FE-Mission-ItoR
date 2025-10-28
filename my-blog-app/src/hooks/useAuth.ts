import { useMutation } from '@tanstack/react-query'
import { loginAPI, registerAPI } from '@/api/authAPI'
import type { AxiosResponse } from 'axios'

// 서버 응답 타입 정의
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
  return useMutation<AxiosResponse<AuthResponse>, Error, { email: string; password: string }>({
    mutationFn: loginAPI,
    onSuccess: (res) => {
      alert('로그인 성공!')
      localStorage.setItem('token', res.data.data.token ?? '')
      window.location.reload()
    },
    onError: (err) => {
      console.error('로그인 실패:', err)
      alert('로그인 실패. 이메일/비밀번호를 확인해주세요.')
    },
  })
}

export const useRegisterMutation = () => {
  return useMutation<
    AxiosResponse<AuthResponse>,
    Error,
    {
      email: string
      password: string
      nickname: string
      name?: string
      profilePicture?: string
      birthDate?: string
      introduction?: string
    }
  >({
    mutationFn: registerAPI,
    onSuccess: () => {
      alert('회원가입 성공!')
      window.location.href = '/login'
    },
    onError: (err) => {
      console.error('회원가입 실패:', err)
      alert('회원가입 실패. 입력 정보를 확인해주세요.')
    },
  })
}
