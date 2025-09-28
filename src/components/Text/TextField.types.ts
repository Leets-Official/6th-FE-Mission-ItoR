import React from "react";

export type TextFieldVariant = "default" | "input" | "active" | "disabled";
export type TextFieldSize = "sm" | "md" | "lg";

export interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: TextFieldVariant;
  size?: TextFieldSize;
  fullWidth?: boolean;
}
