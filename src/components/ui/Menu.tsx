import clsx from 'clsx';
import React from 'react';

interface MobileMenuContainerProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileMenuIconProps {
  children: React.ReactNode;
  className?: string;
}

const MobileMenuIcon: React.FC<MobileMenuIconProps> = ({ children, className = '' }) => {
  return (
    <div className={clsx('flex w-10 h-10 p-2 justify-center items-center aspect-square', className)}>{children}</div>
  );
};

const MobileMenuContainer: React.FC<MobileMenuContainerProps> = ({ children, className = '' }) => {
  return <div className={clsx('flex px-4 py-1 items-center gap-2.5', className)}>{children}</div>;
};

export { MobileMenuIcon };
export default MobileMenuContainer;
