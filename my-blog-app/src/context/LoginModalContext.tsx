import { createContext, useContext, useState } from 'react'
import LoginModal from '@/pages/LoginModal'

interface LoginModalContextProps {
  openLogin: () => void
  closeLogin: () => void
}

const LoginModalContext = createContext<LoginModalContextProps | null>(null)

export function LoginModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const openLogin = () => setIsOpen(true)
  const closeLogin = () => setIsOpen(false)

  return (
    <LoginModalContext.Provider value={{ openLogin, closeLogin }}>
      {children}
      {isOpen && <LoginModal onClose={closeLogin} />}
    </LoginModalContext.Provider>
  )
}

export const useLoginModal = () => {
  const context = useContext(LoginModalContext)
  if (!context) throw new Error('useLoginModal must be used within LoginModalProvider')
  return context
}
