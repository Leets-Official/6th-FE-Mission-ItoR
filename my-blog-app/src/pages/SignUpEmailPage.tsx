import PageHeader from '@/components/common/PageHeader'
import Blank from '@/components/common/Blank'
import TextCard from '@/components/common/TextCard'
import ProfileImageUploader from '@/components/Settings/ProfileImageUploader'
import NicknameEdit from '@/components/Settings/NicknameEdit'
import PasswordEdit from '@/components/Settings/PasswordEdit'
import { Button } from '@/components/Button/Button'
import { useUserSettings } from '@/hooks/useUserSettings'
import { useEffect } from 'react'

export default function SettingsPage() {
  const { user, fetchUser, handleSaveAll, isLoading, setNewProfile } = useUserSettings()

  useEffect(() => {
    fetchUser()
  }, [])
  const handleProfileChange = (newUrl: string) => {
    setNewProfile(newUrl)
  }

  if (isLoading || !user) return <div className='text-center mt-20'>불러오는 중...</div>

  return (
    <div className='min-h-screen flex flex-col items-center bg-white'>
      <PageHeader title='GITLOG' />
      <div className='flex flex-col items-center self-stretch border-b border-[#F5F5F5] bg-[#F5F5F5]'>
        <Blank size='md' />
        <TextCard
          variant='primary'
          title='계정 설정'
          subtitle='내 계정 정보를 수정할 수 있습니다.'
          className='max-w-[688px] px-[16px] py-[12px] text-[24px] font-medium'
        />
        <Blank size='sm' />
      </div>
      <Blank size='md' />
      <ProfileImageUploader
        initialUrl={user.profilePicture}
        onChange={handleProfileChange}
        disabled={isLoading}
      />
      <div className='flex flex-col items-center w-full max-w-[688px] px-4 py-8'>
        <NicknameEdit initialValue={user.nickname} />
        <Blank size='md' />
        <PasswordEdit />
        <Blank size='lg' />
        <Button intent='primary' className='w-full max-w-[300px]' onClick={handleSaveAll}>
          모든 변경 저장
        </Button>
      </div>
      <Blank size='lg' />
    </div>
  )
}
