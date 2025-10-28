import { useState } from 'react'
import SignUpFormFields from '@/components/SignUpFormFields'
import { Button } from '@/components/Button/Button'

export default function SignUpEmailPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nickname, setNickname] = useState('')

  const handleSubmit = () => {
    console.log('회원가입 요청', { email, password, nickname })
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
