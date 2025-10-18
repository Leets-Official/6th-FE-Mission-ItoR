import PageHeader from '@/components/common/PageHeader'
import GitlogLogo from '@/components/common/GitlogLogo'
import TextCard from '@/components/common/TextCard'
import Blank from '@/components/common/Blank'
import { KakaoIcon } from '@/assets/icons/KakaoIcon'
import { useNavigate } from 'react-router-dom'

export default function SignUpPage() {
  const navigate = useNavigate()
  return (
    <div className='min-h-screen flex flex-col items-center bg-[#FFF]'>
      <PageHeader title='GITLOG' />
      {/* 상단 헤더 섹션 */}
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

      {/* 본문 영역 */}
      <div className='flex flex-row justify-center items-center w-[782px] max-w-[782px] py-[80px] rounded-[9px]'>
        {/* 왼쪽 GITLOG 로고 */}
        <div className='flex flex-col items-center w-[308px] h-[160px] px-[13px] pt-[47.04px] pb-[36.93px]'>
          <GitlogLogo size='48px' color='black' spacing='2px' />
          <p className='flex justify-center items-center min-w-[240px] max-w-[344px] h-[46px] px-[16px] py-[12px] text-[#909090] text-[14px] font-light leading-[160%] text-center'>
            You can make anything by writing
          </p>
        </div>

        {/* 오른쪽 버튼 영역 */}
        <div className='flex flex-col items-center gap-[2px] min-w-[240px] px-[16px]'>
          {/* 이메일로 회원가입 */}
          <button
            onClick={() => navigate('/signup/email')}
            className='flex justify-center items-center h-[45px] px-[14px] rounded-[6px] bg-[#00A1FF] hover:bg-[#0092E8] text-white text-[14px] font-normal leading-[160%] tracking-[-0.07px] transition w-full'
          >
            이메일로 회원가입
          </button>

          {/* 구분선 */}
          <div className='flex justify-center items-center gap-[2px] w-[313px] my-[8px]'>
            <div className='w-[123px] h-[1px] bg-[#F5F5F5]' />
            <span className='text-[12px] text-[#909090] font-normal leading-[160%]'>또는</span>
            <div className='w-[123px] h-[1px] bg-[#F5F5F5]' />
          </div>

          {/* 카카오로 회원가입 */}
          <button className='flex justify-center items-center gap-[8px] h-[45px] px-[72px] rounded-[6px] bg-[#FEE500] hover:bg-[#FCD400] text-[15px] font-semibold text-[rgba(0,0,0,0.85)] leading-[150%] transition w-full'>
            <KakaoIcon />
            카카오로 회원가입
          </button>
        </div>
      </div>

      {/* 하단 여백 */}
      <Blank size='lg' />
    </div>
  )
}
