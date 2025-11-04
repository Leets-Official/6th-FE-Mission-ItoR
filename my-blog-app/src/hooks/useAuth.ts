import { useMutation } from '@tanstack/react-query'
import { loginAPI, registerAPI } from '@/api/authAPI'
import type { AxiosResponse } from 'axios'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@/context/ToastContext'

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
  const navigate = useNavigate()
  const { showToast } = useToast()

  return useMutation<AxiosResponse<AuthResponse>, Error, { email: string; password: string }>({
    mutationFn: loginAPI,
    onSuccess: (res) => {
      localStorage.setItem('token', res.data.data.token ?? '')
      showToast('로그인 성공!', 'positive')
      navigate('/')
    },
    onError: (err) => {
      console.error('로그인 실패:', err)
      showToast('로그인 실패. 이메일/비밀번호를 확인해주세요.', 'negative')
    },
  })
}

export const useRegisterMutation = () => {
  const navigate = useNavigate()
  const { showToast } = useToast()

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
      showToast('회원가입 성공!', 'positive')
      navigate('/')
    },
    onError: (err) => {
      console.error('회원가입 실패:', err)
      showToast('회원가입 실패. 입력 정보를 확인해주세요.', 'negative')
    },
  })
}
