// src/components/LogoutButton.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { queryClient } from "@src/main";

export default function LogoutButton() {
  const nav = useNavigate();

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    queryClient.invalidateQueries({ queryKey: ["me"] });

    nav("/", { replace: true });
    window.dispatchEvent(new StorageEvent("storage")); 
  };

  return (
    <button
      onClick={logout}
      className="text-[14px] text-[var(--Gray20)] hover:text-[var(--Black)]"
    >
      로그아웃
    </button>
  );
}
