export const panelWrap =
  "absolute top-full z-50 mt-1 inline-flex flex-col items-end shadow-[0_2px_8px_rgba(0,0,0,0.10)]";

export const sheetBase =
  "flex flex-col justify-center items-start rounded-[4px] bg-white py-1";

export const itemBase =
  "flex w-[160px] items-center justify-start gap-[10px] px-3 pt-2 pb-3 " +
  "text-left text-[14px] leading-[22.4px] font-normal tracking-[-0.07px] text-black bg-white";

export const itemInteractive =
  "hover:bg-gray-90 active:bg-gray-90";

export const itemDisabled = "opacity-50 cursor-not-allowed";

export const rootBase = "relative inline-block";

/* caret */
export const caretBase = "absolute -top-2";
export const caretRightOffset = {
  none: "right-0",
  sm: "right-2",
  md: "right-4",
  lg: "right-6",
} as const;
export const caretLeftOffset = {
  none: "left-0",
  sm: "left-2",
  md: "left-4",
  lg: "left-6",
} as const;
