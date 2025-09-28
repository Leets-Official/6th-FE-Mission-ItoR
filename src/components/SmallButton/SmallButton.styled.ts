import { SmallVariant } from "./SmallButton.types";

export const base =
  "inline-flex items-center gap-2 rounded-md px-2 py-1 text-[12px] font-medium transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

export const variants: Record<SmallVariant, string> = {
  secondaryOutline: "border border-transparent text-[#909090] bg-transparent",
  disabled: "border border-transparent text-[#909090] bg-[#E6E6E6]",
};
