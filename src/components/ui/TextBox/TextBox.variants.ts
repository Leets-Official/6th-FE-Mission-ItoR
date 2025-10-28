import type { TextBoxStyle } from "./TextBox.types";

export const boxBase =
  "flex w-[688px] max-w-[688px] px-4 py-3 bg-white self-stretch";

export const byStyleWrap: Record<TextBoxStyle, string> = {
  primary: "flex-col justify-center items-start gap-3",
  compact: "flex-col justify-center items-start gap-2",
  single: "justify-center items-center gap-[10px]",
};

export const titlePrimary =
  "text-[24px] leading-[38.4px] font-medium text-black";

export const descCommon =
  "text-[14px] leading-[22.4px] font-light tracking-[-0.07px] text-gray-20";

export const titleCompact =
  "text-[16px] leading-[25.6px] font-medium tracking-[-0.04px] text-black " +
  "h-12 w-full overflow-hidden text-ellipsis whitespace-nowrap";

export const textSingle =
  "text-[14px] leading-[22.4px] font-light tracking-[-0.07px] text-gray-20";
