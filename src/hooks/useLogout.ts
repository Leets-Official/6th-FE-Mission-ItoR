// src/hooks/useLogout.ts
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { clearTokens } from "@src/lib/authStorage";

export function useLogout() {
  const nav = useNavigate();
  const queryClient = useQueryClient();

  const logout = () => {
    // 1) 토큰 전부 제거
    clearTokens();

    // 2) me 쿼리 캐시 자체 삭제
    queryClient.removeQueries({ queryKey: ["me"] });

    // 3) 홈으로 이동
    nav("/", { replace: true });
  };

  return { logout };
}
