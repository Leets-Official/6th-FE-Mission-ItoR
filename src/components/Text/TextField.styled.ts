import { TextFieldVariant, TextFieldSize } from "@/components/Text/TextField.types";

export const base = "rounded-sm transition-colors duration-150 outline-none h-auto";

export const variants: Record<TextFieldVariant, string> = {
  default: "border border-brand-lightGray text-black placeholder-brand-gray bg-transparent",
  input: "border border-brand-lightGray text-black placeholder-black bg-transparent",
  active: "border border-brand-gray text-black placeholder-black bg-transparent",
  disabled:
    "border border-transparent text-black placeholder-brand-gray bg-brand-lightGray cursor-not-allowed",
};

export const sizes: Record<TextFieldSize, string> = {
  sm: "px-4 py-3 text-xs",
  md: "px-4 py-3 text-base",
  lg: "px-4 py-3 text-lg",
};
