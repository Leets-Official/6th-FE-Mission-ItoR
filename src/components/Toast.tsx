import { ReactComponent as DoneIcon } from '../assets/icons/done.svg';
import { ReactComponent as ErrorIcon } from '../assets/icons/error_outline.svg';
import type { FC } from 'react';

interface ToastProps {
  type?: 'success' | 'warning';
  message: string;
}

const Toast: FC<ToastProps> = ({ type = 'success', message }) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <DoneIcon className="w-5 h-5 text-white" />; // Tailwind로 크기/색 지정
      case 'warning':
        return <ErrorIcon className="w-5 h-5 text-white" />;
      default:
        return null;
    }
  };


  
  return (
    <div className={`flex items-center px-4 py-2 rounded shadow ${type === 'success' ? 'bg-green-500' : 'bg-orange-400'}`}>
      {getIcon()}
      <span className="ml-2">{message}</span>
    </div>
  );
};

export default Toast;
export { DoneIcon, ErrorIcon };