import React from 'react';
import clsx from 'clsx';

type ButtonVariant =
  | 'blueBorder'
  | 'grayBorder'
  | 'whiteGrayIcon'
  | 'lightGray'
  | 'grayBorderLightBg'
  | 'blackWhite'
  | 'blackGray';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  icon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'blueBorder',
  icon,
  children,
  className,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 rounded-full font-medium ' +
    'h-[40px] px-5 py-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all';

  const variantStyles: Record<ButtonVariant, string> = {
    blueBorder: 'bg-white text-blue-500 border border-blue-500',
    grayBorder: 'bg-white text-gray-500 border border-gray-400',
    whiteGrayIcon: 'bg-white text-gray-500 border-none',
    lightGray: 'bg-gray-100 text-gray-500 border-none',
    grayBorderLightBg: 'bg-gray-100 text-gray-500 border border-gray-400',
    blackWhite: 'bg-black text-white border-none',
    blackGray: 'bg-black text-gray-500 border-none',
  } as const;

  const iconColorStyles: Record<ButtonVariant, string> = {
    blueBorder: 'text-blue-500',
    grayBorder: 'text-gray-500',
    whiteGrayIcon: 'text-gray-500',
    lightGray: 'text-gray-500',
    grayBorderLightBg: 'text-gray-500',
    blackWhite: 'text-white',
    blackGray: 'text-gray-500',
  } as const;

  return (
    <button
      className={clsx(baseStyles, variantStyles[variant], className)}
      disabled={props.disabled}
      {...props}
    >
      {icon &&
        React.cloneElement(icon, {
          className: clsx(icon.props.className, iconColorStyles[variant], 'w-5 h-5'),
        })}
      <span className="text-[14px] flex items-center justify-center whitespace-nowrap">
        {children}
      </span>
    </button>
  );
};

export default Button;
