import React from "react";
import { cn } from "@/utils/cn";
import { TextFieldProps } from "./TextField.types";
import { base, variants, sizes } from "./TextField.styled";

export const TextField: React.FC<TextFieldProps> = ({
  variant = "default",
  size = "md",
  className = "",
  disabled,
  fullWidth,
  ...props
}) => {
  const cls = cn(base, variants[variant], sizes[size], fullWidth ? "w-full" : "", className);

  return <input className={cls} disabled={disabled} {...props} />;
};

export default TextField;
