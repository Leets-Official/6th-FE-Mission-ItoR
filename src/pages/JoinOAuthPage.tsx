// src/pages/JoinOAuthPage.tsx
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import ReorderIcon from "@icons/reorder.svg?react";
import OAuthSignUpForm from "@src/components/auth/OAuthSignUpForm";

type OAuthState = {
  email?: string;
  nickname?: string;
  introduction?: string;
  profileUrl?: string;
  kakaoId?: number;
  [key: string]: unknown;
};

export default function JoinOAuthPage() {
  const nav = useNavigate();
  const location = useLocation();
  const state = (location.state as OAuthState | null) || null;

  useEffect(() => {
    if (!state || !state.email || !state.nickname) {
      nav("/", { replace: true });
    }
  }, [state, nav]);

  return (
    <div className="flex min-h-dvh w-full flex-col bg-white">
      {/* 헤더 */}
      <header className="w-full border-b border-[var(--Gray96)] bg-white/90 backdrop-blur-[2px]">
        <div className="mx-auto flex h-[56px] w-full max-w-[1366px] items-center justify-between px-4 sm:px-6 md:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="메뉴 열기"
              className="inline-flex h-6 w-6 items-center justify-center"
            >
              <ReorderIcon className="h-6 w-6" />
            </button>
            <div className="logo-text select-none">GITLOG</div>
          </div>
          <div />
        </div>
      </header>

      {/* 상단 설명 섹션 */}
      <section className="w-full border-b border-[var(--Gray96)] bg-[var(--Gray96)]">
        <div className="mx-auto w-full max-w-[1366px] px-4 sm:px-6 md:px-8">
          <div className="mx-auto h-8 max-h-8 max-w-[688px]" />
          <div className="mx-auto flex w/full max-w-[688px] flex-col items-start justify-center gap-3 px-4 py-3">
            <h1 className="text-[24px] font-medium leading-[38.4px] text-[var(--Black)]">
              카카오 회원가입
            </h1>
            <p className="self-stretch text-[14px] font-light leading-[22.4px] tracking-[-0.07px] text-[var(--Gray20)]">
              카카오 계정으로 가입을 완료하기 위해 추가 정보를 입력해주세요.
            </p>
          </div>
          <div className="mx-auto h-5 max-h-5 max-w-[688px]" />
        </div>
      </section>

      {/* 본문: 실제 폼 컴포넌트 */}
      <main className="w-full flex-1">
        <OAuthSignUpForm
          state={state}
          onSuccess={() => nav("/", { replace: true })}
        />
      </main>
    </div>
  );
}
