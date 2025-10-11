export type ConfirmModalVariant = 'danger' | 'primary'

export interface ConfirmModalProps {
  isOpen: boolean
  title: string
  description?: string
  cancelText?: string
  confirmText?: string
  onCancel: () => void
  onConfirm: () => void
  variant?: ConfirmModalVariant
}
