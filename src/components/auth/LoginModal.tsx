import { FC, useRef } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/utils/cn';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import LoginPage from '@/pages/auth/LoginPage';
import Icon from '@/components/common/Icon/Icon';
import { ClearIcon } from '@/assets/icons/common';

interface LoginModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: FC<LoginModalProps> = ({
  className = '',
  isOpen,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  
  // 커스텀 훅들
  useBodyScrollLock(isOpen);
  useFocusTrap(modalRef, isOpen);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div 
      className="login-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
    >
      <div 
        ref={modalRef}
        className={cn('login-modal-container', className)}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="닫기"
          onClick={onClose}
          className="flex items-center gap-2.5 absolute right-4 top-4 text-white hover:text-gray-90 transition-colors"
        >
          <Icon size="md" clickable>
            <ClearIcon />
          </Icon>
        </button>
        <LoginPage />
      </div>
    </div>,
    document.body
  );
};

export default LoginModal;