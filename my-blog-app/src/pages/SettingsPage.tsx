import { useEffect, useState } from 'react'
import PageHeader from '@/components/common/PageHeader'
import Blank from '@/components/common/Blank'
import TextCard from '@/components/common/TextCard'
import ProfileImageUploader from '@/components/Settings/ProfileImageUploader'
import NicknameEdit from '@/components/Settings/NicknameEdit'
import PasswordEdit from '@/components/Settings/PasswordEdit'
import { Button } from '@/components/Button/Button'
import axiosInstance from '@/api/axiosInstance'

interface UserInfo {
  id: number
  email: string
  nickname: string
  profilePicture: string
  name: string
  birthDate: string
  introduction: string
}

export default function SettingsPage() {
  // ✔ 내 정보 state
  const [user, setUser] = useState<UserInfo | null>(null)

  // ✔ 수정 값 state (최종 저장 버튼 누르면 PATCH)
  const [newNickname, setNewNickname] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newProfile, setNewProfile] = useState('')

  /** 1) GET /users/me - 사용자 정보 로드 */
  const fetchUserInfo = async () => {
    try {
      const res = await axiosInstance.get('/users/me')
      setUser(res.data.data)

      // 초기값 저장 (수정용 state)
      setNewNickname(res.data.data.nickname)
      setNewProfile(res.data.data.profilePicture)
    } catch (e) {
      alert('내 정보를 불러오지 못했습니다.')
    }
  }

  useEffect(() => {
    fetchUserInfo()
  }, [])

  /** 2) 모든 변경 저장 PATCH */
  const handleSaveAll = async () => {
    try {
      // 닉네임 변경
      if (newNickname !== user?.nickname) {
        await axiosInstance.patch('/users/nickname', {
          nickname: newNickname,
        })
      }

      // 비밀번호 변경
      if (newPassword.trim().length > 0) {
        await axiosInstance.patch('/users/password', {
          password: newPassword,
        })
      }

      // 프로필 이미지 변경
      if (newProfile !== user?.profilePicture) {
        await axiosInstance.patch('/users/picture', {
          profilePicture: newProfile,
        })
      }

      alert('변경사항이 저장되었습니다!')
      fetchUserInfo()
    } catch (e) {
      alert('변경 저장 중 오류가 발생했습니다.')
    }
  }

  if (!user) return <div className='mt-20'>로딩 중...</div>

  return (
    <div className='min-h-screen flex flex-col items-center bg-white'>
      {/* 상단 헤더 */}
      <PageHeader title='GITLOG' />

      {/* 상단 회색 영역 */}
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

      {/* 프로필 이미지 */}
      <ProfileImageUploader value={newProfile} onChange={(url: string) => setNewProfile(url)} />

      <div className='flex flex-col items-center w-full max-w-[688px] px-4 py-8'>
        {/* 닉네임 */}
        <NicknameEdit value={newNickname} onChange={(v) => setNewNickname(v)} />

        <Blank size='md' />

        {/* 비밀번호 */}
        <PasswordEdit value={newPassword} onChange={(v) => setNewPassword(v)} />

        <Blank size='lg' />

        <Button intent='primary' className='w-full max-w-[300px]' onClick={handleSaveAll}>
          모든 변경 저장
        </Button>
      </div>

      <Blank size='lg' />
    </div>
  )
}
