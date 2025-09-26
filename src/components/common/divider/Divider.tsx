import { FC } from 'react';

interface DividerProps {
  className?: string;
}

const Divider: FC<DividerProps> = ({ className = '' }) => {
  return <div className={`w-[580px] h-px bg-gray-96 ${className}`} />;
};

export default Divider;
