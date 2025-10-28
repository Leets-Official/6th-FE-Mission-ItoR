import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStatus } from '@/hooks/useAuthStatus'
import PageHeader from '@/components/common/PageHeader'
import GitlogLogo from '@/components/common/GitlogLogo'
import TextCard from '@/components/common/TextCard'
import Blank from '@/components/common/Blank'
import { KakaoIcon } from '@/assets/icons/KakaoIcon'

export default function SignUpPage() {
  const navigate = useNavigate()
  const { isLoggedIn } = useAuthStatus()

  // 로그인 시 접근 제한
  useEffect(() => {
    if (isLoggedIn) {
      alert('이미 로그인된 사용자입니다.')
      navigate('/')
    }
  }, [isLoggedIn, navigate])

  const baseButton =
    'flex justify-center items-center h-[45px] rounded-[6px] text-[14px] leading-[160%] transition w-full'
  const emailButton = `${baseButton} px-[14px] bg-[#00A1FF] hover:bg-[#0092E8] text-white font-normal tracking-[-0.07px]`
  const kakaoButton = `${baseButton} gap-[8px] px-[72px] bg-[#FEE500] hover:bg-[#FCD400] text-[15px] font-semibold text-[rgba(0,0,0,0.85)] leading-[150%]`

  return (
    <div className='min-h-screen flex flex-col items-center bg-[#FFF]'>
      <PageHeader title='GITLOG' />

      <div className='flex flex-col items-center self-stretch border-b border-[#F5F5F5] bg-[#F5F5F5]'>
        <Blank size='md' />
        <TextCard
          variant='primary'
          title='회원가입'
          subtitle=''
          className='max-w-[688px] px-[16px] py-[12px] text-[24px] font-medium text-black leading-[160%]'
        />
        <Blank size='sm' />
      </div>

      <div className='flex flex-row justify-center items-center w-[782px] max-w-[782px] py-[80px] rounded-[9px]'>
        <div className='flex flex-col items-center w-[308px] h-[160px] px-[13px] pt-[47.04px] pb-[36.93px]'>
          <GitlogLogo size='48px' color='black' spacing='2px' />
          <p className='flex justify-center items-center min-w-[240px] max-w-[344px] h-[46px] px-[16px] py-[12px] text-[#909090] text-[14px] font-light leading-[160%] text-center'>
            You can make anything by writing
          </p>
        </div>

        <div className='flex flex-col items-center gap-[2px] min-w-[240px] px-[16px]'>
          <button onClick={() => navigate('/signup/email')} className={emailButton}>
            이메일로 회원가입
          </button>

          <div className='flex justify-center items-center gap-[2px] w-[313px] my-[8px]'>
            <div className='w-[123px] h-[1px] bg-[#F5F5F5]' />
            <span className='text-[12px] text-[#909090] font-normal leading-[160%]'>또는</span>
            <div className='w-[123px] h-[1px] bg-[#F5F5F5]' />
          </div>

          <button className={kakaoButton}>
            <KakaoIcon />
            카카오로 회원가입
          </button>
        </div>
      </div>

      <Blank size='lg' />
    </div>
  )
}
