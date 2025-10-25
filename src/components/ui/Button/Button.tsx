import React from "react";
import clsx from "clsx";
import PencilIconSvg from "@icons/pencil.svg?react";
import type { ButtonProps } from "@ui/Button/Button.types";
import { baseClass, byVariant } from "@ui/Button/Button.variants";

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  leftIcon = false,
  variant = "outlinePointWhite",
  disabled = false,
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(baseClass, byVariant[variant], className)}
    >
      {leftIcon && (
        <PencilIconSvg
          className="w-5 h-5 mr-1 shrink-0"
          aria-hidden
        />
      )}

      {children}
    </button>
  );
};

export default Button;
