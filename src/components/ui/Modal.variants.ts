/** 화면 전체 오버레이 */
export const overlayBase =
  "fixed inset-0 z-50 flex items-center justify-center bg-black/50";

/** 카드 */
export const cardBase =
  "flex w-[326px] flex-col items-start gap-6 " +
  "rounded-[4px] bg-[var(--White)] px-4 pt-6 pb-4 " +
  "shadow-[0_2px_8px_rgba(0,0,0,0.10)]";

/** 타이틀+설명 컨테이너 */
export const headerBlock =
  "flex flex-col items-start gap-2 self-stretch px-1 rounded-[12px]";

/** 타이틀  */
export const titleLine =
  "text-[14px] leading-[22.4px] font-normal tracking-[-0.07px] " +
  "text-[var(--Black)] font-[Noto Sans KR]";

/** 설명  */
export const descLine =
  "text-[12px] leading-[19.2px] font-normal " +
  "text-[var(--Gray-56,#909090)] font-[Noto Sans KR]";

/** 버튼 행 */
export const actionsRow =
  "flex w-full items-center gap-2";

/** 버튼 */
export const btnBase =
  "flex items-center justify-center gap-2 flex-1 basis-0 " +
  "px-3 py-2 rounded-[2px] " +
  "text-[14px] leading-[22.4px] font-normal tracking-[-0.07px] " +
  "font-[Noto Sans KR]";

/** 취소 */
export const btnCancel =
  "border border-[var(--gray96,#F5F5F5)] text-[var(--Black)] bg-transparent";

/** 확인 */
export const btnConfirm =
  "bg-[var(--negative,#FF3F3F)] text-[var(--White)]";
