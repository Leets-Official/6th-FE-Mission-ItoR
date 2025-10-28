import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/Header/Header";
import Pagination from "@/components/Pagination/Pagination";
import PostItem from "@/components/Blog/PostItem/PostItem";
import Sidebar from "@/components/Sidebar/Sidebar";
import LoginModal from "@/components/Blog/LoginModal/LoginModal";
import Modal from "@/components/Modal/Modal";
import { usePosts } from "@/hooks/usePosts";
import { useUserStore } from "@/store/useUserStore";
import { useLogout } from "@/hooks/useLogout";
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupPromptOpen, setIsSignupPromptOpen] = useState(false);

  const { isLogoutModalOpen, handleLogoutClick, handleConfirmLogout, handleCloseLogoutModal } =
    useLogout();

  const { user } = useUserStore();
  const isLogin = !!user;
  const navigate = useNavigate();
  const location = useLocation();

  const { posts, pageMax, loading } = usePosts(currentPage, 10);
  const dataToShow = posts.length > 0 ? posts : dummyPosts;
  const totalPages = posts.length > 0 ? pageMax : Math.ceil(dummyPosts.length / 10);

  useEffect(() => {
    if (location.state?.openLogin) {
      setIsLoginOpen(true);
    }
  }, [location.state]);

  if (loading && posts.length === 0) return <div className="p-6">로딩 중...</div>;

  const pagedData = dataToShow.slice((currentPage - 1) * 10, currentPage * 10);

  return (
    <div className="relative">
      <div className="fixed top-0 left-0 z-50 w-full">
        <Header
          title="GITLOG"
          variant="write"
          onMenuClick={() => setIsSidebarOpen(true)}
          onWriteClick={() => (isLogin ? navigate("/write") : setIsLoginOpen(true))}
        />
      </div>
      <div className="h-[70px]" />

      {isSidebarOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsSidebarOpen(false)} />
          <aside className="animate-slideIn fixed top-0 left-0 z-50 h-full w-64">
            <Sidebar
              variant={isLogin ? "user" : "guest"}
              onLoginClick={() => {
                setIsLoginOpen(true);
                setIsSidebarOpen(false);
              }}
              onLogoutClick={handleLogoutClick}
            />
          </aside>
        </>
      )}

      <main className={styles.mainWrapper}>
        <ul className={styles.listWrapper}>
          {pagedData.map((post, index) => (
            <PostItem
              key={post.postId}
              post={post}
              isLast={index === pagedData.length - 1}
              onClick={() => navigate(`/blog/${post.postId}`)}
            />
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

      <LoginModal
        open={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSignupPrompt={() => setIsSignupPromptOpen(true)}
      />

      <Modal
        open={isSignupPromptOpen}
        title="가입되지 않은 계정입니다."
        description="회원가입을 진행하시겠습니까?"
        onClose={() => {
          setIsSignupPromptOpen(false);
          navigate("/");
        }}
        onConfirm={() => {
          setIsSignupPromptOpen(false);
          navigate("/signup");
        }}
        cancelText="아니요"
        confirmText="네"
        confirmColor="bg-brand-blue text-white hover:bg-brand-blue/90"
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
