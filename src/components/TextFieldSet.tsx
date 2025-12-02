import React from 'react';
import TextField from './TextField';
import clsx from 'clsx';

interface TextFieldSetProps {
  label: string;
  value?: string;
  onChange?: (value: string) => void;
  variant?: 'gray' | 'blue' | 'black' | 'filled' | 'outlineblack';
  size?: 'sm' | 'lg'; // Add size prop
  placeholder?: string;
  className?: string; // For the outer div
  inputClassName?: string; // For the inner TextField
  icon?: React.ReactNode; // Add icon prop
  type?: string;
  disabled?: boolean;
}

const TextFieldSet: React.FC<TextFieldSetProps> = ({
  label,
  value,
  onChange,
  variant = 'outlineblack',
  size = 'sm',
  placeholder,
  className,
  inputClassName, // Destructure new prop
  icon, // Destructure icon prop
  type = 'text',
  disabled = false,
}) => {
  return (
    <div
      className={`w-full flex flex-col gap-3 p-[8px_0px] ${className}`} // Changed gap-[8px] to gap-3
    >
      {label && (
        <span className="font-[Noto Sans KR] font-light text-[14px] leading-[160%] tracking-[-0.5%] text-[#909090]">
          {label}
        </span>
      )}

      <TextField
        type={type}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        variant={variant}
        size={size} // Pass size down to TextField
        placeholder={placeholder}
        disabled={disabled}
        icon={icon} // Pass icon down
        className={clsx(
          'placeholder-[#B0B0B0]',
          disabled ? 'text-[#C8C8C8]' : 'text-[#000000]',
          inputClassName // Pass new prop to TextField
        )}
      />
    </div>
  );
};

export default TextFieldSet;
