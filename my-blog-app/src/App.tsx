import { ToastProvider } from '@/context/ToastContext'
import { ModalProvider } from '@/context/ModalContext'
import { AuthProvider } from '@/context/AuthContext'
import { SidebarProvider } from '@/context/SidebarContext'
import SidebarOverlay from '@/components/Sidebar/SidebarOverlay'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <ModalProvider>
          <SidebarProvider>
            <SidebarOverlay />

            <Outlet />
          </SidebarProvider>
        </ModalProvider>
      </ToastProvider>
    </AuthProvider>
  )
}

export default App
