import clsx from 'clsx';
import { FC, ReactNode } from 'react';

interface MobileMenuContainerProps {
  children: ReactNode;
  className?: string;
}

interface MobileMenuIconProps {
  children: ReactNode;
  className?: string;
}

const MobileMenuIcon: FC<MobileMenuIconProps> = ({ children, className = '' }) => {
  return (
    <div className={clsx('flex w-10 h-10 p-2 justify-center items-center aspect-square', className)}>{children}</div>
  );
};

const MobileMenuContainer: FC<MobileMenuContainerProps> = ({ children, className = '' }) => {
  return <div className={clsx('flex px-4 py-1 items-center gap-2.5', className)}>{children}</div>;
};

export { MobileMenuIcon };
export default MobileMenuContainer;
