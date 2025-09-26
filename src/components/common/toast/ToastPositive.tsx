import { DoneIcon } from '@/assets/icons/common';
import { FC, ReactNode } from 'react';

interface ToastProps {
  children: ReactNode;
  className?: string;
}

const ToastPositive: FC<ToastProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`toast-container bg-white/90 backdrop-blur-sm border-positive text-positive ${className}`}
      style={{ cursor: 'default' }}
    >
      <div className="btn-icon text-positive">
        <DoneIcon />
      </div>
      <span className="btn-text text-positive">{children}</span>
    </div>
  );
};

export default ToastPositive;
