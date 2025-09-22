import {
  modalButtonsVariants,
  modalCancelButtonVariants,
  modalContainerVariants,
  modalContentVariants,
  modalDeleteButtonVariants,
} from '@/components/common/modal/modalVariants';
import clsx from 'clsx';
import React from 'react';

interface ModalProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  onDelete?: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, className = '', isOpen, onClose, onDelete }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className={clsx(modalContainerVariants(), className)}>
        <div className={modalContentVariants()} style={{ padding: '0 4px' }}>
          {children}
        </div>
        <div className={modalButtonsVariants()}>
          <button onClick={onClose} className={modalCancelButtonVariants()}>
            취소
          </button>
          {onDelete && (
            <button onClick={onDelete} className={modalDeleteButtonVariants()}>
              삭제하기
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
