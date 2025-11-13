import { useMutation } from '@tanstack/react-query'
import { loginAPI, type AuthResponse } from '@/api/authAPI'
import { useAuthStore } from '@/stores/useAuthStore'
import { useToast } from '@/context/ToastContext'
import { useNavigate } from 'react-router-dom'

export const useLoginMutation = (onSuccessCallback?: () => void) => {
  const login = useAuthStore((state) => state.login)
  const { showToast } = useToast()
  const navigate = useNavigate()

  return useMutation<AuthResponse, Error, { email: string; password: string }>({
    mutationFn: loginAPI,
    onSuccess: (data) => {
      const token = data.data.accessToken
      if (token) {
        login(token)
        localStorage.setItem('token', token)
        showToast('로그인 성공!', 'positive')

        if (onSuccessCallback) onSuccessCallback()

        navigate('/')
      }
    },
    onError: (err) => {
      console.error('로그인 실패:', err)
      showToast('로그인 실패. 이메일/비밀번호를 확인해주세요.', 'negative')
    },
  })
}
