import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import Pagination from "@/components/Pagination/Pagination";
import PostItem from "@/components/Blog/PostItem/PostItem";
import SmallButton from "@/components/SmallButton/SmallButton";
import * as S from "./MyPage.styled";
import { Post } from "@/types/post";
import { SettingsIcon } from "@/assets/icons";
import Avatar from "@/components/Avatar/Avatar";
import Toast from "@/components/Toast/Toast";
import Modal from "@/components/Modal/Modal";
import { useLogout } from "@/hooks/useLogout";
import { useUserStore } from "@/store/useUserStore";

export default function MyPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUserStore();

  const { isLogoutModalOpen, handleLogoutClick, handleConfirmLogout, handleCloseLogoutModal } =
    useLogout();

  useEffect(() => {
    if (location.state?.toastMessage) {
      setToastMessage(location.state.toastMessage);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleToastClose = () => setToastMessage("");

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
        nickName: user?.nickname ?? "닉네임",
        isOwner: false,
      },
    ],
    nickName: user?.nickname ?? "닉네임",
    profileUrl: user?.profileUrl ?? "https://i.pravatar.cc/80?img=" + (idx + 3),
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
            <Sidebar variant="user" onLogoutClick={handleLogoutClick} />
          </aside>
        </>
      )}

      <section className={S.profileSection}>
        <div className={S.profileSectionInner}>
          <div className={S.profileInner}>
            <Avatar src={user?.profileUrl} alt="프로필 이미지" size="lg" />
            <h2 className={S.nickname}>{user?.nickname ?? "닉네임"}</h2>
            <p className={S.intro}>{user?.introduction ?? "You can make anything by writing."}</p>

            <SmallButton
              label="내 프로필 설정"
              variant="secondaryOutline"
              leftIcon={<SettingsIcon width={16} height={16} />}
              className={S.editProfileButton}
              onClick={() => navigate("/mypage/setting")}
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

      {toastMessage && (
        <div className="fixed top-20 left-1/2 z-50 -translate-x-1/2">
          <Toast message={toastMessage} type="success" onClose={handleToastClose} />
        </div>
      )}

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
