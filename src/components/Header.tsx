// src/components/layout/Header.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStatus } from "@src/hooks/useAuthStatus";
import LogoutButton from "@src/components/LogoutButton";

import ReorderIcon from "@icons/reorder.svg?react";

export default function Header() {
  const nav = useNavigate();
  const { isLoggedIn } = useAuthStatus();

  const goLogin = () => nav("/login");

  return (
    <header className="w-full bg-white/90 backdrop-blur-[2px] border-b border-[var(--Gray96)]">
      <div className="mx-auto w-full max-w-[1366px] px-4 sm:px-6 md:px-8 h-[56px] flex items-center justify-between">
        
        {/* Left: 메뉴 + 로고 */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="메뉴 열기"
            className="w-6 h-6 inline-flex items-center justify-center"
          >
            <ReorderIcon className="w-6 h-6" />
          </button>
          <div className="logo-text select-none">GITLOG</div>
        </div>

        {/* Right: 로그인 / 로그아웃 */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <LogoutButton />
          ) : (
            <button
              onClick={goLogin}
              className="text-[14px] text-[var(--Gray20)] hover:text-[var(--Black)]"
            >
              로그인
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
