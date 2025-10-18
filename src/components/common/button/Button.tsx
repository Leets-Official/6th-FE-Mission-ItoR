import { ButtonProps } from '@/components/common/Button/ButtonTypes';
import { buttonIconVariants, buttonTextVariants, buttonVariants } from '@/components/common/Button/ButtonVariants';
import { Icon } from '@/components';
import { cn } from '@/utils/cn';
import { FC } from 'react';

const Button: FC<ButtonProps> = ({
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
      className={cn(buttonVariants({ intent, size, variant, fullWidth }), className)}
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
