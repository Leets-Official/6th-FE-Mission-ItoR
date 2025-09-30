import { ReactComponent as DoneIcon } from '../assets/icons/done.svg';
import { ReactComponent as ErrorIcon } from '../assets/icons/error_outline.svg';
import type { FC } from 'react';

const Toast: FC<{ type?: 'success' | 'warning'; message: string }> = ({ type = 'success', message }) => {
  const getIcon = () => {
    return type === 'success' ? <DoneIcon className="w-5 h-5 text-white" /> : <ErrorIcon className="w-5 h-5 text-white" />;
  };

  return (
    <div className={`flex items-center px-4 py-2 rounded shadow ${type === 'success' ? 'bg-green-500' : 'bg-orange-400'}`}>
      {getIcon()}
      <span className="ml-2 text-white">{message}</span>
    </div>
  );
};

export default Toast;
