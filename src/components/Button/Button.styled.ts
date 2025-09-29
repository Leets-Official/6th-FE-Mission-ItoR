import { Variant } from "./Button.types";

export const base =
  "inline-flex items-center gap-3 rounded-full px-6 py-3 text-lg font-semibold transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 cursor-pointer";

export const variants: Record<Variant, string> = {
  primaryOutline: "border border-brand-blue text-brand-blue bg-white",
  secondaryOutline: "border border-brand-gray text-brand-gray bg-white",
  tertiary: "border border-transparent text-brand-gray bg-white",
  neutral: "border border-brand-gray text-brand-gray bg-brand-lightGray",
  disabled: "border border-transparent text-brand-gray bg-brand-lightGray",
  inverse: "border border-transparent text-white bg-brand-black",
  inverseMuted: "border border-transparent text-brand-gray bg-brand-black",
};

export const iconColors: Record<string, string> = {
  primaryOutline: "text-brand-blue",
  secondaryOutline: "text-brand-gray",
  tertiary: "text-brand-gray",
  neutral: "text-brand-gray",
  disabled: "text-brand-gray",
  inverse: "text-white",
  inverseMuted: "text-brand-gray",
};

export const disabledStyle = "cursor-not-allowed";
