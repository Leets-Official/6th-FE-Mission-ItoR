import { useState, useRef } from "react";
import Header from "@/components/Header/Header";
import Avatar from "@/components/Avatar/Avatar";
import CommentSection from "@/components/Blog/CommentSection/CommentSection";
import * as S from "./PostDetail.styled";
import Sidebar from "@/components/Sidebar/Sidebar";
import LoginModal from "@/components/Blog/LoginModal/LoginModal";
import DropdownMenuList from "@/components/DropdownMenu/DropdownMenuList";

export default function PostDetail() {
  const [isLogin, setIsLogin] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [commentCount, setCommentCount] = useState(0);

  const commentRef = useRef<HTMLDivElement>(null);

  const post = {
    title: "32 Title one line",
    nickName: "닉네임",
    createdAt: "Feb 17. 2025.",
    profileUrl: "https://i.pravatar.cc/40?img=3",
    content: `
Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
    `,
  };

  const handleScrollToComments = () => {
    commentRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const menuItems = [
    { label: "수정하기", onClick: () => alert("수정하기 클릭") },
    { label: "삭제하기", onClick: () => alert("삭제하기 클릭") },
  ];

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
          />

          {isMenuOpen && (
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
              variant="user"
              onLoginClick={() => {
                setIsLoginOpen(true);
                setIsSidebarOpen(false);
              }}
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
            onLoginClick={() => setIsLogin(true)}
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
    </div>
  );
}

function renderMarkdown(text: string) {
  return text
    .replace(/```(.*?)```/gs, '<pre class="code-block"><code>$1</code></pre>')
    .replace(/\n/g, "<br>");
}
