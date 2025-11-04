import { useMutation } from '@tanstack/react-query'
import { loginAPI, registerAPI, type AuthResponse } from '@/api/authAPI'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@/context/ToastContext'

/** 로그인 Mutation 훅 */
export const useLoginMutation = () => {
  const navigate = useNavigate()
  const { showToast } = useToast()

  return useMutation<AuthResponse, Error, { email: string; password: string }>({
    mutationFn: loginAPI, // AuthResponse만 반환됨
    onSuccess: (data) => {
      localStorage.setItem('token', data.data.token ?? '')
      showToast('로그인 성공!', 'positive')
      navigate('/')
    },
    onError: (err) => {
      console.error('로그인 실패:', err)
      showToast('로그인 실패. 이메일/비밀번호를 확인해주세요.', 'negative')
    },
  })
}

/** 회원가입 Mutation 훅 */
export const useRegisterMutation = () => {
  const navigate = useNavigate()
  const { showToast } = useToast()

  return useMutation<
    AuthResponse,
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
