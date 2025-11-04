import { useState } from 'react'
import { Button } from '@/components/Button/Button'
import ProfileImage from '@/components/ProfileImage/ProfileImage'
import TextCard from '@/components/common/TextCard'
import ConfirmModal from '@/components/common/ConfirmModal/ConfirmModal'
import { logout } from '@/hooks/useAuthStatus'
import type { SidebarProps } from '@/components/Sidebar/Sidebar.types'
import { useNavigate } from 'react-router-dom'

export default function SidebarLoggedIn({ user, onWriteClick }: SidebarProps) {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogoutClick = () => setIsLogoutModalOpen(true)
  const handleCancel = () => setIsLogoutModalOpen(false)
  const handleConfirm = () => {
    logout()
    setIsLogoutModalOpen(false)
    navigate('/')
  }

  return (
    <aside className='flex flex-col justify-between items-start w-[240px] h-[768px] bg-fake-white border-r border-gray-100 p-6'>
      {/* 상단 프로필 정보 */}
      <div className='flex flex-col gap-4 w-full'>
        <div className='flex flex-col items-start w-full gap-4'>
          <ProfileImage size='lg' />
          <TextCard
            variant='primary'
            title={user?.nickname || '닉네임'}
            subtitle={user?.bio || '한 줄 소개'}
          />
        </div>

        <div className='flex gap-3'>
          <Button intent='primary' size='sm' className='w-[99px]'>
            나의 깃로그
          </Button>
          <Button intent='primary' size='sm' className='w-[99px]' onClick={onWriteClick}>
            깃로그 쓰기
          </Button>
        </div>
      </div>

      {/* 하단 버튼 (설정 / 로그아웃) */}
      <div className='flex justify-center gap-3 w-full'>
        <Button intent='secondary' size='sm' className='w-[99px]'>
          설정
        </Button>
        <Button
          intent='primary'
          size='sm'
          className='w-[99px] bg-primary text-white hover:bg-primary-hover'
          onClick={handleLogoutClick}
        >
          로그아웃
        </Button>
      </div>

      {/* 로그아웃 확인 모달 */}
      <ConfirmModal
        isOpen={isLogoutModalOpen}
        title='로그아웃 하시겠습니까?'
        confirmText='로그아웃'
        cancelText='취소'
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </aside>
  )
}
