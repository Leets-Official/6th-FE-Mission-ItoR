import React, { useState } from "react";
import clsx from "clsx";
import { useSearchParams, Link, useNavigate } from "react-router-dom";

import PageHeader from "@ui/PageHeader";
import Frame from "@ui/Frame";
import PostList from "../components/home/PostList";
import type { Post } from "../types/post";

import clearIcon from "../assets/icons/clear.svg";
import kakaoIcon from "../assets/icons/kakao.svg";
import "../styles/auth.css";

const POSTS: Post[] = Array.from({ length: 16 }).map((_, i) => ({
  id: i + 1,
  title: "16 Title one line",
  excerpt:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
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
            <PostList posts={POSTS} page={page} onPageChange={setPage} />
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
