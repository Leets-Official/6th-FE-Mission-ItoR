import PageHeader from '@/components/common/PageHeader'
import TextCard from '@/components/common/TextCard'
import Blank from '@/components/common/Blank'
import { Button } from '@/components/Button/Button'
import { KakaoIcon } from '@/assets/icons/KakaoIcon'
import SignUpProfileSection from '@/components/SignUp/SignUpProfileSection'
import SignUpFormFields from '@/components/SignUp/SignUpFormFields'

export default function SignUpKakaoPage() {
  return (
    <div className='min-h-screen flex flex-col items-center bg-white'>
      {/* 상단 영역 */}
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

      {/* 프로필 사진 영역 */}
      <Blank size='md' />
      <SignUpProfileSection />

      {/* 소셜 로그인 섹션 */}
      <Blank size='md' />
      <div className='flex flex-col gap-2 w-full max-w-[688px] px-[16px]'>
        <label className='text-[14px] font-light leading-[160%] text-gray-600'>소셜 로그인</label>
        <div className='flex items-center gap-[10px] px-[16px] py-[12px] rounded-[4px] border border-[#E6E6E6] bg-[#E6E6E6]'>
          <KakaoIcon />
          <span className='text-[#909090] text-[14px] font-light leading-[160%] tracking-[-0.07px]'>
            카카오 로그인
          </span>
        </div>
      </div>

      {/* 입력 필드 */}
      <Blank size='md' />
      <SignUpFormFields variant='kakao' />

      {/* 버튼 */}
      <Blank size='md' />
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
