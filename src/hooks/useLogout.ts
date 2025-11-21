// src/hooks/useLogout.ts
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

/**
 * 로그아웃 처리 전용 훅
 *
 * - 토큰 제거
 * - me 쿼리 무효화
 * - 홈으로 리다이렉트
 * - storage 이벤트 브로드캐스트
 */
export function useLogout() {
  const nav = useNavigate();
  const queryClient = useQueryClient();

  const logout = () => {
    // 1) 토큰 제거
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    // 2) me 정보 캐시 무효화
    queryClient.invalidateQueries({ queryKey: ["me"] });

    // 3) 홈으로 이동
    nav("/", { replace: true });

    // 4) storage 변경 이벤트 전파 (다른 리스너들이 반응할 수 있도록)
    window.dispatchEvent(new StorageEvent("storage"));
  };

  return { logout };
}
