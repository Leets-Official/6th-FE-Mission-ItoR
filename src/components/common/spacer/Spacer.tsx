import clsx from 'clsx';
import { FC } from 'react';

interface SpacerProps {
  className?: string;
  height?: 'sm' | 'md' | 'lg';
}

const Spacer: FC<SpacerProps> = ({ className = '', height = 'sm' }) => {
  const getHeightClass = (h: 'sm' | 'md' | 'lg') => {
    switch (h) {
      case 'sm':
        return 'h-5'; // 20px // 20px
      case 'md':
        return 'h-8'; // 32px // 32px
      case 'lg':
        return 'h-16'; // 64px; // 64px
      default:
        return 'h-5';
    }
  };

  return (
    <div
      className={clsx(
        'flex max-w-content flex-shrink-0 items-start',
        getHeightClass(height),
        className
      )}
    />
  );
};

export default Spacer;
