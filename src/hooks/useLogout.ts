// src/hooks/useLogout.ts
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { clearTokens } from "@src/lib/authStorage";

export function useLogout() {
  const nav = useNavigate();
  const queryClient = useQueryClient();

  const logout = () => {
    clearTokens();
    queryClient.invalidateQueries({ queryKey: ["me"] });
    nav("/", { replace: true });
    window.dispatchEvent(new StorageEvent("storage"));
  };

  return { logout };
}
