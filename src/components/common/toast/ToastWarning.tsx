import { ErrorOutlineIcon } from '@/assets/icons/common';
import { FC, ReactNode } from 'react';

interface ToastWarningProps {
  children: ReactNode;
  className?: string;
}

const ToastWarning: FC<ToastWarningProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`toast-container border-warning bg-white/90 text-warning backdrop-blur-sm ${className}`}
      style={{ cursor: 'default' }}
    >
      <div className="btn-icon text-warning">
        <ErrorOutlineIcon />
      </div>
      <span className="btn-text text-warning">{children}</span>
    </div>
  );
};

export default ToastWarning;
