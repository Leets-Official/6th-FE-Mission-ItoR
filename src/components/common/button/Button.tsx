import { ButtonProps } from '@/components/common/button/ButtonTypes';
import { buttonIconVariants, buttonTextVariants, buttonVariants } from '@/components/common/button/ButtonVariants';
import Icon from '@/components/common/icon/Icon';
import clsx from 'clsx';
import React from 'react';

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = '',
  type = 'button',
  showIcon = false,
  icon,
  intent = 'primary',
  size = 'md',
  variant = 'solid',
  fullWidth = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(buttonVariants({ intent, size, variant, fullWidth }), className)}
    >
      {showIcon && icon && (
        <Icon size="md" className={buttonIconVariants()}>
          {icon}
        </Icon>
      )}
      <span className={buttonTextVariants()}>{children}</span>
    </button>
  );
};

export default Button;
