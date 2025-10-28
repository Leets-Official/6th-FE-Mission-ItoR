/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import ConfirmModal from '@/components/common/ConfirmModal/ConfirmModal'

interface ModalContextProps {
  openModal: (title: string, onConfirm: () => void) => void
}

const ModalContext = createContext<ModalContextProps | null>(null)

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState('')
  const [onConfirmAction, setOnConfirmAction] = useState<() => void>(() => () => {})

  const openModal = (title: string, onConfirm: () => void) => {
    setModalTitle(title)
    setOnConfirmAction(() => onConfirm)
    setIsOpen(true)
  }

  const handleCancel = () => setIsOpen(false)
  const handleConfirm = () => {
    onConfirmAction()
    setIsOpen(false)
  }

  return (
    <ModalContext.Provider value={{ openModal }}>
      {children}
      <ConfirmModal
        isOpen={isOpen}
        title={modalTitle}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </ModalContext.Provider>
  )
}

export const useModal = () => {
  const context = useContext(ModalContext)
  if (!context) throw new Error('useModal must be used within a ModalProvider')
  return context
}
