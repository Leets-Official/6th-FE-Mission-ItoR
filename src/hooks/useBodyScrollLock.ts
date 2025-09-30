// hooks/useBodyScrollLock.ts
import { useEffect } from 'react';

/**
 * 모달이 열릴 때 body 스크롤을 비활성화
 * @param isLocked - 스크롤을 잠글지 여부
 */
export const useBodyScrollLock = (isLocked: boolean) => {
  useEffect(() => {
    if (!isLocked) return;

    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;

    // 스크롤바 너비 계산 (스크롤바가 사라질 때 레이아웃 shift 방지)
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
    };
  }, [isLocked]);
};