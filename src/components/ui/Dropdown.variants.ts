/** 패널 외곽 */
export const panelWrap =
  "absolute top-full z-50 mt-1 inline-flex flex-col items-end " +
  "shadow-[0_2px_8px_rgba(0,0,0,0.10)]";

/** 내부 시트 */
export const sheetBase =
  "flex flex-col justify-center items-start rounded-[4px] bg-white py-1";

/** 아이템(일반) */
export const itemBase =
  "flex w-[160px] items-center justify-start gap-[10px] px-3 pt-2 pb-3 " +
  "text-left text-[14px] leading-[22.4px] font-normal tracking-[-0.07px] " +
  "[font-family:'Noto Sans KR'] text-black bg-white";

/** 아이템 hover 배경 */
export const itemInteractive =
  "hover:bg-[var(--Gray90,#E6E6E6)] active:bg-[var(--Gray90,#E6E6E6)]";

export const itemDisabled = "opacity-50 cursor-not-allowed";

export const rootBase = "relative inline-block";
