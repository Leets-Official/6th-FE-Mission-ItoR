// src/components/Header.tsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

import ReorderIcon from "@icons/reorder.svg?react";
import Profile from "@ui/Profile";

import { useAuthStatus } from "@src/hooks/useAuthStatus";
import { useMyInfo } from "@src/hooks/useUser";

export default function Header() {
  const nav = useNavigate();
  const { isLoggedIn } = useAuthStatus();
  const { data: myInfoResponse } = useMyInfo();
  const myInfo = myInfoResponse?.data;

  const goLogin = () => nav("/login");
  const goMyPage = () => nav("/me");

  return (
    <header className="w-full border-b border-[var(--Gray96)] bg-white/90 backdrop-blur-[2px]">
      <div className="mx-auto flex h-[56px] w-full max-w-[1366px] items-center justify-between px-4 sm:px-6 md:px-8">
        {/* 좌측: 메뉴 & 로고 */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="메뉴 열기"
            className="inline-flex h-6 w-6 items-center justify-center"
          >
            <ReorderIcon className="h-6 w-6" />
          </button>

          <Link to="/" className="logo-text select-none">
            GITLOG
          </Link>
        </div>

        {/* 우측: 로그인 / 마이페이지 */}
        <div className="flex items-center gap-4">
          {isLoggedIn && myInfo ? (
            <button
              type="button"
              onClick={goMyPage}
              className="flex items-center gap-2 text-[14px] text-[var(--Black)]"
            >
              {/* 기존 user.svg 아이콘 대신 Profile 컴포넌트 사용 */}
              <Profile />
              <span>{myInfo.nickname}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={goLogin}
              className="text-[14px] text-[var(--Black)]"
            >
              로그인
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
