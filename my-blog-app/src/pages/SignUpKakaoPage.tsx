import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStatus } from '@/hooks/useAuthStatus'
import PageHeader from '@/components/common/PageHeader'
import TextCard from '@/components/common/TextCard'
import Blank from '@/components/common/Blank'
import { Button } from '@/components/Button/Button'
import { KakaoIcon } from '@/assets/icons/KakaoIcon'
import SignUpProfileSection from '@/components/SignUp/SignUpProfileSection'
import SignUpFormFields from '@/components/SignUp/SignUpFormFields'
import TextFiledSet from '@/components/TextFiled/TextFiledSet'

export default function SignUpKakaoPage() {
  const navigate = useNavigate()
  const { isLoggedIn } = useAuthStatus()

  // 이메일 및 프로필 이미지 상태 관리
  const [email, setEmail] = useState('')
  const [profile, setProfile] = useState<string | null>(null)

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  useEffect(() => {
    if (isLoggedIn) {
      alert('이미 로그인된 사용자입니다.')
      navigate('/')
    }
  }, [isLoggedIn, navigate])

  useEffect(() => {
    // 카카오 리다이렉트 후 URL에서 프로필 이미지 등 임시 데이터 가져오는 부분
    const storedProfile = localStorage.getItem('kakao_profile_image')
    if (storedProfile) {
      setProfile(storedProfile)
    }
  }, [])

  return (
    <div className='min-h-screen flex flex-col items-center bg-white'>
      {/* 헤더 */}
      <PageHeader title='GITLOG' />

      {/* 상단 텍스트 영역 */}
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

      {/* 프로필 이미지 섹션 */}
      <SignUpProfileSection profileImage={profile || '/guest.jpg'} />

      <Blank size='md' />

      {/* 소셜 로그인 영역 */}
      <div className='flex flex-col gap-2 w-full max-w-[688px] px-[16px]'>
        <label className='text-[14px] font-light leading-[160%] text-gray-600'>소셜 로그인</label>
        <div className='flex items-center gap-[10px] px-[16px] py-[12px] rounded-[4px] border border-[#E6E6E6] bg-[#E6E6E6]'>
          <KakaoIcon />
          <span className='text-[#909090] text-[14px] font-light leading-[160%] tracking-[-0.07px]'>
            카카오 로그인
          </span>
        </div>
      </div>

      <Blank size='md' />

      {/* 이메일 입력 필드 */}
      <TextFiledSet
        label='이메일'
        placeholder='이메일'
        value={email}
        onChange={onEmailChange}
        showHelper={false}
        helperText='* 반드시 입력해야 하는 필수 항목입니다.'
        helperType='error'
      />

      {/* 나머지 회원가입 폼 필드 */}
      <SignUpFormFields variant='kakao' />

      <Blank size='md' />

      {/* 회원가입 완료 버튼 */}
      <div className='flex justify-center w-full max-w-[688px] px-[16px]'>
        <Button
          intent='primary'
          className='w-full h-[38px] rounded-[25px] border border-[#00A1FF] bg-white text-[#00A1FF] hover:bg-[#00A1FF] hover:text-white transition text-[14px] leading-[160%]'
        >
          회원가입 완료
        </Button>
      </div>

      <Blank size='lg' />
    </div>
  )
}
