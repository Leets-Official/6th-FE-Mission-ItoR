import { RouterProvider } from 'react-router-dom'
import router from './routes'
import { ToastProvider } from '@/context/ToastContext'
import { ModalProvider } from '@/context/ModalContext'
import { AuthProvider } from '@/context/AuthContext'
import { SidebarProvider } from '@/context/SidebarContext'
import { LoginModalProvider } from '@/context/LoginModalContext'
import SidebarOverlay from '@/components/Sidebar/SidebarOverlay'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <ModalProvider>
          <SidebarProvider>
            <LoginModalProvider>
              <SidebarOverlay />
              <Outlet />
            </LoginModalProvider>
          </SidebarProvider>
        </ModalProvider>
      </ToastProvider>
    </AuthProvider>
  )
}

export default App
