import type React from "react";

export type TFSize = "lg" | "sm";
export type TFStyle = "placeholder" | "default" | "emphasis" | "disabled";

export interface TextFiledProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  size?: TFSize;
  tfStyle?: TFStyle;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}
