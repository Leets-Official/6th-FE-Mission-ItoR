import { TextFieldVariant, TextFieldSize } from "./TextField.types";

export const base = "rounded-sm transition-colors duration-150 outline-none h-auto";

export const variants: Record<TextFieldVariant, string> = {
  default: "border border-gray-100 text-black placeholder-gray-400 bg-transparent",
  input: "border border-gray-100 text-black placeholder-black bg-transparent",
  active: "border border-gray-500 text-black placeholder-black bg-transparent",
  disabled:
    "border border-transparent text-black placeholder-gray-400 bg-gray-100 cursor-not-allowed",
};

export const sizes: Record<TextFieldSize, string> = {
  sm: "px-4 py-3 text-xs",
  md: "px-4 py-3 text-base",
  lg: "px-4 py-3 text-lg",
};
