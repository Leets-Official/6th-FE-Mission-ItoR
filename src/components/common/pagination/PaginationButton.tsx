import { NavigateBeforeIcon } from '@/assets/icons/common';
import { type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import React from 'react';
import { paginationButtonVariants } from './paginationButtonVariants';

interface PaginationButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof paginationButtonVariants> {
  children?: React.ReactNode;
  className?: string;
}

const PaginationButton: React.FC<PaginationButtonProps> = ({
  variant,
  state,
  direction,
  children,
  className,
  disabled,
  ...props
}) => {
  const renderContent = () => {
    if (variant === 'navigation' && (direction === 'prev' || direction === 'next')) {
      const iconColorClass = state === 'disabled' ? 'text-character-disabled-25' : 'text-character-title-85';
      return <NavigateBeforeIcon className={clsx('w-3 h-3', direction === 'next' && 'rotate-180', iconColorClass)} />;
    }

    if (variant === 'page') {
      return (
        <span
          className={clsx(
            'flex flex-col justify-center',
            'w-[18px] h-[30px]',
            'text-center',
            'font-["Roboto"] text-sm font-regular',
            'leading-[22px]',
            ''
          )}
        >
          {children}
        </span>
      );
    }

    return children;
  };

  return (
    <button
      className={clsx(
        paginationButtonVariants({ variant, state: disabled ? 'disabled' : state, direction }),
        className
      )}
      disabled={disabled}
      {...props}
    >
      {renderContent()}
    </button>
  );
};

export default PaginationButton;
