import React from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

import Frame from "@ui/Frame";
import PageHeader from "@ui/PageHeader";

type HeaderVariant = "write" | "comment";

type AppLayoutProps = {
  children: React.ReactNode;
  headerVariant?: HeaderVariant;
};

export default function AppLayout({
  children,
  headerVariant = "write",
}: AppLayoutProps) {
  const navigate = useNavigate();

  const isAuthed = true;
  const user = {
    username: "saeryeom",
    nickname: "닉네임",
    bio: "한 줄 소개",
    avatarUrl: "",
  };

  const goStart = () => navigate("/join");
  const goMyGitlog = () => navigate(`/profile/${user.username}`);
  const goWrite = () => navigate("/write");
  const goSettings = () => navigate("/account/profile");
  const goLogout = () => navigate("/", { replace: true });

  return (
    <div className="min-h-dvh w-full bg-white flex flex-col">
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
        onLogout={goLogout}
        className="hidden md:flex"
      />

      <header
        className={clsx(
          "w-full bg-white/90 backdrop-blur-[2px] border-b border-[var(--Gray96)]",
          "md:ml-[240px]"
        )}
      >
        <div
          className={clsx(
            "mx-auto w-full max-w-[1366px]",
            "px-4 sm:px-6 md:px-8"
          )}
        >
          <PageHeader
            variant={headerVariant}
            className="!w-full"
            onClickWrite={goWrite}
          />
        </div>
      </header>

      <main className={clsx("flex-1 w-full bg-white", "md:ml-[240px]")}>
        {children}
      </main>
    </div>
  );
}
