import { Variant } from "./Button.types";

export const base =
    "inline-flex items-center gap-3 rounded-full px-6 py-3 text-lg font-semibold transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

export const variants: Record<Variant, string> = {
    primaryOutline: "border border-[#00A1FF] text-[#00A1FF] bg-[#FFFFFF]",
    secondaryOutline: "border border-[#909090] text-[#909090] bg-[#FFFFFF]",
    tertiary: "border border-transparent text-[#909090] bg-[#FFFFFF]",
    neutral: "border border-[#909090] text-[#909090] bg-[#E6E6E6]",
    disabled: "border border-transparent text-[#909090] bg-[#E6E6E6]",
    inverse: "border border-transparent text-[#FFFFFF] bg-[#111112]",
    inverseMuted: "border border-transparent text-[#909090] bg-[#111112]",
};

export const disabledStyle = "cursor-not-allowed";
