// src/pages/HomePage.tsx
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { useSearchParams, useNavigate } from "react-router-dom";

import Header from "@src/components/Header";
import PageHeader from "@ui/PageHeader";
import Frame from "@ui/Frame";
import Container from "@ui/Container";
import PostList from "@src/components/home/PostList";
import type { Post } from "@src/types/post";

import { usePosts } from "@src/hooks/usePosts";
import { useAuthStatus } from "@src/hooks/useAuthStatus";
import { useKakaoStart } from "@src/hooks/useAuth";
import HomeLoginModal from "@src/components/home/HomeLoginModal";

export default function HomePage() {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);

  const [search, setSearch] = useSearchParams();
  const loginOpen = search.get("login") === "1";
  const openLogin = () =>
    setSearch({ login: "1" }, { replace: true });
  const closeLogin = () => {
    search.delete("login");
    setSearch(search, { replace: true });
  };

  useEffect(() => {
    document.body.style.overflow = loginOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [loginOpen]);

  const [showFrame, setShowFrame] = useState(false);
  const toggleFrame = () => setShowFrame((v) => !v);

  const { isLoggedIn } = useAuthStatus();
  const isAuthed = isLoggedIn;

  const user = {
    username: "saeryeom",
    nickname: "닉네임",
    bio: "한 줄 소개",
    avatarUrl: "",
  };

  const goStart = () => navigate("/join");
  const goMyGitlog = () =>
    navigate(`/profile/${user.username}`);
  const goWrite = () => {
    if (!isAuthed) return openLogin();
    navigate("/write");
  };
  const goSettings = () => navigate("/me/edit");
  const doLogout = () => navigate("/", { replace: true });

  const { data, isLoading, isError } = usePosts(page, 10);
  const postSummaries = data?.data ?? [];

  const posts: Post[] = postSummaries.map((p) => {
    const nick = p.author?.nickname ?? "익명";
    const initial = nick.charAt(0).toUpperCase();
    const dateText = p.createdAt
      ? `${new Date(p.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}.`
      : "";

    return {
      id: p.id,
      title: p.title,
      excerpt: p.excerpt ?? "",
      date: dateText,
      author: { name: nick, avatarInitial: initial },
      thumbnailUrl: p.thumbnailUrl,
      commentCount: p.commentCount ?? 0,
    };
  });

  const totalPages = Math.max(data?.totalPages ?? 1, 1);

  const {
    mutate: startKakaoLogin,
    isPending: isKakaoStarting,
  } = useKakaoStart();

  const handleKakaoLogin = () => {
    if (isKakaoStarting) return;
    startKakaoLogin();
  };

  return (
    <div className="min-h-dvh w-full bg-white flex flex-col">
      <Header />

      {showFrame && (
        <div className="hidden md:block z-20">
          <Frame
            variant={isAuthed ? "member" : "guest"}
            name={isAuthed ? `%${user.nickname}` : "%{닉네임}"}
            intro={isAuthed ? `%${user.bio}` : "%{한 줄 소개}"}
            avatarSrc={user.avatarUrl}
            initial="G"
            onStart={goStart}
            onMyGitlog={goMyGitlog}
            onWrite={goWrite}
            onSettings={goSettings}
            onLogout={doLogout}
          />
        </div>
      )}

      <main
        className={clsx(
          "flex-1 w-full",
          showFrame ? "md:ml-[240px]" : "ml-0"
        )}
      >
        <Container className="py-8">
          <PageHeader
            variant="write"
            onClickMenu={toggleFrame}
            onClickWrite={goWrite}
            className="!w-full mb-6"
          />

          <section className="flex flex-col gap-6 w-full">
            {isLoading && (
              <div className="text-center text-[14px] text-[var(--Gray56)] py-8">
                로딩 중입니다...
              </div>
            )}

            {isError && (
              <div className="text-center text-[14px] text-[var(--Negative)] py-8">
                목록을 불러오지 못했어요.
              </div>
            )}

            {!isLoading && !isError && (
              <>
                {posts.length === 0 ? (
                  <div className="text-center text-[14px] text-[var(--Gray56)] py-8">
                    아직 작성된 게시글이 없습니다.
                  </div>
                ) : (
                  <PostList posts={posts} />
                )}

                <div className="flex items-center justify-center gap-2 pt-2">
                  <button
                    type="button"
                    className="px-3 py-1 text-[12px] rounded border border-[var(--Gray90)] disabled:text-[var(--Gray78)] disabled:border-[var(--Gray90)]"
                    onClick={() =>
                      setPage((p) => Math.max(1, p - 1))
                    }
                    disabled={page <= 1}
                  >
                    이전
                  </button>
                  <span className="text-[12px] text-[var(--Gray20)]">
                    {page} / {totalPages}
                  </span>
                  <button
                    type="button"
                    className="px-3 py-1 text-[12px] rounded border border-[var(--Gray90)] disabled:text-[var(--Gray78)] disabled:border-[var(--Gray90)]"
                    onClick={() =>
                      setPage((p) =>
                        p < totalPages ? p + 1 : p
                      )
                    }
                    disabled={page >= totalPages}
                  >
                    다음
                  </button>
                </div>
              </>
            )}
          </section>
        </Container>
      </main>

      <HomeLoginModal
        open={loginOpen}
        onClose={closeLogin}
        onKakaoLogin={handleKakaoLogin}
        isKakaoStarting={isKakaoStarting}
      />
    </div>
  );
}
