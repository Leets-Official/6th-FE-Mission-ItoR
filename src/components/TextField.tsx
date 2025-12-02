import React from 'react';
import clsx from 'clsx';

type TextFieldVariant = 'gray' | 'blue' | 'black' | 'filled' | 'outlineblack';
type TextFieldSize = 'sm' | 'lg';

interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: TextFieldVariant;
  size?: TextFieldSize;
  placeholder?: string;
  icon?: React.ReactNode; // Add icon prop
}

const TextField: React.FC<TextFieldProps> = ({
  variant = 'gray',
  size = 'sm',
  placeholder = 'Text field',
  className,
  icon, // Destructure icon prop
  ...props
}) => {
  const baseStyles = 'border rounded-[4px] focus:outline-none transition-colors duration-200';

  const sizeStyles: Record<TextFieldSize, string> = {
    sm: 'w-full h-[46px] px-[16px] py-[12px] text-[14px]',
    lg: 'w-full h-[62px] px-[16px] py-[12px] text-[32px]',
  };

  const variantStyles: Record<TextFieldVariant, string> = {
    gray: 'bg-gray-100 text-black placeholder-gray-400 focus:ring-2 focus:ring-gray-400',
    blue: 'bg-blue-50 text-blue-700 placeholder-blue-300 focus:ring-2 focus:ring-blue-500',
    black: 'bg-black text-white placeholder-gray-500 focus:ring-2 focus:ring-gray-700',
    filled: 'bg-gray-100 text-black placeholder-gray-400 focus:ring-2 focus:ring-blue-500',
    outlineblack: 'bg-transparent border-[#E6E6E6] placeholder-gray-400 focus:border-blue-500',
  };

  return (
    <div className="relative w-full">
      {icon && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          {icon}
        </div>
      )}
      <input
        type={props.type || 'text'}
        placeholder={placeholder}
        className={clsx(
          baseStyles,
          sizeStyles[size],
          variantStyles[variant],
          { 'pl-10': icon }, // Add padding if icon exists
          className
        )}
        {...props}
      />
    </div>
  );
};

export default TextField;
