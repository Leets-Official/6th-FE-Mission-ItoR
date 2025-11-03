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
import * as styles from "./MainPage.styled";

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

  useEffect(() => {
    if (location.state?.openLogin) {
      setIsLoginOpen(true);
    }
  }, [location.state]);

  if (loading) return <div className="p-6">로딩 중...</div>;

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
        {posts.length === 0 ? (
          <div className="py-10 text-center text-gray-500">게시글이 없습니다.</div>
        ) : (
          <>
            <ul className={styles.listWrapper}>
              {posts.map((post) => (
                <PostItem
                  key={post.postId}
                  post={post}
                  onClick={() => navigate(`/blog/${post.postId}`)}
                />
              ))}
            </ul>

            <div className="border-brand-borderGray mt-6 flex justify-center border-t pt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={pageMax}
                onPageChange={setCurrentPage}
              />
            </div>
          </>
        )}
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
