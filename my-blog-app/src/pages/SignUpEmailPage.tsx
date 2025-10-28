import PageHeader from '@/components/common/PageHeader'
import TextCard from '@/components/common/TextCard'
import Blank from '@/components/common/Blank'
import { Button } from '@/components/Button/Button'
import SignUpProfileSection from '@/components/SignUp/SignUpProfileSection'
import SignUpFormFields from '@/components/SignUp/SignUpFormFields'

export default function SignUpEmailPage() {
  return (
    <div className='min-h-screen flex flex-col items-center bg-white'>
      {/* 상단 영역 */}
      <PageHeader title='GITLOG' />
      <div className='flex flex-col items-center self-stretch border-b border-[#F5F5F5] bg-[#F5F5F5]'>
        <Blank size='md' />
        <TextCard
          variant='primary'
          title='회원가입'
          subtitle='가입을 위해 아래의 정보를 입력해주세요.'
          className='max-w-[688px] px-[16px] py-[12px] text-[24px] font-medium text-black leading-[160%]'
        />
        <Blank size='sm' />
      </div>

      {/* 프로필 사진 영역 */}
      <Blank size='md' />
      <SignUpProfileSection />

      {/* 입력 필드 */}
      <Blank size='md' />
      <SignUpFormFields variant='email' />

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
