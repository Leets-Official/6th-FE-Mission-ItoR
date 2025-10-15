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
  detail?: string;
  commentCount?: number;
};

const POSTS: Post[] = [
  {
    id: 1,
    title: "32 Title one line",
    date: "Feb 17, 2025.",
    author: { name: "닉네임", initial: "G", bio: "한 줄 소개" },
    detail:
      "detail",
    commentCount: 12,
  },
  {
    id: 2,
    title: "32 Title one line",
    date: "Feb 17, 2025.",
    author: { name: "닉네임", initial: "G", bio: "한 줄 소개" },
    detail: "detail",
    commentCount: 8,
  },
  {
    id: 3,
    title: "32 Title one line",
    date: "Feb 17, 2025.",
    author: { name: "닉네임", initial: "G", bio: "한 줄 소개" },
    detail: "detail",
    commentCount: 0,
  },
];

export default function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const post = POSTS.find((p) => String(p.id) === id);
  if (!post) return <Navigate to="/" replace />;

  const commentCount = post.commentCount ?? 0;

  return (
    <div className="min-h-dvh w-full flex flex-col bg-[var(--White)]">
      {/* ===== 헤더: 1366 한계선 유지 + 축소 시 콘텐츠와 함께 줄어듦 ===== */}
      <header className="w-full bg-white/90 backdrop-blur-[2px]">
        <div className="max-w-[1366px] w-full px-4 sm:px-6 md:px-8 mx-auto">
          <PageHeader variant="comment" />
        </div>
      </header>

      <main className="flex-1 w-full">
        <div className="mx-auto w-full max-w-[688px]">
          {/* ───────────────── 타이틀 박스 전체 (12 0) ───────────────── */}
          <section className="flex max-w-[688px] py-3 flex-col items-start self-stretch">
            {/* ── 내부 타이틀 영역 (12 16 / column / gap 12) ── */}
            <div className="flex max-w-[688px] px-4 py-3 flex-col justify-center items-start gap-3 self-stretch">
              <TextBox
                tbStyle="primary"
                title={post.title}
                className="
                  !w-[688px] !max-w-[688px]
                  !p-0
                  !bg-transparent
                  [font-family:'Noto Sans KR']
                "
              />
            </div>

            {/* ── 타이틀 하단 블랭크 32px ── */}
            <div className="flex w-[688px] h-8 max-w-[688px] max-h-8 p-[10px] items-start gap-[10px] self-stretch aspect-[43/2]" />

            {/* ── 닉네임/날짜/댓글수 영역 (12 16 / column / gap 40) ── */}
            <div className="flex w-[688px] px-4 py-3 flex-col items-start gap-10">
              {/* 프로필 라인 */}
              <div className="flex items-center gap-2">
                {/* 20 x 20 avatar */}
                <div className="flex w-5 h-5 items-center aspect-square">
                  <ProfilePhoto
                    size="sm"
                    initial={post.author.initial}
                    name={post.author.name}
                  />
                </div>

                {/* 닉네임: 12 regular, Gray20 */}
                <span
                  className="
                    text-[12px] leading-[19.2px] font-normal
                    text-[var(--Gray20)] [font-family:'Noto Sans KR']
                  "
                >
                  {post.author.name}
                </span>

                {/* 날짜: 12 light, Gray56 */}
                <span
                  className="
                    text-[12px] leading-[19.2px] font-light
                    text-[var(--Gray56)] [font-family:'Noto Sans KR']
                  "
                >
                  · {post.date}
                </span>

                {/* 댓글 수: 12 light, Gray56 */}
                <span
                  className="
                    text-[12px] leading-[19.2px] font-light
                    text-[var(--Gray56)] [font-family:'Noto Sans KR']
                  "
                >
                  · 댓글 {commentCount}개
                </span>
              </div>
            </div>
          </section>

          {/* ── 본문 상단 블랭크(32px) ── */}
          <div className="flex h-8 max-w-[688px] max-h-8 p-[10px] items-start gap-[10px] self-stretch aspect-[43/2]" />

          {/* ───────────────── 본문(detail) ───────────────── */}
          <section className="flex flex-col items-center self-stretch">
            <div className="w-full max-w-[688px] px-4">
              <TextBox
                tbStyle="single"
                text={post.detail ?? "detail"}
                className="
                  !m-0 !p-0
                  [font-family:'Noto Sans KR'] !text-[14px] !leading-[22.4px] !font-light
                  !text-[var(--Gray20)] tracking-[-0.07px]
                "
              />
            </div>
          </section>

          {/* ── 본문 하단 블랭크(32px) ── */}
          <div className="flex h-8 max-w-[688px] max-h-8 p-[10px] items-start gap-[10px] self-stretch aspect-[43/2]" />

          {/* ───────────────── 댓글 영역 ───────────────── */}
          <section className="flex flex-col items-start gap-10 flex-[1_0_0]">
            {/* 섹션 헤더 (16 16 12 16) + 라벨/카운트 */}
            <div className="flex max-w-[688px] px-4 pt-4 pb-3 items-start gap-10 self-stretch">
              {/* 좌우 패딩만 차지하는 자리 요소 */}
              <div className="flex w-[688px] h-5 max-w-[688px] max-h-5 p-[10px] items-start gap-[10px] aspect-[172/5]" />
            </div>

            {/* 댓글 타이틀: 16 medium + 포인트 컬러 숫자 */}
            <div className="flex max-w-[688px] px-4 items-center gap-2">
              <span
                className="
                  text-[16px] leading-[25.6px] font-normal
                  [font-family:'Noto Sans KR'] tracking-[-0.04px]
                  text-[var(--Black)]
                "
              >
                댓글
              </span>
              <span
                className="
                  text-[16px] leading-[25.6px] font-medium
                  [font-family:'Noto Sans KR'] tracking-[-0.04px]
                  text-[var(--Point)]
                "
              >
                {commentCount}
              </span>
            </div>

            {/* 안내 텍스트(센터) */}
            <div className="flex max-w-[688px] px-4 py-3 justify-center items-center gap-[10px] self-stretch">
              <p
                className="
                  text-center
                  text-[14px] leading-[22.4px] font-light
                  [font-family:'Noto Sans KR'] tracking-[-0.07px]
                  text-[var(--Gray-78,#C8C8C8)]
                "
              >
                댓글을 입력해 보세요.
              </p>
            </div>

            {/* 상단 작은 블랭크(20px 높이) */}
            <div className="flex w-[688px] h-5 max-w-[688px] max-h-5 p-[10px] items-start gap-[10px] self-stretch aspect-[172/5]" />

            {/* 입력 래퍼: 12 16 / column / center / h=66 */}
            <div className="flex max-w-[688px] px-4 py-3 flex-col justify-center items-center gap-[10px] self-stretch">
              <div className="flex max-w-[688px] px-4 py-3 flex-col justify-center items-center gap-[10px] self-stretch h-[66px]">
                <TextFiled
                  placeholder="댓글을 입력하세요..."
                  fullWidth
                  size="lg"
                  className="!h-[66px] placeholder:text-[var(--Gray-78,#C8C8C8)]"
                />
              </div>
            </div>

            {/* 추가 블랭크(64px) */}
            <div className="flex h-16 max-w-[688px] max-h-16 p-[10px] items-start gap-[10px] self-stretch aspect-[43/4]" />
          </section>
        </div>

        {/* ===== 작성자 정보 섹션 ===== */}
<section className="mt-6 w-full bg-[var(--Gray96)] border-t border-[var(--Gray96)]">
  {/* 상단 블랭크 */}
  <div className="flex h-16 max-w-[688px] max-h-16 p-[10px] items-start gap-[10px] mx-auto aspect-[43/4]" />

  <div className="mx-auto w-full max-w-[688px] px-4 py-3 flex flex-col items-start gap-3">
    {/* 프로필 64 */}
    <div className="flex w-16 h-16 items-center justify-start">
      <ProfilePhoto size="lg" initial={post.author.initial} name={post.author.name} />
    </div>

    {/* 텍스트 블록: 좌측 정렬 고정 */}
    <div className="flex flex-col items-start gap-1.5 w-full">
      {/* 닉네임 (24 / 500) */}
      <TextBox
        tbStyle="single"
        text={post.author.name}
        className="
          !m-0 !p-0 !bg-transparent
          [font-family:'Noto Sans KR'] !text-[24px] !leading-[38.4px] !font-medium
          !text-[var(--Black)] !text-left
          w-full
        "
      />
      {/* 한 줄 소개 (14 / Light) */}
      <TextBox
        tbStyle="single"
        text={post.author.bio ?? ''}
        className="
          !m-0 !p-0 !bg-transparent
          [font-family:'Noto Sans KR'] !text-[14px] !leading-[22.4px] !font-light
          !text-[var(--Gray20)] tracking-[-0.07px]
          !text-left w-full
        "
      />
    </div>
  </div>

  {/* 하단 블랭크 */}
  <div className="flex h-16 max-w-[688px] max-h-16 p-[10px] items-start gap-[10px] mx-auto aspect-[43/4]" />
</section>


        <section className="w-full bg-[var(--White)]">
          <div className="max-w-[1366px] w-full mx-auto px-4 sm:px-6 md:px-8 py-8" />
        </section>
      </main>
    </div>
  );
}
