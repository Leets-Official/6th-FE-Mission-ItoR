// src/pages/PostDetailPage.tsx
import React from "react";
import { useParams, Navigate } from "react-router-dom";

import PageHeader from "../components/ui/PageHeader";
import TextBox from "../components/ui/TextBox";
import TextFiled from "../components/ui/TextFiled";
import ProfilePhoto from "../components/ui/Profile";

type Post = {
  id: number | string;
  title: string;
  date: string;
  author: { name: string; initial?: string; bio?: string };
};

const POSTS: Post[] = Array.from({ length: 3 }).map((_, i) => ({
  id: i + 1,
  title: "32 Title one line",
  date: "Feb 17, 2025.",
  author: { name: "닉네임", initial: "N", bio: "한 줄 소개가 들어갑니다." },
}));

export default function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const post = POSTS.find((p) => String(p.id) === id);
  if (!post) return <Navigate to="/" replace />;

  return (
    <div className="min-h-dvh w-full flex flex-col bg-[var(--White)]">
      {/* ===== Header: 수정 없이 가운데 정렬만 정확히 맞춤 ===== */}
      <header className="w-full bg-white/90 backdrop-blur-[2px]">
        <div className="w-[1366px] mx-auto">
          <PageHeader variant="comment" />
        </div>
      </header>

      {/* ===== Main ===== */}
      <main className="flex-1 w-full">
        {/* 컨텐츠는 688 기준 */}
        <div className="mx-auto w-full max-w-[688px]">
          {/* ── 타이틀 영역 ───────────────────────────────────── */}
          <section className="flex max-w-[688px] py-3 flex-col items-start self-stretch">
            {/* padding: 12px 16px, gap: 12px */}
            <div className="flex max-w-[688px] px-4 py-3 flex-col justify-center items-start gap-3 self-stretch">
              {/* TextBox 사용 + 32 medium 스펙(폰트 더 크게) */}
              <TextBox
                tbStyle="single"
                text={post.title}
                className="
                  !m-0 !p-0
                  [font-family:'Noto Sans KR'] !text-[32px] !leading-[51.2px] !font-medium
                  !text-[var(--Black)]
                "
              />
            </div>

            {/* 닉네임·날짜 라인 */}
            <div className="flex items-center gap-2 px-4">
              {/* 프로필: 20x20, 1:1 */}
              <div className="flex w-5 h-5 items-center gap-[10px] aspect-square">
                <ProfilePhoto size="sm" initial={post.author.initial} name={post.author.name} />
              </div>

              {/* 닉네임: 12 regular, Gray-20 */}
              <span className="
                [font-family:'Noto Sans KR'] text-[12px] leading-[19.2px] font-normal
                text-[var(--Gray-20,#333)]
              ">
                {post.author.name}
              </span>

              {/* 날짜: 12 light, Gray-56 */}
              <span className="
                [font-family:'Noto Sans KR'] text-[12px] leading-[19.2px] font-light
                text-[var(--Gray-56,#909090)]
              ">
                · {post.date}
              </span>
            </div>
          </section>

          {/* ── 상단 블랭크(32px) ─────────────────────────────── */}
          <div className="flex h-8 max-w-[688px] max-h-8 p-[10px] items-start gap-[10px] self-stretch aspect-[43/2]" />

          {/* ── 본문(detail 한 줄만) ─────────────────────────── */}
          <section className="flex flex-col items-center self-stretch">
            <div className="flex flex-col w-full">
              <TextBox
                tbStyle="single"
                text="detail"
                className="
                  !m-0 !p-0
                  [font-family:'Noto Sans KR'] !text-[14px] !leading-[22.4px] !font-light
                  !text-[var(--Gray-20,#333)] tracking-[-0.07px]
                "
              />
            </div>
          </section>

          {/* ── 본문 하단 블랭크(32px) ───────────────────────── */}
          <div className="flex h-8 max-w-[688px] max-h-8 p-[10px] items-start gap-[10px] self-stretch aspect-[43/2]" />

          {/* ── 댓글 영역 ─────────────────────────────────────── */}
          <section className="flex flex-col items-start gap-10 flex-[1_0_0]">
            {/* 섹션 헤더 패딩: 16 16 12 16 */}
            <div className="flex max-w-[688px] px-4 pt-4 pb-3 items-start gap-10 self-stretch">
              {/* (디자인상 빈 라인 자리) */}
              <div className="flex w-[688px] h-5 max-w-[688px] max-h-5 p-[10px] items-start gap-[10px] aspect-[172/5]" />
            </div>

            {/* 입력 래퍼: 12 16 / 중앙정렬 / 높이 66px */}
            <div className="flex max-w-[688px] px-4 py-3 justify-center items-center gap-[10px] self-stretch">
              <div className="flex max-w-[688px] px-4 py-3 flex-col justify-center items-center gap-[10px] self-stretch h-[66px] flex-[1_0_0]">
                <TextFiled
                  placeholder="댓글을 입력하세요..."
                  fullWidth
                  size="lg"
                  className="!h-[66px]"
                />
              </div>
            </div>

            {/* 가이드 블랭크: 64px */}
            <div className="flex h-16 max-w-[688px] max-h-16 p-[10px] items-start gap-[10px] self-stretch aspect-[43/4]" />
          </section>

          {/* ── 하단 소개(회색 배경/보더) ─────────────────────── */}
          <section className="flex h-[354px] flex-col items-center self-stretch border-b border-[var(--gray96,#F5F5F5)] bg-[var(--gray96,#F5F5F5)]">
            {/* top spacer 64 */}
            <div className="flex h-16 max-w-[688px] max-h-16 p-[10px] items-start gap-[10px] flex-shrink-0 self-stretch aspect-[43/4]" />

            {/* 컨텐츠 줄: 좌우 패딩 16, 가운데 정렬 */}
            <div className="flex max-w-[688px] px-4 py-3 items-center gap-[10px] self-stretch">
              {/* 프로필 + 텍스트 */}
              <div className="flex items-center gap-3">
                <ProfilePhoto size="lg" initial={post.author.initial} name={post.author.name} />
                <div className="flex flex-col">
                  {/* 이름: 32 medium(=24/500/160%) */}
                  <TextBox
                    tbStyle="single"
                    text={post.author.name}
                    className="
                      !m-0 !p-0
                      [font-family:'Noto Sans KR'] !text-[24px] !leading-[38.4px] !font-medium
                      !text-[var(--Black)]
                    "
                  />
                  {/* 소개: 14 light */}
                  <TextBox
                    tbStyle="single"
                    text={post.author.bio ?? ""}
                    className="
                      !m-0 !p-0
                      [font-family:'Noto Sans KR'] !text-[14px] !leading-[22.4px] !font-light
                      !text-[var(--Gray-20,#333)] tracking-[-0.07px]
                    "
                  />
                </div>
              </div>
            </div>
          </section>

          {/* 페이지 하단 여백 */}
          <div className="h-10" />
        </div>
      </main>
    </div>
  );
}
