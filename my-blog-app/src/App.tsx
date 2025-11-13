import { RouterProvider } from 'react-router-dom'
import router from './routes'
import { ToastProvider } from '@/context/ToastContext'
import { ModalProvider } from '@/context/ModalContext'
import { AuthProvider } from '@/context/AuthContext'
function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <ModalProvider>
          <RouterProvider router={router} />
        </ModalProvider>
      </ToastProvider>
    </AuthProvider>
  )
}

export default App
