import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { useSearchParams, Link, useNavigate } from "react-router-dom";

import PageHeader from "@ui/PageHeader";
import Frame from "@ui/Frame";
import PostList from "../components/home/PostList";
import type { Post } from "../types/post";

import clearIcon from "../assets/icons/clear.svg";
import kakaoIcon from "../assets/icons/kakao.svg";
import "../styles/auth.css";

import { usePosts } from "@src/hooks/usePosts";

const styles = {
  container: {
    wrap: "mx-auto w-full max-w-[1366px]",
    pad: "px-4 sm:px-6 md:px-8",
    main: "mx-auto w-full max-w-[1366px] px-4 sm:px-6 md:px-8",
  },
} as const;

type ApiPostSummary = {
  id: number;
  title: string;
  createdAt?: string;
  author?: { nickname?: string };
  thumbnailUrl?: string;
  commentCount?: number;
  excerpt?: string;
};

export default function HomePage() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const [search, setSearch] = useSearchParams();
  const loginOpen = search.get("login") === "1";
  const openLogin = () => setSearch({ login: "1" }, { replace: true });
  const closeLogin = () => {
    search.delete("login");
    setSearch(search, { replace: true });
  };

  useEffect(() => {
    if (loginOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [loginOpen]);

  const [showFrame, setShowFrame] = useState(false);
  const toggleFrame = () => setShowFrame((v) => !v);

  const isAuthed = true;
  const user = {
    username: "saeryeom",
    nickname: "닉네임",
    bio: "한 줄 소개",
    avatarUrl: "",
  };

  const goStart = () => navigate("/join");
  const goMyGitlog = () => navigate(`/profile/${user.username}`);
  const goWrite = () => {
    if (!isAuthed) return openLogin();
    navigate("/write");
  };
  const goSettings = () => navigate("/account/profile");
  const doLogout = () => navigate("/", { replace: true });

  const { data, isLoading, isError } = usePosts(page, 10);

  const apiPosts: ApiPostSummary[] = Array.isArray(data?.data)
    ? (data?.data as ApiPostSummary[])
    : [];

  const posts: Post[] = apiPosts.map((p) => {
    const nick = p.author?.nickname ?? "익명";
    const initial = nick.charAt(0).toUpperCase();
    const dateText = p.createdAt
      ? new Date(p.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }) + "."
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

  const totalPages = typeof data?.totalPages === "number" ? data.totalPages : 1;

  return (
    <div className="min-h-dvh w-full bg-white flex flex-col">
      <header className="w-full bg-white/90 backdrop-blur-[2px] border-b border-[var(--Gray96)] relative z-10">
        <div className={clsx(styles.container.wrap, styles.container.pad)}>
          <PageHeader
            variant="write"
            onClickMenu={toggleFrame}
            onClickWrite={openLogin}
            className="!w-full"
          />
        </div>
      </header>

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
        <div className={clsx(styles.container.main, "py-8")}>
          <section className="flex flex-col gap-6">
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
                {/* PostList가 내부에서 slice를 할 수 있으니 page=1로 고정 전달 */}
                <PostList posts={posts} page={1} onPageChange={() => {}} />

                {/* 서버 페이지네이션 컨트롤 */}
                <div className="flex items-center justify-center gap-2 pt-2">
                  <button
                    type="button"
                    className="px-3 py-1 text-[12px] rounded border border-[var(--Gray90)] disabled:text-[var(--Gray78)] disabled:border-[var(--Gray90)]"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
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
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page >= totalPages}
                  >
                    다음
                  </button>
                </div>
              </>
            )}
          </section>
        </div>
      </main>

      {loginOpen && (
        <div className="auth-dim" onClick={closeLogin} role="presentation">
          <section
            className="auth-card"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="로그인"
          >
            <button
              type="button"
              className="auth-close"
              onClick={closeLogin}
              aria-label="닫기"
            >
              <img src={clearIcon} alt="" />
            </button>

            <div className="auth-hero">
              <div className="logo-text">GITLOG</div>
              <p className="auth-hero__caption">
                나의 성장 기록, 지금 시작하세요
              </p>
            </div>

            <form
              className="auth-form"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="auth-fields">
                <input
                  className="auth-input"
                  type="email"
                  placeholder="이메일"
                />
                <input
                  className="auth-input"
                  type="password"
                  placeholder="비밀번호"
                />
              </div>

              <button
                type="submit"
                className="auth-btn auth-btn--primary"
              >
                로그인
              </button>

              <div className="auth-sns-sep">또는</div>

              <button
                type="button"
                className="auth-btn auth-btn--kakao"
              >
                <img
                  src={kakaoIcon}
                  alt=""
                  width={18}
                  height={18}
                  style={{ display: "block" }}
                />
                카카오로 계속하기
              </button>

              <div className="auth-switch">
                <Link to="/join" className="auth-switch__btn">
                  아직 회원이 아니신가요? 회원가입
                </Link>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}
