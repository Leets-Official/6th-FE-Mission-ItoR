import {
  confirmButtonVariants,
  modalBox,
  modalContainer,
  titleStyle,
  descriptionStyle,
  cancelButtonStyle,
  confirmButtonBase,
} from './ConfirmModal.styled'
import type { ConfirmModalProps } from './ConfirmModal.types'

export default function ConfirmModal({
  isOpen,
  title,
  description,
  cancelText = '취소',
  confirmText = '삭제하기',
  onCancel,
  onConfirm,
  variant = 'danger',
}: ConfirmModalProps) {
  if (!isOpen) return null

  const confirmButtonClass = `${confirmButtonBase} ${confirmButtonVariants[variant]}`

  return (
    <div className={modalContainer}>
      <div className={modalBox}>
        <h2 className={titleStyle}>{title}</h2>

        {description && <p className={descriptionStyle}>{description}</p>}

        <div className='flex gap-2 w-full'>
          <button onClick={onCancel} className={cancelButtonStyle}>
            {cancelText}
          </button>
          <button onClick={onConfirm} className={confirmButtonClass}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}
