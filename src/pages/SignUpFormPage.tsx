// src/pages/SignUpFormPage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

import ReorderIcon from "@icons/reorder.svg?react";
import SignUpForm from "@src/components/auth/SignUpForm";

export default function SignUpFormPage() {
  const nav = useNavigate();

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

      {/* 섹션: 타이틀 */}
      <section className="w-full border-b border-[var(--Gray96)] bg-[var(--Gray96)]">
        <div className="mx-auto w-full max-w-[1366px] px-4 sm:px-6 md:px-8">
          <div className="mx-auto h-8 max-h-8 max-w-[688px]" />
          <div className="mx-auto flex w/full max-w-[688px] flex-col items-start justify-center gap-3 px-4 py-3">
            <h1 className="text-[24px] font-medium leading-[38.4px] text-[var(--Black)]">
              회원가입
            </h1>
            <p className="self-stretch text-[14px] font-light leading-[22.4px] tracking-[-0.07px] text-[var(--Gray20)]">
              가입을 위해 회원님의 정보를 입력해주세요.
            </p>
          </div>
          <div className="mx-auto h-5 max-h-5 max-w-[688px]" />
        </div>
      </section>

      {/* 메인 폼 */}
      <main className="w-full flex-1">
        <SignUpForm onSuccess={() => nav("/login")} />
      </main>
    </div>
  );
}
