import clsx from 'clsx';
import React from 'react';

interface SpacerProps {
  className?: string;
  height?: 'sm' | 'md' | 'lg';
}

const Spacer: React.FC<SpacerProps> = ({ className = '', height = 'sm' }) => {
  const getHeightClass = (h: 'sm' | 'md' | 'lg') => {
    switch (h) {
      case 'sm':
        return 'h-5 max-h-5'; // 20px
      case 'md':
        return 'h-8 max-h-8'; // 32px
      case 'lg':
        return 'h-16 max-h-16'; // 64px
      default:
        return 'h-5 max-h-5';
    }
  };

  return (
    <div
      className={clsx(
        'flex max-w-content py-2.5 px-2.5 items-start gap-2.5 flex-shrink-0 self-stretch',
        getHeightClass(height),
        className
      )}
    />
  );
};

export default Spacer;
