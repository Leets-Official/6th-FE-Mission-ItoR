import { useState } from "react";
import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import Pagination from "@/components/Pagination/Pagination";
import PostItem from "@/components/Blog/PostItem/PostItem";
import SmallButton from "@/components/SmallButton/SmallButton";
import { useNavigate } from "react-router-dom";
import * as S from "./MyPage.styled";
import { Post } from "@/types/post";
import { SettingsIcon } from "@/assets/icons";
import Avatar from "@/components/Avatar/Avatar";

export default function MyPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const dummyPosts: Post[] = Array.from({ length: 14 }, (_, idx) => ({
    postId: crypto.randomUUID(),
    title: `게시글 제목 ${idx + 1}`,
    contents: [
      {
        contentOrder: 1,
        content: `이것은 ${idx + 1}번째 더미 게시물 내용입니다.`,
        contentType: "TEXT" as const,
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
    isOwner: true,
    comments: [
      {
        commentId: idx + 1,
        content: `댓글 ${idx + 1}`,
        nickName: "닉채민",
        isOwner: false,
      },
    ],
    nickName: "닉채민",
    profileUrl: "https://i.pravatar.cc/80?img=" + (idx + 3),
    createdAt: new Date().toISOString(),
  }));

  const totalPages = Math.ceil(dummyPosts.length / 5);
  const pagedData = dummyPosts.slice((currentPage - 1) * 5, currentPage * 5);

  return (
    <div className="relative">
      <div className="fixed top-0 left-0 z-50 w-full">
        <Header
          title="GITLOG"
          variant="write"
          onMenuClick={() => setIsSidebarOpen(true)}
          onWriteClick={() => navigate("/write")}
        />
      </div>
      <div className="h-[60px]" />

      {isSidebarOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsSidebarOpen(false)} />
          <aside className="animate-slideIn fixed top-0 left-0 z-50 h-full w-64">
            <Sidebar variant="user" />
          </aside>
        </>
      )}

      <section className={S.profileSection}>
        <div className={S.profileSectionInner}>
          <div className={S.profileInner}>
            <Avatar src="https://i.pravatar.cc/120?img=5" alt="프로필 이미지" size="lg" />
            <h2 className={S.nickname}>%{`{닉네임}`}</h2>
            <p className={S.intro}>%{`{한 줄 소개}`}</p>

            <SmallButton
              label="내 프로필 설정"
              variant="secondaryOutline"
              leftIcon={<SettingsIcon width={16} height={16} />}
              className={S.editProfileButton}
            />
          </div>
        </div>
      </section>

      <main className={S.mainWrapper}>
        <ul className={S.listWrapper}>
          {pagedData.map((post, index) => (
            <PostItem
              key={post.postId}
              post={post}
              isLast={index === pagedData.length - 1}
              onClick={() => navigate(`/blog/${post.postId}`)}
            />
          ))}
        </ul>

        <div className={S.paginationWrapper}>
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
