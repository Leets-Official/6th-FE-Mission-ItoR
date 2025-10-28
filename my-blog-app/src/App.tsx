import { RouterProvider } from 'react-router-dom'
import router from './routes'
import { ToastProvider } from '@/context/ToastContext'
import { ModalProvider } from '@/context/ModalContext'

function App() {
  return (
    <ToastProvider>
      <ModalProvider>
        <RouterProvider router={router} />
      </ModalProvider>
    </ToastProvider>
  )
}

export default App
