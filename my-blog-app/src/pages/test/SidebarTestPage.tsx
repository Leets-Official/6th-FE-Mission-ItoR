import { SidebarLoggedIn, SidebarLoggedOut } from '@/components/Sidebar'

export default function SidebarTestPage() {
  return (
    <div className='min-h-screen flex justify-around items-start bg-white py-10'>
      {/* 로그인 전 Sidebar */}
      <div className='flex flex-col items-center'>
        <h2 className='mb-4 font-sans text-[18px] font-medium text-gray-800'>로그인 전</h2>
        <SidebarLoggedOut />
      </div>

      {/* 로그인 후 Sidebar */}
      <div className='flex flex-col items-center'>
        <h2 className='mb-4 font-sans text-[18px] font-medium text-gray-800 bg-[#F5F5F5]'>
          로그인 후
        </h2>
        <SidebarLoggedIn
          user={{
            nickname: '%{닉네임}',
            bio: '%{한 줄 소개}',
          }}
        />
      </div>
    </div>
  )
}
