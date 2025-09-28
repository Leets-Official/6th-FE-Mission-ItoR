import React from "react";
import CreateIcon from "@/assets/create.svg?react";
import { ButtonProps } from "./Button.types";
import { base, variants, disabledStyle } from "./Button.styled";
import { cn } from "@/utils/cn";

export const Button: React.FC<ButtonProps> = ({
  label,
  variant = "primaryOutline",
  leftIcon,
  className = "",
  disabled,
  fullWidth,
  ...props
}) => {
  const cls = cn(
    base,
    variants[variant],
    fullWidth && "w-full justify-center",
    disabled && disabledStyle,
    className,
  );

  return (
    <button className={cls} disabled={disabled} {...props}>
      {leftIcon ?? <CreateIcon className="h-6 w-6 shrink-0" />}
      <span>{label}</span>
    </button>
  );
};

export default Button;
