import React from "react";
import CreateIcon from "@/assets/create.svg?react";
import { SmallButtonProps } from "./SmallButton.types";
import { base, variants, disabledStyle } from "./SmallButton.styled";
import { cn } from "@/utils/cn";

export const SmallButton: React.FC<SmallButtonProps> = ({
  label,
  variant = "secondaryOutline",
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
      {leftIcon ?? <CreateIcon className="h-3 w-3 shrink-0" />}
      <span>{label}</span>
    </button>
  );
};

export default SmallButton;
