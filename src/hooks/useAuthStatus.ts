// src/hooks/useAuthStatus.ts
import { useState } from "react";

export function useAuthStatus() {
  const [isLoggedIn] = useState(() => {
    try {
      return !!localStorage.getItem("accessToken");
    } catch {
      return false;
    }
  });

  return { isLoggedIn };
}
