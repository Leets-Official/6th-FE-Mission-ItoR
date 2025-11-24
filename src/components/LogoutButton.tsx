// src/components/LogoutButton.tsx
import React from "react";
import { useLogout } from "@src/hooks/useLogout";

export default function LogoutButton() {
  const { logout } = useLogout();

  return (
    <button
      type="button"
      onClick={logout}
      className="text-[14px] text-[var(--Gray20)] hover:text-[var(--Black)]"
    >
      로그아웃
    </button>
  );
}
