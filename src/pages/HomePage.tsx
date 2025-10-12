import React, { useState } from "react";
import clsx from "clsx";
import PageHeader from "@ui/PageHeader";
import PostList from "../components/home/PostList";
import type { Post } from "../types/post";

const POSTS: Post[] = Array.from({ length: 16 }).map((_, i) => ({
  id: i + 1,
  title: "16 Title one line",
  excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  date: "Feb 17, 2025.",
  author: { name: "닉네임", avatarInitial: "N" },
  thumbnailUrl:
    i % 2 === 0
      ? "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop"
      : undefined,
}));

const styles = {
  container: {
    main: "mx-auto w-full max-w-[688px] px-4 sm:px-6 md:px-8",
    header: "w-full px-4 sm:px-6 md:px-8",
  },
} as const;

export default function HomePage() {
  const [page, setPage] = useState(1);

  return (
    <div className="min-h-dvh w-full bg-white flex flex-col">
      <header className="w-full bg-white/90 backdrop-blur-[2px]">
        <div className={clsx(styles.container.header)}>
          <PageHeader variant="write" className="!w-full" />
        </div>
      </header>

      <main className="flex-1 w-full">
        <div className={clsx(styles.container.main)}>
          <PostList posts={POSTS} page={page} onPageChange={setPage} />
        </div>
      </main>
    </div>
  );
}
