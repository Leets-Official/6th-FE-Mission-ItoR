import PageHeader from '@/components/common/PageHeader'
import Blank from '@/components/common/Blank'
import TextCard from '@/components/common/TextCard'
import ProfileImageUploader from '@/components/Settings/ProfileImageUploader'
import NicknameEdit from '@/components/Settings/NicknameEdit'
import PasswordEdit from '@/components/Settings/PasswordEdit'
import { Button } from '@/components/Button/Button'

export default function SettingsPage() {
  return (
    <div className='min-h-screen flex flex-col items-center bg-white'>
      {/* 상단 헤더 */}
      <PageHeader title='GITLOG' />

      {/* 상단 회색 영역 + 제목 */}
      <div className='flex flex-col items-center self-stretch border-b border-[#F5F5F5] bg-[#F5F5F5]'>
        <Blank size='md' />
        <TextCard
          variant='primary'
          title='계정 설정'
          subtitle='내 계정 정보를 수정할 수 있습니다.'
          className='max-w-[688px] px-[16px] py-[12px] text-[24px] font-medium text-black leading-[160%]'
        />
        <Blank size='sm' />
      </div>

      <Blank size='md' />

      {/* 프로필 이미지 영역 */}
      <ProfileImageUploader />

      {/* 중앙 콘텐츠 영역 */}
      <div className='flex flex-col items-center w-full max-w-[688px] px-4 py-8'>
        {/* 닉네임 수정 */}
        <NicknameEdit />

        <Blank size='md' />

        {/* 비밀번호 수정 */}
        <PasswordEdit />

        <Blank size='lg' />

        <Button intent='primary' className='w-full max-w-[300px]'>
          모든 변경 저장
        </Button>
      </div>

      <Blank size='lg' />
    </div>
  )
}
