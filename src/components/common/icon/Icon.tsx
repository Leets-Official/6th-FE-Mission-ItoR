import { type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import { FC, ReactNode } from 'react';
import { iconInnerVariants, iconVariants } from './IconVariants';

export type IconSize = 'sm' | 'md' | 'lg';

interface IconProps extends VariantProps<typeof iconVariants> {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  onClick?: () => void;
}

const Icon: FC<IconProps> = ({
  children,
  size,
  clickable,
  padding,
  className = '',
  containerClassName = '',
  onClick,
}) => {
  const isClickable = clickable || Boolean(onClick);

  return (
    <div
      className={clsx(iconVariants({ size, clickable: isClickable, padding }), containerClassName)}
      onClick={onClick}
    >
      <div
        className={clsx(iconInnerVariants({ size }), '[&>svg]:h-full [&>svg]:w-full [&>svg]:fill-current', className)}
      >
        {children}
      </div>
    </div>
  );
};

export default Icon;
