import { useState, useEffect } from 'react';

/**
 * 미디어 쿼리 상태를 추적하는 커스텀 훅
 * @param query - CSS 미디어 쿼리 문자열 (예: '(min-width: 768px)')
 * @returns 미디어 쿼리 매치 여부
 */
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    // 초기값 설정
    setMatches(mediaQuery.matches);

    // 미디어 쿼리 변경 감지
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // 이벤트 리스너 등록
    mediaQuery.addEventListener('change', handleChange);

    // 클린업
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
};

/**
 * 모바일 여부를 반환하는 헬퍼 훅
 * @param breakpoint - 브레이크포인트 픽셀 값 (기본값: 768)
 * @returns 모바일 여부
 */
export const useIsMobile = (breakpoint = 768): boolean => {
  return useMediaQuery(`(max-width: ${breakpoint - 1}px)`);
};

/**
 * 데스크톱 여부를 반환하는 헬퍼 훅
 * @param breakpoint - 브레이크포인트 픽셀 값 (기본값: 768)
 * @returns 데스크톱 여부
 */
export const useIsDesktop = (breakpoint = 768): boolean => {
  return useMediaQuery(`(min-width: ${breakpoint}px)`);
};
