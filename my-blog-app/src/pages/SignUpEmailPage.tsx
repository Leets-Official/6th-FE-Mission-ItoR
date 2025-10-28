import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStatus } from '@/hooks/useAuthStatus'
import SignUpFormFields from '@/components/SignUp/SignUpFormFields'
import { Button } from '@/components/Button/Button'
import { useRegisterMutation } from '@/hooks/useAuth'
import PageHeader from '@/components/common/PageHeader'
import Blank from '@/components/common/Blank'
import TextCard from '@/components/common/TextCard'
import SignUpProfileSection from '@/components/SignUp/SignUpProfileSection'

export default function SignUpEmailPage() {
  const navigate = useNavigate()
  const { isLoggedIn } = useAuthStatus()
  const { mutate: register } = useRegisterMutation()

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
    register({
      email,
      password,
      nickname,
      name: '김주영', // 필요 시 input 추가 가능
      profilePicture: 'https://example.com/profile.jpg',
      birthDate: '2000-01-01',
      introduction: '안녕하세요!',
    })
  }

  return (
    <div className='min-h-screen flex flex-col items-center bg-white'>
      <PageHeader title='GITLOG' />
      <div className='flex flex-col items-center self-stretch border-b border-[#F5F5F5] bg-[#F5F5F5]'>
        <Blank size='md' />
        <TextCard
          variant='primary'
          title='회원가입'
          subtitle='가입을 위해 회원님의 정보를 입력해주세요.'
          className='max-w-[688px] px-[16px] py-[12px] text-[24px] font-medium text-black leading-[160%]'
        />
        <Blank size='sm' />
      </div>

      <Blank size='md' />
      <SignUpProfileSection />
      <div className='flex flex-col items-center py-8'>
        <SignUpFormFields
          variant='email'
          email={email}
          password={password}
          nickname={nickname}
          onEmailChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          onPasswordChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          onNicknameChange={(e: React.ChangeEvent<HTMLInputElement>) => setNickname(e.target.value)}
        />
        <Button intent='primary' className='mt-6' onClick={handleSubmit}>
          회원가입 완료
        </Button>
      </div>
    </div>
  )
}
