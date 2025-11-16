// src/hooks/useAuthStatus.ts
import { useState, useEffect } from "react";

export function useAuthStatus() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    try {
      return !!localStorage.getItem("accessToken");
    } catch {
      return false;
    }
  });

  // localStorage 변화 감지 → 로그인 상태 자동 반영
  useEffect(() => {
    const handler = () => {
      const hasToken = !!localStorage.getItem("accessToken");
      setIsLoggedIn(hasToken);
    };

    window.addEventListener("storage", handler);

    return () => {
      window.removeEventListener("storage", handler);
    };
  }, []);

  return { isLoggedIn, setIsLoggedIn };
}
