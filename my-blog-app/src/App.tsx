import { ToastProvider } from '@/context/ToastContext'
import { ModalProvider } from '@/context/ModalContext'
import { AuthProvider } from '@/context/AuthContext'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <ModalProvider>
          <Outlet />
        </ModalProvider>
      </ToastProvider>
    </AuthProvider>
  )
}

export default App
