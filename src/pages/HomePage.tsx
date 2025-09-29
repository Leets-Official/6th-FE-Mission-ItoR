// src/pages/HomePage.tsx
import React, { useMemo, useState } from "react";
import PageHeader from "@ui/PageHeader";
import Pagenation from "@ui/Pagenation";

type Post = {
  id: number | string;
  title: string;
  excerpt: string;
  date: string;
  author: { name: string; avatarInitial?: string; avatarSrc?: string };
  thumbnailUrl?: string;
};

const POSTS: Post[] = Array.from({ length: 16 }).map((_, i) => ({
  id: i + 1,
  title: "16 Title one line",
  excerpt:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  date: "Feb 17, 2025.",
  author: { name: "닉네임", avatarInitial: "N" },
  thumbnailUrl:
    i % 2 === 0
      ? "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=400&auto=format&fit=crop"
      : undefined,
}));

function TinyAvatar({ initial = "N" }: { initial?: string }) {
  return (
    <div className="w-5 h-5 rounded-full bg-[var(--Gray7)] flex items-center justify-center text-white text-[10px] leading-[10px]">
      {initial}
    </div>
  );
}

export default function HomePage() {
  const [page, setPage] = useState(1);

  const pageSize = 5;
  const totalPages = Math.max(1, Math.ceil(POSTS.length / pageSize));
  const current = Math.min(page, totalPages);
  const sliced = useMemo(
    () => POSTS.slice((current - 1) * pageSize, current * pageSize),
    [current],
  );

  // 본문 컨테이너(항상 688px 한도)
  const mainContainer = "mx-auto w-full max-w-[688px] px-4 sm:px-6 md:px-8";
  // 헤더 컨테이너: 항상 브라우저 가로폭을 따라가도록 풀-브리드스
  const headerContainer = "w-full px-4 sm:px-6 md:px-8";

  return (
    <div className="min-h-dvh w-full bg-[var(--White)] flex flex-col">
      {/* ===== 헤더 (배경+내용 모두 전체폭) ===== */}
      <header className="w-full bg-white/90 backdrop-blur-[2px]">
        <div className={headerContainer}>
          <PageHeader variant="write" className="!w-full" />
        </div>
      </header>

      {/* ===== 본문 ===== */}
      <main className="flex-1 w-full">
        <div className={mainContainer}>
          <ul className="divide-y divide-[var(--Gray90)]">
            {sliced.map((p) => (
              <li key={String(p.id)} className="py-5 md:py-6">
                <div className="grid grid-cols-[1fr_auto] gap-4">
                  {/* 텍스트 */}
                  <div className="min-w-0">
                    {/* 제목 */}
                    <div className="flex items-start gap-4 py-2">
                      <h3 className="text-[16px] leading-[25.6px] font-medium tracking-[-0.04px] text-[var(--Black)]">
                        {p.title}
                      </h3>
                    </div>

                    {/* 요약: 한 줄 말줄임 */}
                    <p className="h-12 overflow-hidden text-ellipsis whitespace-nowrap text-[14px] leading-[22.4px] font-light tracking-[-0.07px] text-[#555]">
                      {p.excerpt}
                    </p>

                    {/* 메타 */}
                    <div className="mt-3 flex items-center gap-2">
                      <TinyAvatar initial={p.author.avatarInitial} />
                      <span className="text-[12px] leading-[19.2px] font-normal text-[var(--Gray20)]">
                        {p.author.name}
                      </span>
                      <span className="text-[12px] leading-[19.2px] font-light text-[var(--Gray56)]">
                        · {p.date}
                      </span>
                      <span className="text-[12px] leading-[19.2px] font-light text-[var(--Gray56)]">
                        · 댓글0
                      </span>
                    </div>
                  </div>

                  {/* 썸네일 */}
                  {p.thumbnailUrl && (
                    <img
                      src={p.thumbnailUrl}
                      alt=""
                      className="w-[124px] h-[116px] rounded-[2px] object-cover flex-shrink-0"
                      loading="lazy"
                    />
                  )}
                </div>
              </li>
            ))}
          </ul>

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <div className="mt-6 mb-10 flex justify-center">
              <Pagenation page={current} totalPages={totalPages} onChange={setPage} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
