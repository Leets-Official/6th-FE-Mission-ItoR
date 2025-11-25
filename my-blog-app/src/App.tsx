import { Outlet } from 'react-router-dom'
import { ToastProvider } from './context/ToastContext'
import { ModalProvider } from './context/ModalContext'
import { AuthProvider } from './context/AuthContext'
import { SidebarProvider } from './context/SidebarContext'
import { LoginModalProvider } from './context/LoginModalContext'
import SidebarOverlay from './components/Sidebar/SidebarOverlay'

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <ModalProvider>
          <SidebarProvider>
            <LoginModalProvider>
              {/* SidebarOverlay는 전역으로 렌더링되며 */}
              <SidebarOverlay />
              {/* Outlet은 라우터에서 정의된 하위 컴포넌트를 렌더링합니다. */}
              <Outlet />
            </LoginModalProvider>
          </SidebarProvider>
        </ModalProvider>
      </ToastProvider>
    </AuthProvider>
  )
}

export default App