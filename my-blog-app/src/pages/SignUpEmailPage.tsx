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
import ConfirmModal from '@/components/common/ConfirmModal/ConfirmModal'
import { useToast } from '@/context/ToastContext'

export default function SignUpEmailPage() {
  const navigate = useNavigate()
  const { isLoggedIn } = useAuthStatus()
  const { mutate: register } = useRegisterMutation()
  const { showToast } = useToast()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nickname, setNickname] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (isLoggedIn) {
      showToast('이미 로그인된 사용자입니다.', 'negative')
      navigate('/')
    }
  }, [isLoggedIn, navigate, showToast])

  const handleSubmit = () => {
    if (!email || !password || !nickname) {
      alert('모든 정보를 입력해주세요.')
      return
    }

    // 실제 회원가입 API 호출 (성공 시 모달 표시)
    register(
      {
        email,
        password,
        nickname,
        profilePicture: 'https://example.com/profile.jpg',
        birthDate: '2000-01-01',
        name: '김주영',
        introduction: '안녕하세요!',
      },
      {
        onSuccess: () => setIsModalOpen(true),
        onError: (err) => {
          console.error(err)
          alert('회원가입 중 오류가 발생했습니다.')
        },
      },
    )
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  const handleGoHome = () => {
    setIsModalOpen(false)
    navigate('/')
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

      {/* 회원가입 완료 모달 추가 */}
      <ConfirmModal
        isOpen={isModalOpen}
        title='회원가입이 완료되었습니다!'
        onCancel={handleModalClose}
        onConfirm={handleGoHome}
        cancelText='확인'
        confirmText='홈으로 이동'
        variant='primary'
      />
    </div>
  )
}
