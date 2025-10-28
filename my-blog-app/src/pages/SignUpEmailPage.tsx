import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStatus } from '@/hooks/useAuthStatus'
import SignUpFormFields from '@/components/SignUpFormFields'
import { Button } from '@/components/Button/Button'
import { useSignUpMutation } from '@/hooks/useAuth'

export default function SignUpEmailPage() {
  const navigate = useNavigate()
  const { isLoggedIn } = useAuthStatus()
  const { mutate: signUp } = useSignUpMutation()

  useEffect(() => {
    if (isLoggedIn) {
      alert('이미 로그인된 사용자입니다.')
      navigate('/')
    }
  }, [isLoggedIn, navigate])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nickname, setNickname] = useState('')

  const handleSubmit = () => {
    if (!email || !password || !nickname) {
      alert('모든 정보를 입력해주세요.')
      return
    }
    signUp({ email, password, nickname })
  }

  return (
    <div className='flex flex-col items-center py-8'>
      <SignUpFormFields
        email={email}
        password={password}
        nickname={nickname}
        onEmailChange={(e) => setEmail(e.target.value)}
        onPasswordChange={(e) => setPassword(e.target.value)}
        onNicknameChange={(e) => setNickname(e.target.value)}
      />
      <Button intent='primary' className='mt-6' onClick={handleSubmit}>
        회원가입 완료
      </Button>
    </div>
  )
}
