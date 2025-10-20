import { useState } from 'react'
import PageHeader from '@/components/common/PageHeader'
import TextCard from '@/components/common/TextCard'
import Blank from '@/components/common/Blank'
import ProfileImage from '@/components/ProfileImage/ProfileImage'
import { Button } from '@/components/Button/Button'
import TextFiledSet from '@/components/TextFiled/TextFiledSet'
import { AddPhotoAlternateIcon } from '@/assets/icons/AddPhotoAlternateIcon'

export default function SignUpEmailPage() {
  const [nickname, setNickname] = useState('')
  const hasError = nickname.length > 20
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
        <TextFiledSet
          label='이메일'
          placeholder='이메일'
          showHelper={false}
          helperText='* 반드시 입력해야하는 필수 사항입니다.'
          helperType='error'
        />
        <TextFiledSet
          label='비밀번호'
          placeholder='......'
          showHelper={false}
          helperText='* 비밀번호가 일치하지 않습니다.'
          helperType='error'
        />
        <TextFiledSet label='비밀번호 확인' placeholder='......' showHelper={false} />
        <TextFiledSet
          label='이름'
          placeholder='이름'
          showHelper={false}
          helperText='* 반드시 입력해야하는 필수 사항입니다.'
          helperType='error'
        />
        <TextFiledSet
          label='생년월일'
          placeholder='YYYY - MM - DD'
          showHelper={false}
          helperText='* 2025년 3월 16일 이전만 입력 가능합니다.'
          helperType='error'
        />
        <TextFiledSet
          label='닉네임'
          placeholder='닉네임'
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          showHelper={true}
          helperText={hasError ? '* 닉네임은 최대 20자까지입니다.' : '* 20글자 이내'}
          hasError={hasError}
        />
        <TextFiledSet
          label='한 줄 소개'
          placeholder='한 줄 소개'
          showHelper={false}
          helperText='* 한 줄 소개는 최대 30자까지입니다.'
          helperType='error'
        />
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
