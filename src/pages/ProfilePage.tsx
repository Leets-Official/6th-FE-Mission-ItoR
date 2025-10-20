import React, { useState } from "react";
import clsx from "clsx";
import { Link, useNavigate, useParams } from "react-router-dom";
import PageHeader from "@ui/PageHeader";
import PostList from "../components/home/PostList";
import type { Post } from "../types/post";
import settingsIcon from "../assets/icons/settings.svg";

const POSTS: Post[] = Array.from({ length: 16 }).map((_, i) => ({
  id: i + 1,
  title: "16 Title one line",
  excerpt:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...",
  date: "Feb 17, 2025.",
  author: { name: "닉네임", avatarInitial: "N" },
  thumbnailUrl:
    i % 2 === 0
      ? "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop"
      : undefined,
}));

const styles = {
  container: {
    wrap: "mx-auto w-full max-w-[1366px]",
    pad: "px-4 sm:px-6 md:px-8",
    main: "mx-auto w-full max-w-[1366px] px-4 sm:px-6 md:px-8",
  },
} as const;

export default function ProfilePage() {
  const navigate = useNavigate();
  const { username = "me" } = useParams();
  const [page, setPage] = useState(1);

  const isAuthed = true;
  const user = {
    username: "saeryeom",
    nickname: "닉네임",
    bio: "한 줄 소개",
    avatarUrl: "",
  };
  const isOwner = isAuthed && (username === "me" || username === user.username);
  const goWrite = () => navigate("/write");

  return (
    <div className="min-h-dvh w-full bg-white flex flex-col">
      {/* 헤더 */}
      <header className="w-full bg-white/90 backdrop-blur-[2px] border-b border-[var(--Gray96)]">
        <div className={clsx(styles.container.wrap, styles.container.pad)}>
          <PageHeader variant="write" className="!w-full" onClickWrite={goWrite} />
        </div>
      </header>

      {/* 상단 회색 영역 */}
      <section
        className="flex flex-col items-center self-stretch border-b border-[var(--Gray96,#F5F5F5)] 
                   bg-[var(--Gray96,#F5F5F5)] py-8"
      >
        {/* 내부 컨테이너 (좌측 정렬 기준) */}
        <div className="w-full max-w-[688px] px-4 flex flex-col items-start gap-4">
          {/* 프로필 아이콘 */}
          <div
            className="flex w-[64px] h-[64px] items-center justify-center 
                       rounded-full bg-[var(--Gray7,#111112)] 
                       text-white text-[36px] font-[400] font-[Smooch] 
                       leading-[28px]"
          >
            G
          </div>

          {/* 닉네임 */}
          <div
            className="text-[24px] font-medium text-[var(--Black,#000)] leading-[160%]"
          >
            %{user.nickname}
          </div>

          {/* 한 줄 소개 */}
          <div
            className="text-[14px] font-light text-[var(--Gray-20,#333)] leading-[160%] tracking-[-0.07px]"
          >
            %{user.bio}
          </div>

          {/* 내 프로필 설정 버튼 */}
          {isOwner && (
            <Link
              to="/account/profile"
              className="flex items-center gap-1 border border-[var(--Gray90,#E6E6E6)] 
                         rounded-[2px] px-2 py-1.5"
            >
              <img
                src={settingsIcon}
                alt="settings"
                className="w-[12px] h-[12px] flex-shrink-0 fill-[var(--Gray56,#909090)]"
              />
              <span className="text-[12px] font-normal text-[var(--Gray56,#909090)] leading-[160%]">
                내 프로필 설정
              </span>
            </Link>
          )}
        </div>
      </section>

      {/* 본문 영역 */}
      <main className="flex-1 w-full bg-white">
        <div className={clsx(styles.container.main, "py-8")}>
          <section className="mx-auto w-full max-w-[688px]">
            <PostList posts={POSTS} page={page} onPageChange={setPage} />
          </section>
        </div>
      </main>
    </div>
  );
}
