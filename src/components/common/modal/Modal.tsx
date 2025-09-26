import {
  modalButtonsVariants,
  modalCancelButtonVariants,
  modalContainerVariants,
  modalContentVariants,
  modalConfirmButtonVariants,
} from '@/components/common/Modal/ModalVariants';
import { cn } from '@/utils/cn';
import { FC, ReactNode } from 'react';

interface ModalProps {
  children: ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  onDelete?: () => void;
  cancelButtonText?: string;
  confirmButtonText?: string;
  confirmButtonVariant?: 'primary' | 'danger' | 'secondary';
}

const Modal: FC<ModalProps> = ({
  children,
  className = '',
  isOpen,
  onClose,
  onDelete,
  cancelButtonText = '취소',
  confirmButtonText = '삭제하기',
  confirmButtonVariant = 'danger',
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className={cn(modalContainerVariants(), className)}>
        <div className={modalContentVariants()} style={{ padding: '0 4px' }}>
          {children}
        </div>
        <div className={modalButtonsVariants()}>
          <button onClick={onClose} className={modalCancelButtonVariants()}>
            {cancelButtonText}
          </button>
          {onDelete && (
            <button onClick={onDelete} className={modalConfirmButtonVariants({ variant: confirmButtonVariant })}>
              {confirmButtonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
