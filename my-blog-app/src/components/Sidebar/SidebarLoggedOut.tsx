import { Button } from '@/components/Button/Button'
import ProfileImage from '@/components/ProfileImage/ProfileImage'
import TextCard from '@/components/common/TextCard'
import type { SidebarProps } from '@/components/Sidebar/Sidebar.types'

export default function SidebarLoggedOut({ onLogin }: SidebarProps) {
  return (
    <aside className='flex flex-col items-start w-[240px] h-[768px] bg-[#F5F5F5] border-r border-gray-100 p-6 gap-[10px]'>
      <div className='flex flex-col w-full gap-4'>
        <div className='flex flex-col items-start w-full gap-4'>
          <ProfileImage size='lg' />
          <TextCard variant='body'>You can make anything by writing</TextCard>
          <Button intent='primary' size='sm' onClick={onLogin}>
            깃로그 시작하기
          </Button>
        </div>
      </div>
    </aside>
  )
}
