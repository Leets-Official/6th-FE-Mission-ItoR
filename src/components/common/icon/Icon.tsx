import clsx from 'clsx';
import React from 'react';

export type IconSize = 'sm' | 'md' | 'lg';

interface IconProps {
  children: React.ReactNode;
  size?: IconSize;
  className?: string;
  containerClassName?: string;
  clickable?: boolean;
  onClick?: () => void;
}

const Icon: React.FC<IconProps> = ({
  children,
  size = 'md',
  className = '',
  containerClassName = '',
  clickable = false,
  onClick,
}) => {
  const getIconContainerClasses = (size: IconSize): string => {
    const sizes = {
      sm: 'flex w-3.5 h-3.5 justify-center items-center aspect-square',
      md: 'flex w-6 h-6 justify-center items-center aspect-square',
      lg: 'flex w-10 h-10 p-2 justify-center items-center flex-shrink-0 aspect-square',
    };
    return sizes[size];
  };

  const getIconClasses = (size: IconSize): string => {
    const sizes = {
      sm: 'w-3.5 h-3.5',
      md: 'w-6 h-6',
      lg: 'w-6 h-6',
    };
    return sizes[size];
  };

  const getClickableClasses = (): string => {
    return 'cursor-pointer hover:bg-[#E6E6E6] hover:rounded-[4px] transition-all duration-200';
  };

  const getSvgScaleClasses = (): string => {
    return '[&>svg]:w-full [&>svg]:h-full [&>svg]:fill-current';
  };

  const containerClasses = getIconContainerClasses(size);
  const iconClasses = getIconClasses(size);
  const clickableClasses = clickable || onClick ? getClickableClasses() : '';
  const svgScaleClasses = getSvgScaleClasses();

  return (
    <div className={clsx(containerClasses, clickableClasses, containerClassName)} onClick={onClick}>
      <div className={clsx(iconClasses, svgScaleClasses, className)}>{children}</div>
    </div>
  );
};

export default Icon;
