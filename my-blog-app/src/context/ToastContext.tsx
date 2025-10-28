/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import Toast from '@/components/common/Toast'

type ToastType = 'positive' | 'negative'

interface ToastContextProps {
  showToast: (message: string, type?: ToastType) => void
}

const ToastContext = createContext<ToastContextProps | null>(null)

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<{ show: boolean; message: string; type: ToastType }>({
    show: false,
    message: '',
    type: 'positive',
  })

  const showToast = (message: string, type: ToastType = 'positive') => {
    setToast({ show: true, message, type })
    setTimeout(() => setToast({ show: false, message: '', type: 'positive' }), 2000)
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast.show && (
        <div className='fixed bottom-6 left-1/2 -translate-x-1/2 z-50'>
          <Toast type={toast.type} message={toast.message} />
        </div>
      )}
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast must be used within a ToastProvider')
  return context
}
