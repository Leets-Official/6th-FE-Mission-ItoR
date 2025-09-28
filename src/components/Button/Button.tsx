import React from "react";
import CreateIcon from "@/assets/create.svg?react";
import { ButtonProps } from "./Button.types";
import { base, variants, disabledStyle } from "./Button.styled";

export const Button: React.FC<ButtonProps> = ({
  label,
  variant = "primaryOutline",
  leftIcon,
  className = "",
  disabled,
  fullWidth,
  ...props
}) => {
  const cls = [
    base,
    variants[variant],
    fullWidth ? "w-full justify-center" : "",
    disabled ? disabledStyle : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={cls} disabled={disabled} {...props}>
      {leftIcon ?? <CreateIcon className="h-6 w-6 shrink-0" />}
      <span>{label}</span>
    </button>
  );
};

export default Button;
