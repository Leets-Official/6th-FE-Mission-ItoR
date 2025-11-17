import { useSidebar } from '@/context/useSidebar'
import { useAuthStore } from '@/stores/useAuthStore'
import SidebarLoggedIn from '@/components/Sidebar/SidebarLoggedIn'
import SidebarLoggedOut from '@/components/Sidebar/SidebarLoggedOut'

export default function SidebarOverlay() {
  const { isOpen, close } = useSidebar()
  const { isLoggedIn } = useAuthStore()

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-50 flex'>
      {/* ← 왼쪽에서 나오는 사이드바 */}
      <aside
        className='
          w-[240px] bg-white shadow-xl h-full
          animate-slide-in-left
        '
      >
        {isLoggedIn ? <SidebarLoggedIn /> : <SidebarLoggedOut />}
      </aside>

      {/* 오른쪽 오버레이(클릭하면 닫힘) */}
      <div className='flex-1' onClick={close} />
    </div>
  )
}
