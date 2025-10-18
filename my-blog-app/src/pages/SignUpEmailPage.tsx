import PageHeader from '@/components/common/PageHeader'
import TextCard from '@/components/common/TextCard'
import Blank from '@/components/common/Blank'
import ProfileImage from '@/components/ProfileImage/ProfileImage'
import { Button } from '@/components/Button/Button'
import TextFiledSet from '@/components/TextFiled/TextFiledSet'
import { AddPhotoAlternateIcon } from '@/assets/icons/AddPhotoAlternateIcon'

export default function SignUpEmailPage() {
  return (
    <div className='min-h-screen flex flex-col items-center bg-white'>
      {/* 상단 영역 재사용 */}
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

      {/* 하단 영역 */}
      <Blank size='md' />

      {/* 프로필 사진 영역 */}
      <div className='flex flex-col justify-center items-start self-stretch gap-4 max-w-[688px] px-[16px] py-[12px]'>
        <span className='text-gray-400 text-[14px] font-light leading-[160%] tracking-[-0.07px] w-full'>
          프로필 사진
        </span>

        {/* 이미지 + 버튼 묶는 영역 */}
        <div className='flex flex-col items-start gap-4'>
          <ProfileImage size='xl' />
          <Button
            intent='tag'
            className='flex gap-1 border border-[#E6E6E6] rounded-[2px] px-[8px] py-[3px]'
          >
            <AddPhotoAlternateIcon />
            <span className='text-[#909090] text-[12px] leading-[160%] font-normal'>
              프로필 사진 추가하기
            </span>
          </Button>
        </div>
      </div>

      {/* 입력 필드 */}
      <Blank size='md' />
      <div className='flex flex-col gap-4 w-full items-center'>
        <TextFiledSet label='이메일' placeholder='이메일' />
        <TextFiledSet label='비밀번호' placeholder='......' />
        <TextFiledSet label='비밀번호 확인' placeholder='......' />
        <TextFiledSet label='이름' placeholder='이름' />
        <TextFiledSet label='성별/생년월일' placeholder='YYYY - MM - DD' />
        <TextFiledSet
          label='닉네임'
          placeholder='닉네임'
          showHelper={true}
          helperText='* 20글자 이내'
        />
        <TextFiledSet label='한 줄 소개' placeholder='한 줄 소개' />
      </div>

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
