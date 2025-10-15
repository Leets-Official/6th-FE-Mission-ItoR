import React from "react";
import clsx from "clsx";

type TextFieldVariant = "gray" | "blue" | "black" | "filled" | "outlineblack";
type TextFieldSize = "sm" | "lg";

interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: TextFieldVariant;
  size?: TextFieldSize;
  placeholder?: string;
}

const TextField: React.FC<TextFieldProps> = ({
  variant = "gray",
  size = "sm",
  placeholder = "Text field",
  className,
  ...props
}) => {
  const baseStyles = "border rounded-[4px] focus:outline-none transition-colors duration-200";

  const sizeStyles: Record<TextFieldSize, string> = {
    sm: "w-[656px] h-[46px] px-[16px] py-[12px] text-[14px]",
    lg: "w-[656px] h-[62px] px-[16px] py-[12px] text-[32px]",
  };

  const variantStyles: Record<TextFieldVariant, string> = {
    gray: "bg-gray-100 text-black placeholder-gray-400 focus:ring-2 focus:ring-gray-400",
    blue: "bg-blue-50 text-blue-700 placeholder-blue-300 focus:ring-2 focus:ring-blue-500",
    black: "bg-black text-white placeholder-gray-500 focus:ring-2 focus:ring-gray-700",
    filled: "bg-gray-100 text-black placeholder-gray-400 focus:ring-2 focus:ring-blue-500",
    outlineblack: "bg-transparent border-gray-400 text-black placeholder-gray-400 focus:border-blue-500",
  };

  return (
    <input
      type="text"
      placeholder={placeholder}
      className={clsx(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...props}
    />
  );
};

export default TextField;
