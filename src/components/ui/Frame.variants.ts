/** 바깥 프레임 */
export const frameBase =
  "flex w-[240px] h-[768px] flex-col flex-shrink-0 " +
  "border-r border-[var(--Gray90,#E6E6E6)] bg-[var(--gray96,#F5F5F5)]";

/** 스타일별 레이아웃 */
export const byVariant = {
  guest: "items-start gap-[10px]",
  member: "justify-between items-start",
} as const;

/** 상단 콘텐츠 래퍼 */
export const topWrap = "w-full px-5 pt-6 flex flex-col items-start gap-4 min-w-0";

/** 버튼 행 */
export const actionsRow = "w-full flex gap-3";

/** 하단 영역(member) */
export const bottomWrap = "w-full px-5 pb-5 flex justify-between gap-3";

/** 프로필 아바타 크기 */
export const avatarBox = "w-[64px] h-[64px]";
