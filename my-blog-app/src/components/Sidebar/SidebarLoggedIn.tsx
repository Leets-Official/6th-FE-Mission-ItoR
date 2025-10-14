import { Button } from '@/components/Button/Button'
import ProfileImage from '@/components/ProfileImage/ProfileImage'
import TextCard from '@/components/common/TextCard'
import type { SidebarProps } from '@/components/Sidebar/Sidebar.types'

export default function SidebarLoggedIn({ user, onLogout, onWriteClick }: SidebarProps) {
  return (
    <aside className='flex flex-col justify-between items-start w-[240px] h-[768px] bg-[#F5F5F5] border-r border-gray-100 p-6'>
      <div className='flex flex-col gap-4 w-full'>
        <div className='flex flex-col items-start w-full gap-4'>
          <ProfileImage size='lg' />
          <TextCard variant='primary' title='%{닉네임}' subtitle='%{한 줄 소개}'></TextCard>
        </div>

        <div className='flex gap-3'>
          <Button intent='primary' size='sm' className='w-[99px]'>
            나의 깃로그
          </Button>
          <Button intent='primary' size='sm' onClick={onWriteClick} className='w-[99px]'>
            깃로그 쓰기
          </Button>
        </div>
      </div>

      <div className='flex justify-center gap-3 w-full'>
        <Button intent='secondary' size='sm' className='w-[99px]'>
          설정
        </Button>
        <Button intent='secondary' size='sm' onClick={onLogout} className='w-[99px]'>
          로그아웃
        </Button>
      </div>
    </aside>
  )
}
