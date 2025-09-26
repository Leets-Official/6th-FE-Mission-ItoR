import { FC } from 'react';

interface DividerProps {
  className?: string;
}

const Divider: FC<DividerProps> = ({ className = '' }) => {
  return <div className={`h-px w-[580px] bg-gray-96 ${className}`} />;
};

export default Divider;
