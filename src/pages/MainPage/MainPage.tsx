import React, { useState } from "react";
import Header from "@/components/Header/Header";
import Pagination from "@/components/Pagination/Pagination";
import PostItem from "@/components/PostItem/PostItem";
import { usePosts } from "@/hooks/usePosts";
import { Post } from "@/types/post";
import * as styles from "./MainPage.styled";

const dummyPosts: Post[] = Array.from({ length: 14 }, (_, idx) => ({
  postId: crypto.randomUUID(),
  title: `게시글 제목 ${idx + 1}`,
  contents: [
    {
      contentOrder: 1,
      content: `이것은 ${idx + 1}번째 더미 게시물 내용입니다.`,
      contentType: "TEXT",
    },
    ...(idx % 2 === 0
      ? [
          {
            contentOrder: 2,
            content: "https://picsum.photos/400/200?random=" + idx,
            contentType: "IMAGE" as const,
          },
        ]
      : []),
  ],
  isOwner: idx % 2 === 0,
  comments: [
    {
      commentId: idx + 1,
      content: `더미 댓글 ${idx + 1}`,
      nickName: `댓글작성자${idx + 1}`,
      isOwner: false,
    },
  ],
  nickName: `작성자${idx + 1}`,
  profileUrl: "https://i.pravatar.cc/40?img=" + (idx + 1),
  createdAt: new Date().toISOString(),
}));

export default function MainPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { posts, pageMax, loading } = usePosts(currentPage, 10);

  const dataToShow = posts.length > 0 ? posts : dummyPosts;
  const totalPages = posts.length > 0 ? pageMax : Math.ceil(dummyPosts.length / 10);

  if (loading && posts.length === 0) {
    return <div className="p-6">로딩 중...</div>;
  }

  const pagedData = dataToShow.slice((currentPage - 1) * 10, currentPage * 10);

  return (
    <div className={styles.container}>
      <Header title="GITLOG" variant="write" onWriteClick={() => console.log("깃로그 쓰기 클릭")} />

      <main className={styles.mainWrapper}>
        <ul className={styles.listWrapper}>
          {pagedData.map((post, index) => (
            <PostItem key={post.postId} post={post} isLast={index === pagedData.length - 1} />
          ))}
        </ul>

        <div className="border-brand-borderGray mt-6 flex justify-center border-t pt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </main>
    </div>
  );
}
