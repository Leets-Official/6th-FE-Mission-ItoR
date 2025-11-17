// src/pages/MyPage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

import ReorderIcon from "@icons/reorder.svg?react";
import Button from "@ui/Button/Button";

import { useMyInfo } from "@src/hooks/useUser";

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="text-[14px] text-[var(--Gray56)]">{label}</div>
      <div className="text-[16px] text-[var(--Black)]">{value}</div>
    </div>
  );
}

export default function MyPage() {
  const nav = useNavigate();

  const {
    data,
    isLoading,
    error,
  } = useMyInfo(); // ApiEnvelope<MyInfo> 를 반환

  const me = data?.data;

  if (isLoading) {
    return <div className="p-4">내 정보를 불러오는 중입니다...</div>;
  }

  if (error || !me) {
    return (
      <div className="p-4">
        내 정보를 불러오지 못했어요. 다시 시도해주세요.
      </div>
    );
  }

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

          <Button
            type="button"
            variant="pillNeutral"
            onClick={() => nav("/me/edit")}
            className="text-[var(--Black)]"
          >
            수정하기
          </Button>
        </div>
      </header>

      {/* 상단 프로필 영역 */}
      <section className="w-full border-b border-[var(--Gray96)] bg-[var(--Gray96)]">
        <div className="mx-auto w-full max-w-[1366px]">
          <div className="mx-auto h-16 max-w-[688px] px-4" />

          <div className="mx-auto flex w-full max-w-[688px] flex-col items-start gap-3 px-4">
            <div className="flex h-[64px] w-[64px] items-center justify-center overflow-hidden rounded-full bg-[var(--Black)]">
              {me.profilePicture ? (
                <img
                  src={me.profilePicture}
                  alt="profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="logo-text text-[36px] leading-[28px] text-[var(--White)]">
                  G
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <div className="text-[24px] font-medium leading-[38.4px] text-[var(--Black)]">
                {me.nickname}
              </div>
              <div className="text-[14px] font-light leading-[22.4px] text-[var(--Gray20)]">
                {me.introduction || "소개글이 없습니다."}
              </div>
            </div>
          </div>

          <div className="mx-auto h-5 max-h-5 max-w-[688px]" />
        </div>
      </section>

      {/* 상세 정보 */}
      <main className="w-full flex-1">
        <div className="mx-auto flex w-full max-w-[688px] flex-col gap-6 px-4 py-8">
          <InfoItem label="이메일" value={me.email} />
          <InfoItem label="이름" value={me.name || "-"} />
          <InfoItem label="생년월일" value={me.birthDate || "-"} />
          <InfoItem label="소개" value={me.introduction || "-"} />
        </div>
      </main>
    </div>
  );
}
