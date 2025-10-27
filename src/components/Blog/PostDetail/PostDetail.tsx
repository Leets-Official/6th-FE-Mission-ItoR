import { useState, useRef } from "react";
import Header from "@/components/Header/Header";
import Avatar from "@/components/Avatar/Avatar";
import CommentSection from "@/components/Blog/CommentSection/CommentSection";
import * as S from "./PostDetail.styled";
import Sidebar from "@/components/Sidebar/Sidebar";
import LoginModal from "@/components/Blog/LoginModal/LoginModal";
import DropdownMenuList from "@/components/DropdownMenu/DropdownMenuList";
import Modal from "@/components/Modal/Modal";
import { useUserStore } from "@/store/useUserStore";
import { useLogout } from "@/hooks/useLogout";

export default function PostDetail() {
  const { user } = useUserStore();
  const { isLogoutModalOpen, handleLogoutClick, handleConfirmLogout, handleCloseLogoutModal } =
    useLogout();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [commentCount, setCommentCount] = useState(0);

  const commentRef = useRef<HTMLDivElement>(null);

  const post = {
    id: "post-001",
    title: "32 Title one line",
    userId: "user-123",
    nickName: "내닉네임",
    createdAt: "Feb 17. 2025.",
    profileUrl: "https://i.pravatar.cc/40?img=3",
    content: `
Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
    `,
  };

  const isLogin = !!user;
  const isOwner = isLogin && user?.id === post.userId;

  const handleScrollToComments = () => {
    commentRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const menuItems = [
    { label: "수정하기", onClick: () => alert("수정하기 클릭") },
    { label: "삭제하기", onClick: () => setIsDeleteModalOpen(true) },
  ];

  const handleDeletePost = () => {
    setIsDeleteModalOpen(false);
    alert("게시글이 삭제되었습니다.");
  };

  return (
    <div className={S.page}>
      <div className="fixed top-0 left-0 z-50 w-full">
        <div className="relative">
          <Header
            title="GITLOG"
            variant="chatMenu"
            onChatClick={handleScrollToComments}
            onMenuClick={() => setIsSidebarOpen(true)}
            onMoreClick={() => setIsMenuOpen((prev) => !prev)}
            showMoreIcon={isOwner}
          />

          {isOwner && isMenuOpen && (
            <div className="absolute top-[55px] right-6 z-50">
              <DropdownMenuList
                items={menuItems}
                onItemClick={(item) => {
                  item.onClick?.();
                  setIsMenuOpen(false);
                }}
                position="right"
              />
            </div>
          )}
        </div>
      </div>

      <div className="h-[70px]" />

      {isSidebarOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsSidebarOpen(false)} />
          <aside className="animate-slideIn fixed top-0 left-0 z-50 h-full w-64">
            <Sidebar
              variant={isLogin ? "user" : "guest"}
              onLogoutClick={handleLogoutClick}
              onLoginClick={() => setIsLoginOpen(true)}
            />
          </aside>
        </>
      )}

      <main className={S.container}>
        <section className={S.group}>
          <h1 className={S.title}>{post.title}</h1>

          <div className={S.meta}>
            <Avatar src={post.profileUrl} size="xs" />
            <span className={S.nick}>{post.nickName}</span>
            <span className={S.date}>
              {post.createdAt} 댓글 {commentCount}
            </span>
          </div>
        </section>

        <div className={S.divider} />

        <section className={S.group}>
          <article
            className={S.content}
            dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
          />
        </section>

        <div className={S.divider} />

        <section className={S.group} ref={commentRef}>
          <CommentSection
            isLoggedIn={isLogin}
            onLoginClick={() => setIsLoginOpen(true)}
            onSubmit={(text) => {
              alert(`댓글 등록: ${text}`);
              setCommentCount((prev) => prev + 1);
            }}
            postAuthorProfile={post.profileUrl}
            postAuthorName={post.nickName}
          />
        </section>
      </main>

      <LoginModal open={isLoginOpen} onClose={() => setIsLoginOpen(false)} />

      <Modal
        title="해당 블로그를 삭제하시겠어요?"
        description="삭제된 블로그는 다시 확인할 수 없어요."
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeletePost}
        confirmText="삭제하기"
        cancelText="취소"
        confirmColor="bg-brand-red text-white hover:opacity-90"
      />

      <Modal
        open={isLogoutModalOpen}
        title="로그아웃을 진행할게요."
        onClose={handleCloseLogoutModal}
        onConfirm={handleConfirmLogout}
        confirmText="로그아웃"
        cancelText="취소"
        confirmColor="bg-brand-blue text-white hover:opacity-90"
      />
    </div>
  );
}

function renderMarkdown(text: string) {
  return text
    .replace(/```(.*?)```/gs, '<pre class="code-block"><code>$1</code></pre>')
    .replace(/\n/g, "<br>");
}
