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
      <aside className='w-[240px] bg-white shadow-xl h-full animate-slide-in-left'>
        {isLoggedIn ? <SidebarLoggedIn /> : <SidebarLoggedOut />}
      </aside>

      <div className='flex-1' onClick={close} />
    </div>
  )
}
