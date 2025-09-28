import React from "react";
import { cn } from "@/utils/cn";

type TextFieldVariant = "default" | "input" | "active" | "disabled";
type TextFieldSize = "sm" | "md" | "lg";

interface TextFieldProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: TextFieldVariant;
  size?: TextFieldSize;
  fullWidth?: boolean;
}


const base =
    "rounded-[4px] transition-colors duration-150 outline-none w-[686px] h-auto";

const variants: Record<TextFieldVariant, string> = {
  default: "border border-[#E6E6E6] text-black placeholder-[#909090] bg-transparent",
  input: "border border-[#E6E6E6] text-black placeholder-[#000000] bg-transparent",
  active: "border border-[#555555] text-black placeholder-[#000000] bg-transparent",
  disabled: "border border-transparent text-black placeholder-[#909090] bg-[#E6E6E6] cursor-not-allowed",
};

const sizes: Record<TextFieldSize, string> = {
  sm: "px-[16px] py-[12px] text-[12px]",
  md: "px-[16px] py-[12px] text-[16px]",
  lg: "px-[16px] py-[12px] text-[20px]",
};

export const TextField: React.FC<TextFieldProps> = ({
  variant = "default",
  size = "md",
  className = "",
  disabled,
  fullWidth,
  ...props
}) => {
  const cls = cn(
    base,
    variants[variant],
    sizes[size],
    fullWidth ? "w-full" : "",
    className
  );

  return <input className={cls} disabled={disabled} {...props} />;
};

export default TextField;
