import type { TextBoxStyle } from "./TextBox.types";

/** 공통 박스 */
export const boxBase =
  "flex w-[688px] max-w-[688px] px-4 py-3 bg-[var(--fake-white,#FFF)] " +
  "self-stretch [font-family:'Noto Sans KR']";

export const byStyleWrap: Record<TextBoxStyle, string> = {
  // 1번: column, gap:12, items-start, justify-center
  primary: "flex-col justify-center items-start gap-3",
  // 2번: column, gap:8
  compact: "flex-col justify-center items-start gap-2",
  // 3번: row center, gap:10
  single: "justify-center items-center gap-[10px]",
};

/** 1번 타이틀  */
export const titlePrimary =
  "text-[24px] leading-[38.4px] font-medium text-[var(--Black,#000)]";

/** 1,2번 설명 */
export const descCommon =
  "text-[14px] leading-[22.4px] font-light tracking-[-0.07px] text-[var(--Gray-20,#333)]";

/** 2번 타이틀 */
export const titleCompact =
  "text-[16px] leading-[25.6px] font-medium tracking-[-0.04px] " +
  "text-[var(--Black,#000)] h-12 w-full overflow-hidden text-ellipsis whitespace-nowrap";

/** 3번 텍스트 */
export const textSingle =
  "text-[14px] leading-[22.4px] font-light tracking-[-0.07px] text-[var(--Gray-20,#333)]";
